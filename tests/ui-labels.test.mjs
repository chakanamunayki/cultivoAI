import assert from "node:assert/strict";
import { test } from "node:test";
import { enUi } from "../src/content/locales/en/ui.ts";
import { esUi } from "../src/content/locales/es/ui.ts";

function leaves(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" ? leaves(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]]
  );
}

test("Spanish and English interface labels have the same keys", () => {
  assert.deepEqual(
    leaves(esUi).map(([key]) => key).sort(),
    leaves(enUi).map(([key]) => key).sort()
  );
});

test("no label is empty or uses an em dash", () => {
  for (const [key, value] of [...leaves(esUi), ...leaves(enUi)]) {
    assert.ok(value.trim().length > 0, `${key} is empty`);
    assert.ok(!value.includes("—"), `${key} has an em dash`);
  }
});

test("Spanish labels carry their accents", () => {
  assert.equal(esUi.detail.whyItMatters, "Por qué importa");
  assert.equal(esUi.detail.included, "Qué incluye");
  assert.equal(esUi.nav.menu, "Menú");
});
