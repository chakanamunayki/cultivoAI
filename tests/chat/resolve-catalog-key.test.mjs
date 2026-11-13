import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PROJECT_ALIASES,
  SERVICE_ALIASES,
  resolveCatalogKey,
} from "../../src/lib/chat/resolve-catalog-key.ts";

// Titles as they appear on the site, per card, in every enabled language.
const services = [
  { key: "software-web", titles: ["Software y plataformas", "Software and platforms"] },
  { key: "company-brain", titles: ["Sistemas de datos, conocimiento e IA", "Data, knowledge and AI systems"] },
  { key: "dashboards", titles: ["Pruebas y registros", "Proof and records"] },
  { key: "startup", titles: ["Preparación para startups e inversión", "Startup and investment readiness"] },
];
const projects = [
  {
    key: "company-brain",
    titles: [
      "Plataforma de conocimiento protegido para un proyecto de biotecnología y agricultura vertical",
      "Protected knowledge platform for a biotech and vertical farming project",
    ],
  },
];

test("an English service name opens the right card on the Spanish page", () => {
  assert.equal(resolveCatalogKey("Proof and records", services, SERVICE_ALIASES), "dashboards");
  assert.equal(resolveCatalogKey("Software and platforms", services, SERVICE_ALIASES), "software-web");
});

test("a Spanish service name opens the right card on the English page", () => {
  assert.equal(resolveCatalogKey("Pruebas y registros", services, SERVICE_ALIASES), "dashboards");
  assert.equal(
    resolveCatalogKey("preparacion para startups e inversion", services, SERVICE_ALIASES),
    "startup"
  );
});

test("a paraphrased service name still opens the right card", () => {
  assert.equal(resolveCatalogKey("the Proof and records service", services, SERVICE_ALIASES), "dashboards");
  assert.equal(resolveCatalogKey("MRV for carbon", services, SERVICE_ALIASES), "dashboards");
  assert.equal(resolveCatalogKey("Company Brain", services, SERVICE_ALIASES), "company-brain");
  assert.equal(resolveCatalogKey("investment readiness", services, SERVICE_ALIASES), "startup");
  assert.equal(resolveCatalogKey("sitio web", services, SERVICE_ALIASES), "software-web");
});

test("the short project name from the chat tool description opens the project in both languages", () => {
  assert.equal(resolveCatalogKey("Protected knowledge platform", projects, PROJECT_ALIASES), "company-brain");
  assert.equal(
    resolveCatalogKey("plataforma de conocimiento protegido", projects, PROJECT_ALIASES),
    "company-brain"
  );
});

test("a hidden project left out of the catalog opens nothing", () => {
  assert.equal(resolveCatalogKey("SetaSouls", projects, PROJECT_ALIASES), undefined);
  assert.equal(resolveCatalogKey("holistic brand website", projects, PROJECT_ALIASES), undefined);
});

test("an unrelated or empty name opens nothing", () => {
  assert.equal(resolveCatalogKey("retreat booking engine", services, SERVICE_ALIASES), undefined);
  assert.equal(resolveCatalogKey("", services, SERVICE_ALIASES), undefined);
  assert.equal(resolveCatalogKey("a", projects, PROJECT_ALIASES), undefined);
  // "ai" is a keyword, but only as a whole word: "maintain" must not match it.
  assert.equal(resolveCatalogKey("maintain", services, SERVICE_ALIASES), undefined);
});
