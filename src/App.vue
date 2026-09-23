<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import backpackImage from "./assets/products/slider/backpack-slider.png";
import backpackImage2 from "./assets/products/backpack-2.png";
import handheldImage from "./assets/products/slider/handheld-slider.png";
import handheldImage2 from "./assets/products/handheld-2.png";
import vehicleImage from "./assets/products/slider/vehicle-slider.png";
import vehicleImage2 from "./assets/products/vehicle-2.png";
import uavImage from "./assets/products/slider/uav-slider.png";
import uavImage2 from "./assets/products/uav-2.png";
import robotImage from "./assets/products/slider/robot-slider.png";
import robotImage2 from "./assets/products/robot-2.png";
import robotDogImage from "./assets/products/slider/robot-dog-slider.png";
import robotDogImage2 from "./assets/products/robot-dog-2.png";
import usvImage from "./assets/products/slider/usv-slider.png";
import roboticArmImage from "./assets/products/slider/robotic-arm-slider.png";
import smartspaceLogo from "./assets/brand/smartspace-logo-transparent.png";
import smartspaceAbout from "./assets/brand/smartspace-about.png";
import spacescanxWordmark from "./assets/brand/spacescanx-wordmark-transparent.png";
import spacescanxHeroGif from "./assets/demo/spacescanx-hero-10s.gif";
import constructionMicApplication from "./assets/applications/construction-mic.png";
import scanToBimApplication from "./assets/applications/scan-to-bim-main.png";
import spaceMatrixFunctionAtlas from "./assets/spacematrix/function-atlas.png";
import spaceMatrixSynchronisedRoaming from "./assets/spacematrix/synchronised-roaming.png";
import spaceMatrixColourizedCity from "./assets/spacematrix/colourized-city-pointcloud.png";
import spaceMatrixPanoramicMeasurement from "./assets/spacematrix/panoramic-measurement.png";
import spaceMatrixMeasurementDetail from "./assets/spacematrix/measurement-detail.png";
import buildingDefectThermalVisible from "./assets/brochure/crops/building-defect-thermal-visible.png";
import signboardInspectionDashboard from "./assets/brochure/crops/signboard-inspection-dashboard.png";
import roadDefectAnalysis from "./assets/brochure/crops/road-defect-analysis.png";
import roadMaintenanceMain from "./assets/applications/road-maintenance-main.png";
import roadMaintenanceLocation from "./assets/applications/road-maintenance-location.png";
import roadMaintenanceSurvey from "./assets/applications/road-maintenance-survey.jpg";
import urbanBuildingModel from "./assets/applications/urban-building-model.png";
import urbanBuildingThermal from "./assets/applications/urban-building-thermal.png";
import urbanSignboard from "./assets/applications/urban-signboard.png";
import urbanTrafficSign from "./assets/applications/urban-traffic-sign.png";
import urbanFloorPointcloud from "./assets/applications/urban-floor-pointcloud.png";
import urbanFloorplan from "./assets/applications/urban-floorplan.png";
import urbanUraWorkflow from "./assets/applications/urban-ura-workflow.png";
import urbanRenewalSurvey from "./assets/applications/urban-renewal-survey.png";
import constructionCorridorOverview from "./assets/applications/construction-corridor-overview.png";
import constructionSiteLocation from "./assets/applications/construction-site-location.png";
import constructionProgressRecognition from "./assets/applications/construction-progress-recognition.png";
import estateScanToBimPointcloud from "./assets/applications/estate-scan-to-bim-pointcloud.png";
import estateScanToBimOutput from "./assets/applications/estate-scan-to-bim-output.png";
import estateKacstWorkflow from "./assets/applications/estate-kacst-workflow.png";
import estateSurveyReference from "./assets/applications/estate-survey-reference.png";
import forestryIndividualSegmentation from "./assets/applications/forestry-individual-segmentation.png";
import forestrySegmentationDetail from "./assets/applications/forestry-segmentation-detail.png";
import forestryAttributeOverview from "./assets/applications/forestry-attribute-overview.png";
import forestryAttributeDetail from "./assets/applications/forestry-attribute-detail.png";
import forestryAttributeWorkflow from "./assets/applications/forestry-attribute-workflow.png";
import forestryAttributeParameters from "./assets/applications/forestry-attribute-parameters.png";
import forestrySpeciesCity from "./assets/applications/forestry-species-city.png";
import forestrySpeciesResult from "./assets/applications/forestry-species-result.png";
import disasterLandslideAnnotations from "./assets/applications/disaster-landslide-annotations.png";
import disasterLandslideBoundary from "./assets/applications/disaster-landslide-boundary.png";
import disasterLandslideModelOutput from "./assets/applications/disaster-landslide-model-output.png";
import disasterSweptPath from "./assets/applications/disaster-swept-path.png";

type Product = {
  id: string;
  name: string;
  platform: string;
  statement: string;
  metrics: string[];
  specs: [string, string][];
};
const products: Product[] = [
  {
    id: "backpack",
    name: "Backpack SpaceScanX",
    platform: "Wearable mobile mapping",
    statement: "Continuous capture for long and complex indoor–outdoor routes.",
    metrics: ["300 m", "±1 cm", "1.28 M pts/s", "~6 kg"],
    specs: [
      ["Maximum range", "300 m"],
      ["Ranging accuracy", "±1 cm"],
      ["Point rate", "~1,280,000 pts/s"],
      ["Field of view", "360°"],
      ["Frame rate", "10 Hz / 20 Hz"],
      ["Panoramic camera", "5760 × 2880 / 5 lenses / 16.6 MP"],
      ["GNSS", "BeiDou B1I, B2I; up to 5 Hz"],
      ["Runtime / storage", ">4 hours / 1 TB"],
      [
        "Relative / absolute accuracy",
        "1–3 cm / 5–10 cm, environment dependent",
      ],
    ],
  },
  {
    id: "handheld",
    name: "Handheld SpaceScanX",
    platform: "Lightweight mobile mapping",
    statement:
      "Fast one-person spatial capture for narrow or constrained interiors.",
    metrics: ["70 m", "±2 cm", "200 K pts/s", "~1.2 kg"],
    specs: [
      ["Measurement range", "70 m"],
      ["Ranging accuracy", "±2 cm"],
      ["Point rate / field of view", "200,000 pts/s / 360°"],
      ["Frame rate / laser class", "10 Hz / Class 1"],
      ["Panoramic imaging", "5760 × 2880; 360° × 180°"],
      ["IMU output", "200 Hz"],
      ["Dimensions", "45 cm × 12 cm × 12 cm"],
      ["Runtime / storage", ">4 hours / 128 GB"],
      ["Relative / absolute accuracy", "2 cm / 3 cm, environment dependent"],
    ],
  },
  {
    id: "vehicle",
    name: "Vehicle-mounted SpaceScanX",
    platform: "Road and corridor mapping",
    statement:
      "Large-scale capture for moving vehicles and rail-based deployments.",
    metrics: ["475 m", "±3–5 mm", "3.6 M pts/s", "~25 kg"],
    specs: [
      ["Measurement range", "475 m"],
      ["Ranging accuracy", "±3–5 mm"],
      ["Maximum point rate", "3,600,000 pts/s"],
      ["Field of view / frame rate", "360° / 250 Hz"],
      ["Camera", "15 lenses; 8192 × 4096; 360°"],
      ["Navigation", "GNSS + IMU; 100 Hz"],
      ["Dimensions", "58 cm × 45 cm × 62 cm"],
      ["Runtime / storage", "5 hours / 1 TB"],
      ["Power", "220 V"],
    ],
  },
  {
    id: "uav",
    name: "UAV SpaceScanX",
    platform: "Aerial reality capture",
    statement:
      "A lightweight aerial system for rapid terrain and infrastructure mapping.",
    metrics: ["450 m", "±2 cm", "240 K pts/s", "~1.0 kg"],
    specs: [
      ["Maximum range", "450 m"],
      ["Measurement accuracy", "±2 cm"],
      ["Point rate", "~240,000 pts/s"],
      ["Field of view / frequency", "70.4° H × 77.2° V / 10 Hz"],
      ["Wide-angle camera", "5568 × 4872 / 30 frames / 120°"],
      ["IMU", "200 Hz"],
      ["Dimensions", "45 cm × 12 cm × 12 cm"],
      ["Runtime", "Dependent on aircraft flight time"],
      [
        "Relative / absolute accuracy",
        "2 cm / centimetre-level, environment dependent",
      ],
    ],
  },
  {
    id: "robot",
    name: "Robot SpaceScanX",
    platform: "Remote autonomous mapping",
    statement:
      "A cellular-connected platform for remote survey, navigation and visual alerts.",
    metrics: ["300 m", "±1 cm", "1.28 M pts/s", "LTE / 5G"],
    specs: [
      ["Maximum detection range", "300 m"],
      ["Measurement accuracy", "±1 cm"],
      ["Point rate / field of view", "~1,280,000 pts/s / 360°"],
      ["Frame rate", "10 Hz / 20 Hz"],
      ["Panoramic camera", "5760 × 2880 / 5 lenses / 16.6 MP"],
      ["GNSS", "BeiDou B1I, B2I; up to 5 Hz"],
      ["IMU", "1–400 Hz"],
      ["Runtime / storage", ">4 hours / 1 TB"],
      [
        "Relative / absolute accuracy",
        "1–3 cm / 5–10 cm, environment dependent",
      ],
    ],
  },
  {
    id: "dog",
    name: "Robot Dog SpaceScanX",
    platform: "Autonomous inspection",
    statement:
      "A quadruped system that combines LiDAR, RGB and thermal data for inspection.",
    metrics: ["300 m", "±1 cm", "IP67", "-20°C–550°C"],
    specs: [
      ["Maximum detection range", "300 m"],
      ["Measurement accuracy / point rate", "±1 cm / ~1,280,000 pts/s"],
      ["Field of view / frame rate", "360° / 10 Hz, 20 Hz"],
      ["Visible light", "3840 × 2160; 20× optical zoom"],
      ["Thermal", "640 × 512; -20°C–550°C; ±2°C or ±2%"],
      ["Gimbal", "Pitch -120° to +45°; continuous heading rotation"],
      ["Runtime / storage", ">4 hours / 1 TB"],
      [
        "Relative / absolute accuracy",
        "1–3 cm / 5–10 cm, environment dependent",
      ],
    ],
  },
  {
    id: "usv",
    name: "Uncrewed Surface Vessel SpaceScanX",
    platform: "Hydrographic mapping",
    statement:
      "Integrated LiDAR and bathymetry for above-water and underwater spatial models.",
    metrics: ["300 m", "±1 cm", "0.15–200 m depth", "4–6 hours"],
    specs: [
      ["Maximum detection range", "300 m"],
      ["Measurement accuracy / point rate", "±1 cm / ~1,280,000 pts/s"],
      ["Bathymetry", "200 kHz; 0.15–200 m; ±1 cm + 0.1%×D"],
      ["GNSS", "BeiDou B1I, B2I; up to 5 Hz"],
      ["Hull", "120 cm × 60 cm × 35 cm; carbon fibre"],
      ["Maximum payload", "15 kg"],
      ["Top speed / endurance", "4.5 m/s / 4–6 hours"],
      ["Propulsion", "Brushless ducted thruster, anti-entanglement design"],
    ],
  },
  {
    id: "arm",
    name: "Robotic Arm SpaceScanX",
    platform: "Precision measure-and-act",
    statement:
      "Six-axis measurement and control for detailed, repeatable industrial work.",
    metrics: ["1 mm", "±0.05 mm", "6 axes", "5 kg"],
    specs: [
      ["Mobile LiDAR", "300 m / ±1 cm / 640,000 pts/s / 360°"],
      ["Degrees of freedom", "6 axes"],
      ["Working radius", "61 cm"],
      ["Repeatability", "±0.05 mm"],
      ["Maximum end-effector speed", "≤1.8 m/s"],
      ["Payload", "5 kg"],
      ["Precision scan range", "1.5 m–620 m; 5 mm @ 100 m"],
      ["Precision field of view", "300° vertical / 360° horizontal"],
      ["Relative / absolute accuracy", "1 mm / 5 mm, environment dependent"],
    ],
  },
];
const systemModes = [
  {
    title: "Capture",
    tag: "01 / FIELD",
    copy: "Deploy the right sensor platform to acquire LiDAR, imagery, trajectory and positioning data in one pass.",
    detail: "Handheld · Backpack · Vehicle · UAV · Robot · USV · Arm",
  },
  {
    title: "Process",
    tag: "02 / MATRIX",
    copy: "Register, calibrate, colourise, extract and model the capture stream inside SpaceMatrix.",
    detail:
      "Georeference · Point cloud · 2D plan · Mesh · BIM · Object extraction",
  },
  {
    title: "Operate",
    tag: "03 / OUTCOME",
    copy: "Move from spatial capture to decisions for planning, construction, inspection and operations.",
    detail:
      "Digital twin · Asset model · Inspection record · Progress evidence",
  },
];
const matrixFunctionGroups = [
  {
    number: "01",
    title: "Position and colourise",
    items: [
      "Centimetre-level high-accuracy point clouds",
      "GNSS RTK data generation",
      "Colorized point clouds generation",
      "Geo-referencing and trajectory processing",
    ],
  },
  {
    number: "02",
    title: "Measure and model",
    items: [
      "Point cloud and mesh model processing",
      "2D building floor plan generation",
      "2D–3D synchronized roaming",
      "Panoramic-image 3D measurement",
      "3D BIM modelling, registration and visualization",
    ],
  },
  {
    number: "03",
    title: "Extract and inspect",
    items: [
      "3D Gaussian Splatting and street object extraction",
      "Tree parameters extraction",
      "Construction-progress monitoring",
      "Building and road defect detection",
      "Quality inspection of point clouds and mesh models",
    ],
  },
];
type ApplicationCase = {
  id: string;
  number: string;
  name: string;
  sector: string;
  copy?: string;
  deliverables?: string;
  deliverableNote?: string;
  details?: string[];
  visual?: string;
  reference?: string;
  hasContent: boolean;
};

