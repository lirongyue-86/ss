import cors from 'cors'
import express from 'express'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDirectory = path.join(root, 'data')
const inquiryDatabase = path.join(dataDirectory, 'inquiries.db')
mkdirSync(dataDirectory, { recursive: true })

const db = new DatabaseSync(inquiryDatabase)
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    scenario TEXT NOT NULL,
    message TEXT,
    consent INTEGER NOT NULL CHECK (consent IN (0, 1)),
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
`)

const insertInquiry = db.prepare(`
  INSERT INTO inquiries
    (id, name, company, phone, email, scenario, message, consent, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`)
const selectInquiries = db.prepare(`
  SELECT id, name, company, phone, email, scenario, message, consent,
    created_at AS createdAt
  FROM inquiries
  ORDER BY created_at DESC
`)
const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }))
app.use(express.json({ limit: '32kb' }))

function clean(value, limit) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

app.post('/api/inquiries', async (req, res) => {
  const item = {
    id: crypto.randomUUID(),
    name: clean(req.body?.name, 80),
    company: clean(req.body?.company, 120),
    phone: clean(req.body?.phone, 40),
    email: clean(req.body?.email, 120),
    scenario: clean(req.body?.scenario, 80),
    message: clean(req.body?.message, 1000),
    consent: req.body?.consent === true,
    createdAt: new Date().toISOString(),
  }
  if (!item.name || !item.company || !item.phone || !item.scenario || !item.consent) return res.status(400).json({ error: 'Please provide your name, organisation, telephone, project environment and consent.' })
  if (item.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) return res.status(400).json({ error: 'Please check the email address format.' })
  try {
    insertInquiry.run(
      item.id,
      item.name,
      item.company,
      item.phone,
      item.email || null,
      item.scenario,
      item.message || null,
      item.consent ? 1 : 0,
      item.createdAt,
    )
    return res.status(201).json({ id: item.id })
  } catch {
    return res.status(500).json({ error: 'The inquiry could not be stored. Please try again shortly.' })
  }
})

app.get('/api/inquiries', async (req, res) => {
  if (!process.env.ADMIN_TOKEN || req.get('x-admin-token') !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const inquiries = selectInquiries.all().map((item) => ({ ...item, consent: item.consent === 1 }))
    return res.json(inquiries)
  } catch {
    return res.status(500).json({ error: 'The inquiries could not be read. Please try again shortly.' })
  }
})

app.use(express.static(path.join(root, 'dist')))
app.get(/.*/, (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')))
app.listen(process.env.PORT || 8787, () => console.log(`SmartSpace API listening on ${process.env.PORT || 8787}`))
