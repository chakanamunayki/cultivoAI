import assert from "node:assert/strict";
import { test } from "node:test";
import { enClosingSectionsContent as en } from "../../src/content/locales/en/closing-sections.ts";
import { esClosingSectionsContent as es } from "../../src/content/locales/es/closing-sections.ts";
import { chatGreeting } from "../../src/lib/chat/chat-greeting.ts";

const g = { es: es.chat.contextualGreetings, en: en.chat.contextualGreetings };

test("no context, or a general one, gets the general greeting", () => {
  assert.equal(chatGreeting(g.en, null), g.en.general);
  assert.equal(chatGreeting(g.en, { type: "general" }), g.en.general);
});

test("a service modal names the service", () => {
  const text = chatGreeting(g.es, { type: "service", serviceTitle: "Pruebas y registros" });
  assert.match(text, /Pruebas y registros/);
  assert.doesNotMatch(text, /\{service\}/);
});

test("a step from Ways to work together is named in the greeting", () => {
  assert.match(chatGreeting(g.en, { type: "partnership", partnershipName: "Discovery Sprint" }), /Discovery Sprint/);
  assert.match(chatGreeting(g.es, { type: "partnership", partnershipName: "Sprint de descubrimiento" }), /Sprint de descubrimiento/);
});

test("partnership buttons without a step keep the generic greeting", () => {
  assert.equal(chatGreeting(g.es, { type: "partnership" }), g.es.partnership);
});

test("a project modal names the project and asks about something similar", () => {
  const en1 = chatGreeting(g.en, { type: "project", projectTitle: "Restoration after mining, Colombia" });
  assert.match(en1, /Restoration after mining, Colombia/);
  assert.match(en1, /similar/);
  const es1 = chatGreeting(g.es, { type: "project", projectTitle: "Restauración después de la minería, Colombia" });
  assert.match(es1, /Restauración después de la minería, Colombia/);
  assert.match(es1, /parecido/);
});

test("a named greeting falls back when the locale has no named variant", () => {
  const { partnershipNamed: _p, project: _q, ...older } = g.en;
  assert.equal(chatGreeting(older, { type: "partnership", partnershipName: "Build" }), g.en.partnership);
  assert.equal(chatGreeting(older, { type: "project", projectTitle: "X" }), g.en.general);
});

test("greetings have no em dashes or leftover placeholders", () => {
  for (const set of [g.es, g.en]) {
    for (const ctx of [
      { type: "service", serviceTitle: "A" },
      { type: "partnership", partnershipName: "B" },
      { type: "project", projectTitle: "C" },
    ]) {
      const text = chatGreeting(set, ctx);
      assert.doesNotMatch(text, /—|\{\w+\}/);
    }
  }
});
