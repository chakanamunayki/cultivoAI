import assert from "node:assert/strict";
import { test } from "node:test";
import { enProjectsContent as en } from "../../src/content/locales/en/projects.ts";
import { esProjectsContent as es } from "../../src/content/locales/es/projects.ts";
import { promptContentFrom } from "../../src/lib/chat/prompt-content.ts";
import { buildSystemPrompt } from "../../src/lib/chat/system-prompt.ts";

// Only the fields the prompt reads; the rest of SiteContent is not needed here.
const base = {
  services: [],
  whyUs: { notTitle: "", notItems: [], yesTitle: "", yesItems: [] },
  partnerships: [],
};

test("the chat gets the projects in progress, with their status and details", () => {
  const out = promptContentFrom({ ...base, ...en });
  assert.equal(out.projectsInProgress?.length, en.projectsInProgress.length);
  const [first] = out.projectsInProgress;
  assert.equal(first.title, "Restoration after mining, Colombia");
  assert.equal(first.status, "Consortium forming");
  assert.ok(first.details.some((d) => d.label === "My part"));
});

test("hidden projects stay out of the chat", () => {
  const out = promptContentFrom({ ...base, ...en });
  assert.ok(!out.projects.some((p) => /SetaSouls/.test(p.title)));
  assert.equal(out.projects.length, en.projects.filter((p) => !p.hidden).length);
});

test("content without projects in progress leaves the field out", () => {
  const { projectsInProgress: _drop, ...rest } = en;
  assert.equal(promptContentFrom({ ...base, ...rest }).projectsInProgress, undefined);
});

test("the system prompt lists the projects in progress as unfinished work", () => {
  for (const [locale, content, heading] of [
    ["en", en, "Projects in progress now"],
    ["es", es, "Proyectos en marcha ahora"],
  ]) {
    const prompt = buildSystemPrompt(promptContentFrom({ ...base, ...content }), { locale });
    assert.ok(prompt.includes(heading), `${locale} heading`);
    assert.ok(prompt.includes(content.projectsInProgress[1].title), `${locale} title`);
  }
});