const cases: ApplicationCase[] = [
  {
    id: "2d-floor-plan-generation",
    number: "01",
    name: "2D Floor Plan Generation",
    sector: "Urban Renewal",
    hasContent: false,
  },
  {
    id: "building-defect-detection",
    number: "02",
    name: "Building Defect Detection",
    sector: "Urban Renewal",
    hasContent: true,
    copy: "The Building Defect Detection System analyses visible-light and thermal-infrared imagery, identifies facade defects, visualises results on a 3D model and automatically generates reports.",
    deliverables:
      "Defect locations · thermal and visible-light imagery · 3D model visualisation · report generation",
    deliverableNote:
      "Inspection findings are linked to building context so teams can review, verify and follow up with supporting imagery.",
    details: [
      "Visible-light and thermal imagery",
      "Façade defect detection",
      "3D visualisation and reports",
    ],
    visual: buildingDefectThermalVisible,
    reference: buildingDefectThermalVisible,
  },
  {
    id: "signboard-defect-detection",
    number: "03",
    name: "Signboard Defect Detection",
    sector: "Urban Renewal",
    hasContent: true,
    copy: "The Signboard Defect Detection System uses vehicle mobile mapping for signboard segmentation and defect detection, then localises the detected results within the system.",
    deliverables:
      "Geolocated signboard records · defect attributes · image evidence · map-based queries",
    deliverableNote:
      "A map-based inspection view brings each signboard, its condition and its supporting imagery into one review workflow.",
    details: [
      "Signboard segmentation",
      "Defect detection",
      "Location-based review",
    ],
    visual: signboardInspectionDashboard,
    reference: signboardInspectionDashboard,
  },
  {
    id: "traffic-sign-defect-detection",
    number: "04",
    name: "Traffic Sign Defect Detection",
    sector: "Urban Renewal",
    hasContent: true,
    copy: "The Traffic Sign Defect Detection System uses a vehicle-mounted mobile mapping system to recognise multiple types of traffic signs and detect their defects.",
    deliverables:
      "Recognised traffic signs · condition records · image evidence · location-based review",
    deliverableNote:
      "Traffic sign condition can be reviewed from mapped, image-based evidence to support targeted verification and maintenance.",
    details: [
      "Traffic sign recognition",
      "Visible defect detection",
      "Mapped inspection evidence",
    ],
    visual: signboardInspectionDashboard,
    reference: signboardInspectionDashboard,
  },
  {
    id: "urban-renewal",
    number: "01",
    name: "Urban Renewal",
    sector: "Urban Renewal",
    hasContent: true,
    copy: "A unified inspection workflow for building facades, signboards, traffic signs and existing interiors—turning captured imagery into mapped, review-ready maintenance evidence.",
    deliverables:
      "Façade condition review · street-asset detection · mapped issue records · reporting",
    deliverableNote:
      "Building and street-level findings are structured into a shared view for urban asset teams.",
    details: [
      "Building defect detection",
      "Signboard condition assessment",
      "Traffic sign recognition",
    ],
    visual: urbanBuildingModel,
    reference: urbanBuildingModel,
  },
  {
    id: "construction-progress-monitoring",
    number: "05",
    name: "Construction Progress Monitoring",
    sector: "Smart Construction",
    hasContent: false,
  },
  {
    id: "mic-path-planning-analysis",
    number: "06",
    name: "MiC Path Planning and Analysis",
    sector: "Smart Construction",
    hasContent: false,
  },
  {
    id: "slope-mapping",
    number: "07",
    name: "Geotechnical Engineering: Slope Mapping",
    sector: "Smart Construction",
    hasContent: false,
  },
  {
    id: "3d-topographic-mapping",
    number: "08",
    name: "3D Topographic Mapping",
    sector: "Smart Construction",
    hasContent: false,
  },
  {
    id: "smart-construction",
    number: "05",
    name: "Smart Construction",
    sector: "Smart Construction",
    hasContent: true,
    copy: "This platform transforms BIM models and site data into component-level progress intelligence, making project monitoring more digital, automated and traceable.",
    deliverables:
      "BIM-component alignment · site-location context · time-series evidence · progress reporting",
    deliverableNote:
      "Construction-domain AI connects models, point clouds and panoramic evidence into a reviewable record of site progress.",
    details: [
      "Component-level progress recognition",
      "BIM and point-cloud alignment",
      "Dated field evidence",
    ],
    visual: constructionCorridorOverview,
    reference: constructionCorridorOverview,
  },
  {
    id: "estate-surveying",
    number: "09",
    name: "Estate Surveying",
    sector: "Engineering & Real Estate Surveying",
    hasContent: false,
  },
  {
    id: "scanning-older-buildings",
    number: "10",
    name: "Scanning of Older Buildings",
    sector: "Engineering & Real Estate Surveying",
    hasContent: false,
  },
  {
    id: "scan-to-bim",
    number: "11",
    name: "Scan to BIM",
    sector: "Engineering & Real Estate Surveying",
    hasContent: false,
  },
  {
    id: "photorealistic-3d-city-modeling",
    number: "12",
    name: "Smart Cities: Photorealistic 3D City Modeling",
    sector: "Engineering & Real Estate Surveying",
    hasContent: false,
  },
  {
    id: "digital-twins-3d-building-modeling",
    number: "13",
    name: "Digital Twins: 3D Building Modeling",
    sector: "Engineering & Real Estate Surveying",
    hasContent: false,
  },
  {
    id: "real-estate-surveying",
    number: "09",
    name: "Real Estate Surveying",
    sector: "Engineering & Real Estate Surveying",
    hasContent: true,
    copy: "Scan-to-BIM is a construction engineering application that converts reality-capture point clouds of existing buildings into BIM models, supporting faster indoor surveying.",
    deliverables:
      "Point clouds · BIM models · 2D floorplans · existing-building survey documentation",
    deliverableNote:
      "The technology has been applied in existing-building projects, including a case at KACST, Saudi Arabia.",
    details: [
      "Reality capture of existing buildings",
      "Automated BIM model generation",
      "2D floorplan output",
    ],
    visual: estateScanToBimPointcloud,
    reference: estateKacstWorkflow,
  },
  {
    id: "forestry-surveying",
    number: "10",
    name: "Smart Forestry",
    sector: "Smart Forestry",
    hasContent: true,
    copy: "Automated point-cloud and imagery workflows for individual-tree segmentation, forest attribute extraction and urban tree species identification.",
    visual: forestryIndividualSegmentation,
  },
  {
    id: "urban-disaster-monitoring",
    number: "11",
    name: "Urban Disaster Monitoring",
    sector: "Urban Disaster Monitoring",
    hasContent: true,
    copy: "Geohazard AI workflows for landslide extraction and 3D swept-path analysis.",
    visual: disasterLandslideModelOutput,
  },
  {
    id: "road-defect-detection",
    number: "17",
    name: "Road Maintenance",
    sector: "Road Maintenance",
    hasContent: true,
    copy: "Bring corridor imagery, mapped context and condition evidence into one clear view for road teams planning inspections and maintenance.",
    deliverables:
      "Pixel-level distress segmentation · road-condition assessment · mapped defect records · reports",
    deliverableNote:
      "Condition findings are located along the road network to support inspection, prioritisation and maintenance planning.",
    details: [
      "RGB-D road imagery analysis",
      "Road distress segmentation",
      "Road condition assessment",
    ],
    visual: roadMaintenanceMain,
    reference: roadMaintenanceMain,
  },
];
const applicationSectors = [
  {
    id: "urban-renewal",
    title: "Urban Renewal",
    image: buildingDefectThermalVisible,
    ids: ["urban-renewal"],
  },
  {
    id: "smart-construction",
    title: "Smart Construction",
    image: constructionMicApplication,
    ids: ["smart-construction"],
  },
  {
    id: "engineering-real-estate",
    title: "Engineering & Real Estate Surveying",
    image: scanToBimApplication,
    ids: ["real-estate-surveying"],
  },
  {
    id: "forestry-surveying",
    title: "Smart Forestry",
    image: forestryIndividualSegmentation,
    ids: ["forestry-surveying"],
  },
  {
    id: "road-maintenance",
    title: "Road Maintenance",
    image: roadDefectAnalysis,
    ids: ["road-defect-detection"],
  },
  {
    id: "urban-disaster-monitoring",
    title: "Urban Disaster Monitoring",
    image: disasterLandslideAnnotations,
    ids: ["urban-disaster-monitoring"],
  },
];
const route = useRoute();
const router = useRouter();
const selected = ref(products[0]);
const selectedProduct = computed(
  () =>
    products.find((product) => product.id === route.params.productId) ||
    selected.value,
);
const selectedApplication = computed(
  () =>
    cases.find(
      (application) => application.id === route.params.applicationId,
    ) ||
    (route.query.sector === "road-maintenance"
      ? cases.find((application) => application.id === "road-defect-detection")
      : route.query.sector === "urban-renewal"
        ? cases.find((application) => application.id === "urban-renewal")
        : route.query.sector === "smart-construction"
          ? cases.find((application) => application.id === "smart-construction")
          : route.query.sector === "engineering-real-estate"
            ? cases.find(
                (application) => application.id === "real-estate-surveying",
              )
            : undefined) ||
    cases[0],
);
const activeMode = ref(0);
const activeCase = ref(0);
const inquiry = ref({
  name: "",
  company: "",
  phone: "",
  email: "",
  scenario: "",
  message: "",
  consent: false,
});
const formStatus = ref("");
const productsOpen = ref(false);
const applicationsOpen = ref(false);
const mobileMenuOpen = ref(false);
const mobileProductsOpen = ref(false);
const mobileApplicationsOpen = ref(false);
const page = computed(() => {
  if (route.name === "home") return "products";
  return route.name || "products";
});
function pointer(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  el.style.setProperty(
    "--cursor-x",
    `${((event.clientX - r.left) / r.width) * 100}%`,
  );
  el.style.setProperty(
    "--cursor-y",
    `${((event.clientY - r.top) / r.height) * 100}%`,
  );
}
function productHeroPointer(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--image-shift-x", `${x * -12}px`);
  el.style.setProperty("--image-shift-y", `${y * -10}px`);
  el.style.setProperty("--image-glow-x", `${(x + 0.5) * 100}%`);
  el.style.setProperty("--image-glow-y", `${(y + 0.5) * 100}%`);
}
function resetProductHeroPointer(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  el.style.setProperty("--image-shift-x", "0px");
  el.style.setProperty("--image-shift-y", "0px");
  el.style.setProperty("--image-glow-x", "50%");
  el.style.setProperty("--image-glow-y", "50%");
}
function matrixVisualPointer(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--matrix-shift-x", `${x * -9}px`);
  el.style.setProperty("--matrix-shift-y", `${y * -7}px`);
}
function resetMatrixVisualPointer(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  el.style.setProperty("--matrix-shift-x", "0px");
  el.style.setProperty("--matrix-shift-y", "0px");
}
let matrixObserver: IntersectionObserver | undefined;
let forestryFlowObserver: IntersectionObserver | undefined;
let pageRevealObserver: IntersectionObserver | undefined;
async function setupMatrixReveal() {
  matrixObserver?.disconnect();
  if (page.value !== "software" || !("IntersectionObserver" in window)) return;
  await nextTick();
  document
    .querySelectorAll<HTMLElement>(
      ".matrix-hero h1, .matrix-functions h2, .matrix-functions h3, .matrix-feature h2, .matrix-deliverables h2",
    )
    .forEach((element) => element.classList.add("matrix-heading-reveal"));
  document
    .querySelectorAll<HTMLElement>(
      ".matrix-hero > div:first-child > p, .matrix-interface-frame figcaption, .matrix-functions__heading > p, .matrix-function-groups li, .matrix-feature__copy > p:not(.matrix-feature__index), .matrix-deliverables > div:last-child > p, .matrix-deliverables li",
    )
    .forEach((element) => element.classList.add("matrix-body-reveal"));
  matrixObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        matrixObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  document
    .querySelectorAll<HTMLElement>(
      ".matrix-reveal, .matrix-reveal-item, .matrix-heading-reveal, .matrix-body-reveal",
    )
    .forEach((element) => matrixObserver?.observe(element));
}
function showSpec(product: Product) {
  productsOpen.value = false;
  applicationsOpen.value = false;
  mobileMenuOpen.value = false;
  selected.value = product;
  router.push(`/products/${product.id}`);
}
async function setupForestryFlowReveal() {
  forestryFlowObserver?.disconnect();
  await nextTick();
  const flows = document.querySelectorAll<HTMLElement>(".forestry-flow-reveal");
  if (!flows.length) return;

  flows.forEach((flow) => {
    flow.classList.remove("is-visible");
    flow.classList.add("is-ready");
  });
  if (!("IntersectionObserver" in window)) {
    flows.forEach((flow) => flow.classList.add("is-visible"));
    return;
  }

  forestryFlowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        forestryFlowObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );
  flows.forEach((flow) => forestryFlowObserver?.observe(flow));
}
async function setupPageReveal() {
  pageRevealObserver?.disconnect();
  await nextTick();
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("main h1, main h2, main img"),
  ).filter(
    (element) =>
      !element.closest(".matrix-reveal") &&
      !element.closest(".forestry-flow-reveal"),
  );

  elements.forEach((element, index) => {
    element.classList.remove("is-visible");
    element.classList.add(
      element.matches("h1, h2") ? "page-title-reveal" : "page-image-reveal",
    );
    element.style.setProperty(
      "--page-reveal-delay",
      `${Math.min(index % 4, 3) * 55}ms`,
    );
  });
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  pageRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        pageRevealObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6%" },
  );
  elements.forEach((element) => pageRevealObserver?.observe(element));
}
function productImage(product: Product) {
  return (
    productVisuals[products.findIndex((item) => item.id === product.id)]?.[0] ||
    ""
  );
}
function productDetailFocus(product: Product) {
  const focus: Record<string, string> = {
    backpack: "72% 50%",
    handheld: "68% 50%",
    vehicle: "70% 50%",
    uav: "78% 44%",
    robot: "70% 50%",
    dog: "70% 50%",
    usv: "68% 50%",
    arm: "70% 50%",
  };
  return focus[product.id] || "50% 50%";
}
function applicationImage(application: (typeof cases)[number]) {
  return application.visual || "";
}
function applicationReferenceImage(application: (typeof cases)[number]) {
  return application.reference || application.visual || "";
}
function showApplication(application: (typeof cases)[number]) {
  applicationsOpen.value = false;
  mobileMenuOpen.value = false;
  activeCase.value = cases.findIndex((item) => item.id === application.id);
  router.push(`/applications/${application.id}`);
}
function showSector(sector: (typeof applicationSectors)[number]) {
  applicationsOpen.value = false;
  const application = cases.find((item) => item.id === sector.ids[0]);
  if (application) showApplication(application);
}
const productTones = [
  "#eaf5ff",
  "#effaf7",
  "#f4f0ff",
  "#fff5eb",
  "#eef9fc",
  "#eef3ff",
  "#fff2f4",
  "#ecf8f7",
  "#f4f5fa",
];
const productVisuals = [
  [backpackImage, backpackImage2],
  [handheldImage, handheldImage2],
  [vehicleImage, vehicleImage2],
  [uavImage, uavImage2],
  [robotImage, robotImage2],
  [robotDogImage, robotDogImage2],
  [usvImage, ""],
  [roboticArmImage, ""],
];
const productStoryViews = [
  { primary: "50% 50%", secondary: "50% 51%", titleY: "16%", introY: "64%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "15%", introY: "65%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "15%", introY: "65%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "16%", introY: "65%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "15%", introY: "66%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "15%", introY: "66%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "16%", introY: "65%" },
  { primary: "50% 50%", secondary: "50% 50%", titleY: "15%", introY: "65%" },
];
const scrollProducts = computed(() => products);
function productIndex(product: Product) {
  return products.findIndex((item) => item.id === product.id);
}
const activeProductPage = ref(0);
const navHidden = ref(false);
let previousScrollY = 0;
const productStoryProgress = ref(0);
const productStories = ref<HTMLElement | null>(null);
function trackProductScroll() {
  const scrollY = window.scrollY;
  if (scrollY > previousScrollY) {
    productsOpen.value = false;
    applicationsOpen.value = false;
  }
  navHidden.value =
    !productsOpen.value &&
    !applicationsOpen.value &&
    scrollY > 120 &&
    scrollY > previousScrollY;
  previousScrollY = scrollY;
  const root = productStories.value;
  if (!root) return;
  const stories = [...root.querySelectorAll<HTMLElement>(".product-story")];
  const top = window.innerWidth <= 760 ? 64 : 86;
  const frame = window.innerHeight - top;
  let found = 0;
  let progress = 0;
  for (const [index, story] of stories.entries()) {
    const rect = story.getBoundingClientRect();
    if (rect.top <= top && rect.bottom > top) {
      found = index;
      progress = Math.min(2, Math.max(0, (top - rect.top) / frame));
      break;
    }
  }
  activeProductPage.value = found;
  productStoryProgress.value = progress;
}
function revealNavigation(event: MouseEvent) {
  if (event.clientY < 36) navHidden.value = false;
}
function collapseMenusOnWheel(event: WheelEvent) {
  if (event.deltaY > 0) {
    productsOpen.value = false;
    applicationsOpen.value = false;
  }
}
function storyStyle(index: number, hasSecondary: boolean) {
  const raw =
    index === activeProductPage.value ? productStoryProgress.value : 0;
  const zoom = Math.min(1, raw);
  const crossfade = hasSecondary
    ? Math.min(1, Math.max(0, (raw - 1) / 0.45))
    : 0;
  return {
    "--story-scale": String(0.5 + zoom * 0.5),
    "--primary-opacity": String(1 - crossfade),
    "--secondary-opacity": String(crossfade),
    "--title-opacity": String(hasSecondary ? Math.max(0, 1 - zoom * 2.3) : 1),
    "--title-shift": `${hasSecondary ? -zoom * 118 : 0}px`,
    "--intro-opacity": String(crossfade),
    "--intro-shift": `${(1 - crossfade) * 34}px`,
    "--sweep-shift": `${crossfade * 235}%`,
  };
}
onMounted(() => {
  window.addEventListener("scroll", trackProductScroll, { passive: true });
  window.addEventListener("resize", trackProductScroll);
  window.addEventListener("mousemove", revealNavigation, { passive: true });
  window.addEventListener("wheel", collapseMenusOnWheel, { passive: true });
  requestAnimationFrame(trackProductScroll);
  setupMatrixReveal();
  setupForestryFlowReveal();
  setupPageReveal();
});
watch(page, () => setupMatrixReveal());
watch([page, () => selectedApplication.value.id], () =>
  setupForestryFlowReveal(),
);
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
    setupPageReveal();
  },
);
onBeforeUnmount(() => {
  window.removeEventListener("scroll", trackProductScroll);
  window.removeEventListener("resize", trackProductScroll);
  window.removeEventListener("mousemove", revealNavigation);
  window.removeEventListener("wheel", collapseMenusOnWheel);
  matrixObserver?.disconnect();
  forestryFlowObserver?.disconnect();
  pageRevealObserver?.disconnect();
});
async function sendInquiry() {
  formStatus.value = "Submitting project details…";
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry.value),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    formStatus.value =
      "Received. SmartSpace will respond with a recommended mapping workflow.";
    inquiry.value = {
      name: "",
      company: "",
      phone: "",
      email: "",
      scenario: "",
      message: "",
      consent: false,
    };
  } catch (error) {
    formStatus.value =
      error instanceof Error
        ? error.message
        : "Unable to submit at the moment. Please try again.";
  }
}
</script>

