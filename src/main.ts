import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import "./product-transition.css";
import App from "./App.vue";

const EmptyRoute = { render: () => h("span") };
const routes = [
  { path: "/", name: "home", component: EmptyRoute },
  { path: "/products", name: "products", component: EmptyRoute },
  { path: "/software", name: "software", component: EmptyRoute },
  { path: "/solutions", redirect: "/applications/urban-renewal" },
  {
    path: "/applications/:applicationId",
    name: "application-detail",
    component: EmptyRoute,
  },
  {
    path: "/products/:productId",
    name: "product-detail",
    component: EmptyRoute,
  },
  { path: "/contact", name: "contact", component: EmptyRoute },
  { path: "/about", name: "about", component: EmptyRoute },
];
const router = createRouter({ history: createWebHistory(), routes });
createApp(App).use(router).mount("#app");