<template>
  <header class="topbar" :class="{ 'is-hidden': navHidden }">
    <RouterLink to="/" class="brand brand-logo"
      ><img :src="smartspaceLogo" alt="SmartSpace"
    /></RouterLink>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <div class="products-nav" :class="{ 'is-open': productsOpen }">
        <button
          class="products-toggle"
          type="button"
          :aria-expanded="productsOpen"
          @click="
            productsOpen = !productsOpen;
            applicationsOpen = false;
          "
        >
          Products <i>⌄</i>
        </button>
        <div class="products-mega">
          <div class="products-mega__intro">
            <span>PRODUCTS</span><b>SpaceScanX systems</b>
            <p>Capture platforms for every spatial workflow.</p>
            <RouterLink to="/products" @click="productsOpen = false"
              >Explore all systems <i>→</i></RouterLink
            >
          </div>
          <div class="products-mega__grid">
            <button
              v-for="(product, index) in products"
              :key="product.id"
              type="button"
              @click="showSpec(product)"
            >
              <span class="products-mega__image"
                ><img
                  v-if="productVisuals[index][0]"
                  :src="productVisuals[index][0]"
                  :alt="product.name" /></span
              ><b>{{ product.name.replace(" SpaceScanX", "") }}</b
              ><small>{{ product.platform }}</small>
            </button>
          </div>
        </div>
      </div>
      <RouterLink to="/software">SpaceMatrix</RouterLink>
      <div class="applications-nav" :class="{ 'is-open': applicationsOpen }">
        <button
          class="applications-toggle"
          type="button"
          :aria-expanded="applicationsOpen"
          @click="
            applicationsOpen = !applicationsOpen;
            productsOpen = false;
          "
        >
          Application <i>⌄</i>
        </button>
        <div class="applications-mega">
          <div class="applications-mega__intro">
            <span>APPLICATIONS</span><b>Spatial workflows</b>
            <p>
              Project-ready outputs for built assets, infrastructure and cities.
            </p>
          </div>
          <div class="applications-mega__grid">
            <button
              v-for="sector in applicationSectors"
              :key="sector.id"
              type="button"
              @click="showSector(sector)"
            >
              <span class="applications-mega__image">
                <img :src="sector.image" :alt="sector.title" />
                <span class="applications-mega__overlay">
                  <small>APPLICATION DIRECTION</small>
                  <b>{{ sector.title }}</b>
                  <i>→</i>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <button
      class="mobile-menu-toggle"
      type="button"
      :aria-expanded="mobileMenuOpen"
      aria-label="Toggle navigation menu"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      <i></i><i></i><i></i>
    </button>
    <RouterLink to="/contact" class="top-cta">Contact Us <i>↗</i></RouterLink>
    <nav
      v-if="mobileMenuOpen"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >
      <RouterLink to="/">Home</RouterLink>
      <section
        class="mobile-nav-group"
        :class="{ 'is-open': mobileProductsOpen }"
      >
        <button
          type="button"
          :aria-expanded="mobileProductsOpen"
          @click="mobileProductsOpen = !mobileProductsOpen"
        >
          Products <i>+</i>
        </button>
        <div class="mobile-nav-submenu">
          <button
            v-for="product in products"
            :key="product.id"
            type="button"
            @click="showSpec(product)"
          >
            {{ product.name }} <i>→</i>
          </button>
        </div>
      </section>
      <RouterLink to="/software">SpaceMatrix</RouterLink>
      <section
        class="mobile-nav-group"
        :class="{ 'is-open': mobileApplicationsOpen }"
      >
        <button
          type="button"
          :aria-expanded="mobileApplicationsOpen"
          @click="mobileApplicationsOpen = !mobileApplicationsOpen"
        >
          Application <i>+</i>
        </button>
        <div class="mobile-nav-submenu">
          <button
            v-for="sector in applicationSectors"
            :key="sector.id"
            type="button"
            @click="showSector(sector)"
          >
            {{ sector.title }} <i>→</i>
          </button>
        </div>
      </section>
    </nav>
  </header>
  <main @mousemove="pointer">
    <template v-if="page === 'home'">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">SMARTSPACE / SPATIAL INTELLIGENCE</p>
          <h1>Space, captured<br />with <em>clarity.</em></h1>
          <p>
            SmartSpace connects field-ready mobile mapping systems with
            SpaceMatrix processing, so every survey becomes a practical spatial
            asset.
          </p>
          <div class="actions">
            <RouterLink to="/products" class="button"
              >Explore systems <i>→</i></RouterLink
            ><RouterLink to="/contact" class="text-link"
              >Talk to an expert <i>↗</i></RouterLink
            >
          </div>
        </div>
        <div class="hero-media asset-slot featured">
          <span>HERO IMAGE / VIDEO SLOT</span
          ><small>Recommended ratio: 4:5</small><i></i>
        </div>
        <div class="hero-index"><span>SCROLL TO EXPLORE</span><b>01</b></div>
      </section>
      <section class="statement">
        <p>One spatial workflow. Many ways to move through the world.</p>
        <div>
          <span>LiDAR</span><span>IMU</span><span>GNSS</span><span>Vision</span
          ><span>SpaceMatrix</span>
        </div>
      </section>
      <section class="section mode-section">
        <div class="section-heading">
          <p class="eyebrow">CONNECTED WORKFLOW / 01</p>
          <h2>From the first scan<br />to the next decision.</h2>
        </div>
        <div class="mode-tabs">
          <button
            v-for="(mode, i) in systemModes"
            :key="mode.title"
            :class="{ active: activeMode === i }"
            @mouseenter="activeMode = i"
            @focus="activeMode = i"
            @click="activeMode = i"
          >
            <span>{{ mode.tag }}</span
            ><b>{{ mode.title }}</b
            ><i>+</i>
          </button>
        </div>
        <div class="mode-display">
          <div class="asset-slot wide">
            <span
              >{{ systemModes[activeMode].title.toUpperCase() }} MEDIA
              SLOT</span
            ><small
              >Replace with project image, animation or product footage</small
            >
          </div>
          <article>
            <p class="eyebrow">{{ systemModes[activeMode].tag }}</p>
            <h3>{{ systemModes[activeMode].title }} with intent.</h3>
            <p>{{ systemModes[activeMode].copy }}</p>
            <small>{{ systemModes[activeMode].detail }}</small
            ><RouterLink
              :to="
                activeMode === 0
                  ? '/products'
                  : activeMode === 1
                    ? '/software'
                    : '/applications/urban-renewal'
              "
              >Explore this layer <i>→</i></RouterLink
            >
          </article>
        </div>
      </section>
      <section class="section system-overview">
        <div class="section-heading">
          <p class="eyebrow">SYSTEMS / 02</p>
          <h2>A platform for every<br />operating environment.</h2>
        </div>
        <div class="asset-grid">
          <button
            v-for="(product, index) in products.slice(0, 6)"
            :key="product.id"
            class="asset-card"
            @click="showSpec(product)"
          >
            <span>0{{ index + 1 }}</span>
            <div class="asset-slot"><small>PRODUCT IMAGE SLOT</small></div>
            <b>{{ product.name }}</b>
            <p>{{ product.platform }}</p>
            <i>View data →</i>
          </button>
        </div>
      </section>
      <section class="full-media">
        <div class="asset-slot">
          <span>FULL-WIDTH PROJECT IMAGE / VIDEO SLOT</span
          ><small>Recommended ratio: 21:9</small>
        </div>
        <div>
          <p class="eyebrow">FIELD MOTION / 03</p>
          <h2>Show the work.<br />Keep the craft visible.</h2>
          <p>
            Reserve this large-format canvas for a project film, a slow-moving
            point-cloud sequence, or carefully art-directed field photography.
          </p>
        </div>
      </section>
      <section class="section outcomes">
        <div class="section-heading">
          <p class="eyebrow">PROJECT OUTCOMES / 04</p>
          <h2>More than a survey.<br />A usable spatial foundation.</h2>
        </div>
        <article
          v-for="(item, index) in [
            [
              'Capture',
              'A reliable record of point clouds, imagery, trajectories and sensor states.',
            ],
            [
              'Understand',
              'A consistent software workflow for registration, modelling, extraction and review.',
            ],
            [
              'Use',
              'Spatial outputs ready for planning, construction, inspection and ongoing operations.',
            ],
          ]"
          :key="item[0]"
        >
          <span>0{{ index + 1 }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </section>
    </template>
    <template v-else-if="page === 'products'"
      ><section class="system-film-hero">
        <div class="asset-slot system-film-slot">
          <img class="system-film-background" :src="spacescanxHeroGif" alt="" />
          <div class="system-film-overlay">
            <img
              :src="spacescanxWordmark"
              alt="SpaceScanX Mobile Mapping System"
            />
          </div>
        </div>
      </section>
      <section
        ref="productStories"
        class="product-pages"
        aria-label="SpaceScanX systems"
      >
        <section class="about-simple">
          <header class="product-section-title"><h2>ABOUT US</h2></header>
          <div class="about-simple-layout">
            <div class="asset-slot about-image-slot">
              <img
                :src="smartspaceAbout"
                alt="SmartSpace Technologies Limited"
              />
            </div>
            <article>
              <p>
                SmartSpace Technologies Co., Ltd. is a high-tech enterprise
                supported by The Hong Kong Polytechnic University. Based on
                leading geospatial technologies, we deliver advanced products,
                solutions and services for smart cities.
              </p>
              <p>
                Our core business includes 3D mobile laser mapping systems,
                smart-city platforms and urban spatiotemporal big-data analytics
                solutions.
              </p>
              <p>
                Our key technologies have received the Gold Medal at the 2021
                International Exhibition of Inventions of Geneva, the 2023
                International Smart City Technology Innovation Gold Award, the
                Gold Medal at the Asia International Innovation &amp; Invention
                Expo, and other recognitions.
              </p>
              <p>
                Through continuous innovation in technology and products, we
                make professional, efficient and convenient spatial services
                more accessible to every user.
              </p>
            </article>
          </div>
        </section>
        <header class="product-section-title"><h2>PRODUCT</h2></header>
        <article
          v-for="(product, index) in scrollProducts"
          :key="product.id"
          class="product-story"
          :class="{ active: activeProductPage === index }"
          :style="{
            '--stage-tone': productTones[productIndex(product)],
            '--title-y': productStoryViews[productIndex(product)].titleY,
            '--intro-y': productStoryViews[productIndex(product)].introY,
          }"
        >
          <div
            class="product-scene"
            :style="
              storyStyle(index, !!productVisuals[productIndex(product)][1])
            "
          >
            <div
              class="asset-slot product-background product-background-primary"
              :class="{ 'has-demo': productVisuals[productIndex(product)][0] }"
              :style="{
                '--product-media': productVisuals[productIndex(product)][0]
                  ? `url(${productVisuals[productIndex(product)][0]})`
                  : 'none',
                '--product-position':
                  productStoryViews[productIndex(product)].primary,
              }"
            >
              <template v-if="!productVisuals[productIndex(product)][0]"
                ><span>PRODUCT IDENTITY IMAGE / VIDEO SLOT</span
                ><small
                  >First scene: product name and hero visual</small
                ></template
              >
            </div>
            <div
              v-if="productVisuals[productIndex(product)][1]"
              class="asset-slot product-background product-background-secondary"
              :class="{ 'has-demo': productVisuals[productIndex(product)][1] }"
              :style="{
                '--product-media': productVisuals[productIndex(product)][1]
                  ? `url(${productVisuals[productIndex(product)][1]})`
                  : 'none',
                '--product-position':
                  productStoryViews[productIndex(product)].secondary,
              }"
            ></div>
            <div class="product-title">
              <h2>{{ product.name }}</h2>
            </div>
            <div
              v-if="productVisuals[productIndex(product)][1]"
              class="product-intro"
            >
              <p>{{ product.statement }}</p>
              <button class="text-button" @click="showSpec(product)">
                View technical specification →
              </button>
            </div>
          </div>
        </article>
      </section></template
    >
    <template v-else-if="page === 'software'">
      <section class="matrix-hero matrix-hero--overview matrix-reveal">
        <div>
          <h1>
            <span>Desktop software for processing</span><br /><em
              >LiDAR point clouds.</em
            >
          </h1>
          <p>
            SpaceMatrix is desktop software for processing LiDAR point clouds
            for smart city and digital twin applications. It brings point
            clouds, panoramas and 3D models into one coordinated workspace.
          </p>
          <RouterLink to="/contact" class="button"
            >Discuss your data workflow <i>→</i></RouterLink
          >
        </div>
        <figure class="matrix-interface-frame">
          <img
            :src="spaceMatrixSynchronisedRoaming"
            alt="SpaceMatrix interface showing synchronized point cloud, panorama and BIM views"
          />
          <figcaption>
            One workspace for point clouds, panoramic images and BIM context.
          </figcaption>
        </figure>
      </section>

      <section class="matrix-functions matrix-reveal">
        <header class="matrix-functions__heading">
          <h2>From capture data<br />to <em>usable outputs.</em></h2>
          <p>
            Process, analyse, extract and model 3D point clouds and panoramic
            images from SpaceScanX and other laser scanning systems. Generate
            georeferenced and colorized point clouds, survey trajectories,
            street-view models, 3D models and inspection outputs for
            professional geospatial workflows.
          </p>
        </header>
        <figure class="matrix-function-atlas">
          <img
            :src="spaceMatrixFunctionAtlas"
            alt="SpaceMatrix functions including GNSS RTK generation, georeferencing, BIM modelling and street object extraction"
          />
        </figure>
        <div class="matrix-function-groups">
          <article
            v-for="group in matrixFunctionGroups"
            :key="group.number"
            class="matrix-reveal-item"
          >
            <span>{{ group.number }}</span>
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="matrix-feature matrix-feature--roaming matrix-reveal">
        <div class="matrix-feature__copy">
          <p class="matrix-feature__index">1 / 2</p>
          <h2>
            <span>Synchronized roaming</span
            ><em>Point clouds, panoramas &amp; BIM.</em>
          </h2>
          <p>
            Navigate the same location through colorized point clouds, panoramic
            imagery and a BIM model. The linked views retain visual context
            while helping teams review captured conditions and modelled space
            together.
          </p>
        </div>
        <figure
          class="matrix-roaming-visual"
          @mousemove="matrixVisualPointer"
          @mouseleave="resetMatrixVisualPointer"
        >
          <img
            :src="spaceMatrixSynchronisedRoaming"
            alt="Synchronized roaming across point cloud, panorama and BIM windows"
          />
          <img
            :src="spaceMatrixColourizedCity"
            alt="Colorized urban LiDAR point cloud in SpaceMatrix"
          />
        </figure>
      </section>

      <section class="matrix-feature matrix-feature--measurement matrix-reveal">
        <figure
          class="matrix-measurement-visual"
          @mousemove="matrixVisualPointer"
          @mouseleave="resetMatrixVisualPointer"
        >
          <img
            :src="spaceMatrixPanoramicMeasurement"
            alt="Panoramic image 3D measurement view in SpaceMatrix"
          />
          <img
            :src="spaceMatrixMeasurementDetail"
            alt="Close detail of a measured panoramic image point"
          />
        </figure>
        <div class="matrix-feature__copy">
          <p class="matrix-feature__index">2 / 2</p>
          <h2>Panoramic image<br /><em>3D measurement.</em></h2>
          <p>
            Inspect distances and spatial relationships directly within the
            panoramic image while keeping the corresponding point cloud in view.
            This creates a clear visual record for review, measurement and
            communication without losing the source context.
          </p>
        </div>
      </section>

      <section class="matrix-deliverables matrix-reveal">
        <div>
          <p class="eyebrow">PROJECT OUTPUTS</p>
          <h2>Spatial data that<br /><em>moves work forward.</em></h2>
        </div>
        <div>
          <p>
            SpaceMatrix connects capture data with the models, measurements and
            inspection information teams need to use next.
          </p>
          <ul>
            <li>Georeferenced and colorized point clouds</li>
            <li>Survey trajectories, street-view and 3D models</li>
            <li>Object detection and inspection results</li>
          </ul>
        </div>
      </section>
    </template>
    <template v-else-if="page === 'application-detail'"
      ><section
        class="application-detail-hero"
        :class="{
          'smart-construction-detail-hero':
            selectedApplication.id === 'smart-construction',
          'urban-disaster-detail-hero':
            selectedApplication.id === 'urban-disaster-monitoring',
        }"
      >
        <div>
          <h1>{{ selectedApplication.name }}</h1>
          <p>{{ selectedApplication.copy || "Project overview" }}</p>
          <div
            v-if="selectedApplication.id === 'smart-construction'"
            class="smart-construction-hero__sources"
          >
            <span>BIM components</span>
            <span>Point clouds &amp; panoramas</span>
            <span>Time-series evidence</span>
          </div>
          <RouterLink to="/contact" class="button"
            >Discuss this application <i>→</i></RouterLink
          >
        </div>
        <div
          v-if="selectedApplication.id === 'road-defect-detection'"
          class="application-detail-image road-maintenance-hero-image"
        >
          <img
            :src="roadMaintenanceMain"
            alt="Road defect analysis and road corridor point cloud overview"
          />
        </div>
        <div
          v-else-if="selectedApplication.id === 'forestry-surveying'"
          class="application-detail-image forestry-hero-stack"
        >
          <img
            class="forestry-hero-stack__main"
            :src="forestryAttributeOverview"
            alt="Forested site captured as a colorized point cloud"
          />
          <figure>
            <img
              :src="forestrySegmentationDetail"
              alt="Individual trees separated from a forest point cloud"
            />
            <figcaption>INDIVIDUAL TREE SEGMENTATION</figcaption>
          </figure>
        </div>
        <div
          v-else-if="selectedApplication.id === 'urban-disaster-monitoring'"
          class="application-detail-image disaster-hero-stack"
        >
          <img
            class="disaster-hero-stack__main"
            :src="disasterLandslideAnnotations"
            alt="Aerial imagery with landslide annotations"
          />
          <img
            class="disaster-hero-stack__inset"
            :src="disasterLandslideModelOutput"
            alt="Landslide extraction model output"
          />
        </div>
        <div
          v-else-if="
            selectedApplication.hasContent || selectedApplication.visual
          "
          class="application-detail-image"
          :class="{
            'urban-renewal-hero-image':
              selectedApplication.id === 'urban-renewal',
            'smart-construction-hero-image':
              selectedApplication.id === 'smart-construction',
            'real-estate-surveying-hero-image':
              selectedApplication.id === 'real-estate-surveying',
            'forestry-surveying-hero-image':
              selectedApplication.id === 'forestry-surveying',
          }"
        >
          <img
            :src="applicationImage(selectedApplication)"
            :alt="selectedApplication.name"
          />
        </div>
        <div v-else class="application-placeholder-media">
          Image placeholder
        </div>
      </section>
      <figure
        v-if="
          selectedApplication.hasContent &&
          selectedApplication.id !== 'road-defect-detection' &&
          selectedApplication.id !== 'urban-renewal' &&
          selectedApplication.id !== 'smart-construction' &&
          selectedApplication.id !== 'real-estate-surveying' &&
          selectedApplication.id !== 'forestry-surveying' &&
          selectedApplication.id !== 'urban-disaster-monitoring'
        "
        class="application-project-reference"
      >
        <img
          :src="applicationReferenceImage(selectedApplication)"
          :alt="`${selectedApplication.name} project reference`"
        />
        <figcaption>PROJECT REFERENCE</figcaption>
      </figure>
      <section
        v-if="
          selectedApplication.hasContent &&
          selectedApplication.id !== 'road-defect-detection' &&
          selectedApplication.id !== 'urban-renewal' &&
          selectedApplication.id !== 'smart-construction' &&
          selectedApplication.id !== 'real-estate-surveying' &&
          selectedApplication.id !== 'forestry-surveying' &&
          selectedApplication.id !== 'urban-disaster-monitoring'
        "
        class="application-detail-content"
      >
        <header>
          <p class="eyebrow">WHAT THIS APPLICATION DELIVERS</p>
          <h2>What this application<br /><em>delivers.</em></h2>
        </header>
        <div>
          <p class="application-detail-deliverables">
            {{ selectedApplication.deliverables }}
          </p>
          <p class="application-detail-note">
            {{ selectedApplication.deliverableNote }}
          </p>
          <article
            v-for="(detail, index) in selectedApplication.details"
            :key="detail"
          >
            <span>{{ String(index + 1).padStart(2, "0") }}</span
            ><b>{{ detail }}</b>
          </article>
        </div>
      </section>
      <template v-if="selectedApplication.id === 'road-defect-detection'">
        <section class="road-maintenance-location">
          <div>
            <p class="eyebrow">LOCATION &amp; MEASUREMENT</p>
            <h2>Turn observations into<br /><em>mapped evidence.</em></h2>
            <p>
              Connect road imagery with its route, measured extent and
              real-world location. Each finding can be reviewed in context and
              prepared for field follow-up.
            </p>
          </div>
          <figure>
            <img
              :src="roadMaintenanceLocation"
              alt="Road inspection route, street view and measured defect records"
            />
            <figcaption>ROUTE CONTEXT / MEASURED DEFECT RECORDS</figcaption>
          </figure>
        </section>
        <section class="road-maintenance-survey">
          <header>
            <p class="eyebrow">CORRIDOR SURVEY</p>
            <h2>One corridor,<br /><em>multiple views.</em></h2>
            <p>
              Overview, intersection and street-level point-cloud views provide
              a shared reference for asset inspection and condition assessment.
            </p>
          </header>
          <figure>
            <img
              :src="roadMaintenanceSurvey"
              alt="Road corridor survey shown from overview, intersection and street level"
            />
            <figcaption>ROAD CORRIDOR / POINT-CLOUD SURVEY</figcaption>
          </figure>
        </section>
      </template>
      <template v-if="selectedApplication.id === 'urban-renewal'">
        <section class="urban-renewal-building">
          <div>
            <p class="eyebrow">Building Defect Detection</p>
            <h2>Find facade defects<br /><em>with context.</em></h2>
            <p>
              Self-developed specialist models and multimodal large models
              analyse visible-light and thermal-infrared imagery, detect facade
              defects, visualise results on a 3D model and automatically
              generate reports.
            </p>
          </div>
          <figure>
            <img
              :src="urbanBuildingThermal"
              alt="Thermal and visible-light building defect inspection results"
            />
            <figcaption>THERMAL + VISIBLE-LIGHT INSPECTION</figcaption>
          </figure>
        </section>
        <section class="urban-renewal-street-assets">
          <div class="urban-renewal-street-assets__grid">
            <figure>
              <img
                :src="urbanSignboard"
                alt="Signboard defects mapped and reviewed in an inspection dashboard"
              />
              <figcaption>SIGNBOARD DEFECT DETECTION</figcaption>
              <p>
                Segment signboards, identify defects and localise each result in
                the inspection system for practical field use.
              </p>
            </figure>
            <div class="urban-renewal-street-assets__short">
              <header>
                <p class="eyebrow">Signboard Defect Detection</p>
                <h2>Detect, locate and<br /><em>review street assets.</em></h2>
                <p>
                  Vehicle-mounted mobile mapping supports asset-level inspection
                  across the street network, from signboards to regulatory
                  traffic signs.
                </p>
              </header>
              <figure>
                <img
                  :src="urbanTrafficSign"
                  alt="Traffic sign defects recognised from vehicle-mapping imagery"
                />
                <figcaption>TRAFFIC SIGN DEFECT DETECTION</figcaption>
                <p>
                  Recognise multiple traffic-sign types and detect condition
                  issues from vehicle-mounted mapping imagery.
                </p>
              </figure>
            </div>
          </div>
        </section>
        <section class="urban-renewal-floorplan">
          <header>
            <p class="eyebrow">2D Floor Plan Generation</p>
            <h2>From point cloud<br /><em>to floorplan.</em></h2>
            <p>
              Scan-to-Floorplan converts indoor point clouds into 2D floorplans,
              providing spatial layouts and building geometry for survey
              documentation and renovation planning.
            </p>
          </header>
          <div class="urban-renewal-floorplan__examples">
            <figure>
              <img
                :src="urbanFloorPointcloud"
                alt="Indoor point cloud used for floorplan generation"
              />
              <figcaption>INPUT / INDOOR POINT CLOUD</figcaption>
            </figure>
            <figure>
              <img
                :src="urbanFloorplan"
                alt="Generated two-dimensional floorplan"
              />
              <figcaption>OUTPUT / 2D FLOORPLAN</figcaption>
            </figure>
          </div>
          <figure class="urban-renewal-floorplan__workflow">
            <img
              :src="urbanUraWorkflow"
              alt="Point cloud to model to floorplan workflow"
            />
            <figcaption class="urban-renewal-floorplan__ura-note">
              <p class="eyebrow">APPLICATION / HONG KONG</p>
              <h3>Used by the Urban Renewal Authority.</h3>
              <p>
                Hong Kong's Urban Renewal Authority applied SmartSpace
                Scan-to-Floorplan to convert interior point clouds of aging
                buildings into documented 2D layouts for survey work and
                renovation planning.
              </p>
            </figcaption>
          </figure>
        </section>
        <figure class="urban-renewal-reference">
          <img
            :src="urbanRenewalSurvey"
            alt="Urban renewal survey point-cloud reference views"
          />
          <figcaption>URBAN RENEWAL / SURVEY REFERENCE</figcaption>
        </figure>
      </template>
      <template v-if="selectedApplication.id === 'smart-construction'">
        <section class="smart-construction-location">
          <div>
            <p class="eyebrow">SITE CONTEXT</p>
            <h2>Stay Located in<br /><em>the Site.</em></h2>
            <p>
              Link BIM components with point clouds, panoramic imagery and the
              current site position. Teams can review where an observation
              belongs before comparing it with planned work.
            </p>
          </div>
          <figure>
            <img
              :src="constructionSiteLocation"
              alt="Site location shown across a point cloud and BIM floor plan"
            />
            <figcaption>POINT CLOUD + BIM LOCATION CONTEXT</figcaption>
          </figure>
        </section>
        <section class="smart-construction-progress">
          <figure>
            <img
              :src="constructionProgressRecognition"
              alt="Component-level progress recognition with progress chart and dated evidence"
            />
            <figcaption>COMPONENT-LEVEL PROGRESS RECOGNITION</figcaption>
          </figure>
          <div>
            <p class="eyebrow">CONSTRUCTION PROGRESS MONITORING</p>
            <h2>Component-level<br /><em>Progress Recognition.</em></h2>
            <p>
              Construction-domain AI connects BIM components with time-series
              site evidence to identify, document and communicate progress at
              the component level.
            </p>
            <ul>
              <li>Progress charts and tables</li>
              <li>Dated component evidence</li>
              <li>Review-ready BIM context</li>
            </ul>
          </div>
        </section>
      </template>
      <template v-if="selectedApplication.id === 'forestry-surveying'">
        <section class="forestry-segmentation">
          <header>
            <div>
              <p class="eyebrow">INDIVIDUAL TREE SEGMENTATION</p>
              <h2>Individual tree<br /><em>segmentation.</em></h2>
            </div>
            <p>
              The Individual Tree Segmentation method automatically identifies
              and separates individual trees from forest point clouds.
            </p>
          </header>
          <div
            class="forestry-segmentation__visuals forestry-flow-reveal forestry-segmentation-reveal"
          >
            <figure>
              <img
                :src="forestryIndividualSegmentation"
                alt="Forest point cloud for individual tree segmentation"
              />
              <figcaption>INPUT / FOREST POINT CLOUD</figcaption>
            </figure>
            <span class="forestry-segmentation__arrow" aria-hidden="true">
              <small>SEGMENT</small><i></i><b></b>
            </span>
            <figure>
              <img
                :src="forestrySegmentationDetail"
                alt="Individual trees separated into distinct point-cloud objects"
              />
              <figcaption>OUTPUT / INDIVIDUAL TREE SEGMENTS</figcaption>
            </figure>
          </div>
        </section>
        <section class="forestry-attributes">
          <div class="forestry-attributes__flow forestry-flow-reveal">
            <figure class="forestry-attributes__source">
              <img
                :src="forestryAttributeOverview"
                alt="Point cloud overview of surveyed trees"
              />
              <figcaption>INPUT / SITE POINT CLOUD</figcaption>
            </figure>
            <figure class="forestry-attributes__tree">
              <img
                :src="forestryAttributeDetail"
                alt="Detailed tree point cloud for attribute measurement"
              />
              <figcaption>INDIVIDUAL TREE</figcaption>
            </figure>
            <span
              class="forestry-attributes__arrow forestry-attributes__arrow--down"
              aria-hidden="true"
            ></span>
            <figure class="forestry-attributes__metrics">
              <img
                :src="forestryAttributeWorkflow"
                alt="Tree crown and trunk attributes extracted from point clouds"
              />
              <figcaption>OUTPUT / CROWN + STEM PARAMETERS</figcaption>
            </figure>
            <figure class="forestry-attributes__table">
              <img
                :src="forestryAttributeParameters"
                alt="Tree attribute measurement parameters table"
              />
              <figcaption>OUTPUT / TREE ATTRIBUTE REPORT</figcaption>
            </figure>
          </div>
          <div>
            <p class="eyebrow">TREE ATTRIBUTE EXTRACTION</p>
            <h2>Measure the<br /><em>forest.</em></h2>
            <p>
              Automatically derive key forest parameters from point clouds,
              including tree height, crown diameter, diameter at breast height
              (DBH) and stem position. The software exports analysis reports and
              tree measurement data in CSV format.
            </p>
            <p class="forestry-attributes__application">
              Applied for Hong Kong Institute of Vocational Education (IVE).
            </p>
          </div>
        </section>
        <section class="forestry-species">
          <div>
            <p class="eyebrow">TREE SPECIES IDENTIFICATION</p>
            <h2><span>Recognise urban</span><em>tree species.</em></h2>
            <p>
              Street-view imagery is used to explore automated recognition of
              Hong Kong urban trees. The project develops image-based workflows,
              evaluates model predictions, and highlights uncertainty and
              practical deployment limitations.
            </p>
          </div>
          <div class="forestry-species__visuals">
            <figure>
              <img
                :src="forestrySpeciesCity"
                alt="Street-view tree species identification interface"
              />
              <figcaption>STREET-VIEW IMAGE REVIEW</figcaption>
            </figure>
            <figure>
              <img
                :src="forestrySpeciesResult"
                alt="Candidate tree species and model confidence results"
              />
              <figcaption>CANDIDATES / MODEL CONFIDENCE</figcaption>
            </figure>
          </div>
        </section>
      </template>
      <template v-if="selectedApplication.id === 'urban-disaster-monitoring'">
        <section class="disaster-landslide">
          <header>
            <div>
              <p class="eyebrow">LANDSLIDE EXTRACTION</p>
              <h2>Extract landslides<br /><em>with precision.</em></h2>
            </div>
            <p>
              Multi-band aerial imagery and manually labelled landslide data are
              transformed into pixel-level landslide intelligence. Geohazard AI
              connects 3-band and 4-band remote-sensing images with shpfile
              annotations, image tiles and model outputs to identify and
              document landslide boundaries.
            </p>
          </header>
          <div
            class="disaster-landslide__workflow forestry-flow-reveal disaster-flow-reveal"
          >
            <figure class="disaster-landslide__source">
              <img
                :src="disasterLandslideAnnotations"
                alt="Aerial landslide annotations used as model input"
              />
              <figcaption>INPUT / SHPFILE ANNOTATIONS</figcaption>
            </figure>
            <span class="disaster-landslide__arrow" aria-hidden="true">
              <small>EXTRACT</small><i></i><b></b>
            </span>
            <div class="disaster-landslide__outputs">
              <figure>
                <img
                  :src="disasterLandslideBoundary"
                  alt="Landslide boundary extracted from aerial image tiles"
                />
                <figcaption>PROCESS / IMAGE-TILE ANALYSIS</figcaption>
              </figure>
              <figure>
                <img
                  :src="disasterLandslideModelOutput"
                  alt="Pixel-level landslide extraction model output"
                />
                <figcaption>OUTPUT / LANDSLIDE BOUNDARIES</figcaption>
              </figure>
            </div>
          </div>
          <p class="disaster-landslide__application">
            Applied in HK CEDD landslide extraction work and validated on Hong
            Kong aerial datasets including SW, CK, Sharp Peak and Lantau Island.
          </p>
        </section>
        <section class="disaster-swept-path">
          <figure>
            <img
              :src="disasterSweptPath"
              alt="3D vehicle swept path analysis around a road bend"
            />
            <figcaption>3D VEHICLE ENVELOPE / COLLISION-RISK REVIEW</figcaption>
          </figure>
          <div>
            <p class="eyebrow">3D SWEPT PATH ANALYSIS</p>
            <h2>Plan safe<br /><em>movement.</em></h2>
            <p>
              A 3D digital simulation dynamically models a vehicle's volumetric
              envelope while driving, turning and traversing slopes to assess
              and prevent collision risks.
            </p>
          </div>
        </section>
      </template>
      <template v-if="selectedApplication.id === 'real-estate-surveying'">
        <section class="estate-scan-to-bim">
          <header>
            <p class="eyebrow">Scan-to-BIM</p>
            <h2>From reality capture<br /><em>to BIM.</em></h2>
            <p>
              Transform existing-building point clouds into BIM models and 2D
              floorplans for faster, more reliable indoor surveys.
            </p>
          </header>
          <div class="estate-scan-to-bim__flow">
            <figure>
              <img
                :src="estateScanToBimPointcloud"
                alt="Point cloud of an existing building"
              />
              <figcaption>INPUT / EXISTING-BUILDING POINT CLOUD</figcaption>
            </figure>
            <span class="estate-scan-to-bim__arrow" aria-hidden="true">
              <i></i><b></b>
            </span>
            <figure>
              <img
                :src="estateScanToBimOutput"
                alt="BIM model and generated two-dimensional floorplan"
              />
              <figcaption>OUTPUT / BIM MODEL + 2D FLOORPLAN</figcaption>
            </figure>
          </div>
        </section>
        <section class="estate-kacst">
          <div class="estate-kacst__copy">
            <p>
              SmartSpace Scan-to-BIM was applied to an existing-building project
              at KACST, Saudi Arabia, connecting point-cloud capture with BIM
              output for survey documentation.
            </p>
          </div>
          <figure>
            <header class="estate-kacst__figure-heading">
              <p class="eyebrow">APPLICATION / SAUDI ARABIA</p>
              <h2>Applied at <em>KACST.</em></h2>
            </header>
            <img
              :src="estateKacstWorkflow"
              alt="Point cloud to BIM workflow and KACST project team"
            />
            <figcaption>POINT CLOUD / BIM OUTPUT / KACST PROJECT</figcaption>
          </figure>
        </section>
        <figure class="estate-survey-reference">
          <img
            :src="estateSurveyReference"
            alt="Existing-building survey point-cloud reference views"
          />
          <figcaption>
            APPLICATION / EXISTING-BUILDING SURVEY REFERENCE
          </figcaption>
        </figure>
      </template>
      <section
        v-if="!selectedApplication.hasContent"
        class="application-placeholder-plan"
      >
        <article>
          <p class="eyebrow">CONTENT OUTLINE / 01</p>
          <h2>Heading</h2>
          <p>Body copy</p>
        </article>
        <div class="application-placeholder-media">Image placeholder</div>
        <article>
          <p class="eyebrow">CONTENT OUTLINE / 02</p>
          <h2>Heading</h2>
          <p>Body copy</p>
        </article>
        <div class="application-placeholder-media">Image placeholder</div>
      </section>
    </template>
    <template v-else-if="page === 'product-detail'"
      ><section class="product-detail-hero">
        <div>
          <RouterLink to="/products" class="product-back"
            >← All products</RouterLink
          >
          <p class="eyebrow">{{ selectedProduct.platform }}</p>
          <h1>{{ selectedProduct.name }}</h1>
          <p>{{ selectedProduct.statement }}</p>
          <RouterLink to="/contact" class="button"
            >Discuss this system <i>→</i></RouterLink
          >
        </div>
        <div
          class="product-detail-image"
          @mousemove="productHeroPointer"
          @mouseleave="resetProductHeroPointer"
        >
          <img
            v-if="productImage(selectedProduct)"
            :src="productImage(selectedProduct)"
            :alt="selectedProduct.name"
            :style="{ objectPosition: productDetailFocus(selectedProduct) }"
          /><span v-else>PRODUCT IMAGE SLOT</span>
        </div>
      </section>
      <section class="product-detail-spec">
        <header>
          <p class="eyebrow">CORE PERFORMANCE</p>
          <h2>Built for confident<br /><em>spatial capture.</em></h2>
        </header>
        <div class="metric-row">
          <b v-for="metric in selectedProduct.metrics" :key="metric">{{
            metric
          }}</b>
        </div>
        <dl>
          <template v-for="spec in selectedProduct.specs" :key="spec[0]"
            ><dt>{{ spec[0] }}</dt>
            <dd>{{ spec[1] }}</dd></template
          >
        </dl>
        <p class="fine">
          Environment-dependent performance must be assessed against actual site
          conditions and delivery scope.
        </p>
      </section>
      <section class="product-detail-next">
        <p>Explore another capture platform.</p>
        <button
          v-for="product in products
            .filter((product) => product.id !== selectedProduct.id)
            .slice(0, 4)"
          :key="product.id"
          @click="showSpec(product)"
        >
          {{ product.name.replace(" SpaceScanX", "") }} <i>→</i>
        </button>
      </section></template
    >
    <template v-else-if="page === 'contact'"
      ><section class="contact-form-section">
        <div class="contact-form-intro">
          <p class="eyebrow">CONTACT US / 01</p>
          <h1>Request a quote<br /><em>or demo.</em></h1>
          <p>
            Please fill out the form below to request a quote or demo. Our team
            will recommend the right capture, processing and delivery workflow
            for your project.
          </p>
        </div>
        <form @submit.prevent="sendInquiry">
          <label
            >Full name<input
              v-model.trim="inquiry.name"
              required
              maxlength="80"
              placeholder="Your name" /></label
          ><label
            >Company / organisation<input
              v-model.trim="inquiry.company"
              required
              maxlength="120"
              placeholder="Company or organisation" /></label
          ><label
            >Telephone<input
              v-model.trim="inquiry.phone"
              required
              maxlength="40"
              placeholder="Mobile or office number" /></label
          ><label
            >Email<input
              v-model.trim="inquiry.email"
              type="email"
              maxlength="120"
              placeholder="For project materials" /></label
          ><label class="wide"
            >Project environment<select v-model="inquiry.scenario" required>
              <option disabled value="">Select an environment</option>
              <option>Smart city / digital twin</option>
              <option>Architecture / MiC / construction</option>
              <option>Road, tunnel or urban renewal</option>
              <option>Industrial inspection / hazardous operations</option>
              <option>Hydrographic mapping</option>
              <option>Other</option>
            </select></label
          ><label class="wide"
            >Project notes<textarea
              v-model.trim="inquiry.message"
              maxlength="1000"
              rows="4"
              placeholder="Site area, accuracy target, expected deliverables and anticipated start date"
            ></textarea></label
          ><label class="consent wide"
            ><input v-model="inquiry.consent" type="checkbox" required />I agree
            that SmartSpace may process this information solely to respond to
            this project inquiry.</label
          ><button class="button" type="submit">
            Submit project brief <i>→</i>
          </button>
          <p class="form-status">{{ formStatus }}</p>
        </form>
      </section>
      <section class="contact-details-section">
        <p class="eyebrow">VISIT SMARTSPACE / 02</p>
        <h2>Find us at<br /><em>Hong Kong Science Park.</em></h2>
        <div class="contact-details-grid">
          <article>
            <span>ADDRESS</span>
            <p>
              Unit 312, 3/F, Core Building 1,<br />1 Science Park East
              Avenue,<br />Hong Kong Science Park Phase 1,<br />Shatin, Hong
              Kong.
            </p>
          </article>
          <article>
            <span>EMAIL</span
            ><a href="mailto:office@smartspacetech.com.hk"
              >office@smartspacetech.com.hk</a
            >
          </article>
          <article>
            <span>TEL</span><a href="tel:+85293702353">(+852) 9370 2353</a>
          </article>
        </div>
      </section>
      <section class="contact-map-section">
        <div class="contact-map-copy">
          <p class="eyebrow">LOCATION / 03</p>
          <h2>Meet the team<br />at Science Park.</h2>
          <p>
            Our office is located in Core Building 1 at Hong Kong Science Park.
          </p>
        </div>
        <div class="contact-map-frame">
          <iframe
            title="SmartSpace location at Hong Kong Science Park"
            src="https://www.google.com/maps?output=embed&amp;ll=22.42515%2C114.21220&amp;z=17"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe
          ><span
            class="office-location-pin"
            aria-label="SmartSpace office location"
          ></span>
        </div></section
    ></template>
    <template v-else
      ><section class="page-hero compact-head">
        <div>
          <p class="eyebrow">ABOUT SMARTSPACE</p>
          <h1>Build better worlds<br /><em>from better spatial data.</em></h1>
          <p>
            SmartSpace develops 3D mobile LiDAR systems, smart-city platforms
            and urban spatiotemporal data solutions. Its technologies have
            received international recognition for invention and smart-city
            innovation.
          </p>
        </div>
      </section>
      <section class="section about-assets">
        <div class="asset-slot"><span>COMPANY IMAGE SLOT</span></div>
        <div class="asset-slot"><span>TEAM IMAGE SLOT</span></div>
        <div class="asset-slot"><span>AWARD / MILESTONE IMAGE SLOT</span></div>
      </section></template
    >
  </main>
  <footer>
    <RouterLink to="/products" class="brand footer-logo"
      ><img :src="smartspaceLogo" alt="SmartSpace" /></RouterLink
    ><RouterLink to="/products">About SmartSpace <i>→</i></RouterLink>
  </footer>
</template>
