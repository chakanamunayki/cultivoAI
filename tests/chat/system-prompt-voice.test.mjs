import assert from "node:assert/strict";
import { test } from "node:test";
import { buildSystemPrompt } from "../../src/lib/chat/system-prompt.ts";

const content = {
  services: [],
  projects: [],
  whyUs: { notTitle: "", notItems: [], yesTitle: "", yesItems: [] },
  partnerships: [],
};

for (const locale of ["es", "en"]) {
  test(`${locale} chat prompt speaks as "we", not about Paul in the third person`, () => {
    const prompt = buildSystemPrompt(content, { locale, entryContext: "story" });
    assert.doesNotMatch(prompt, /tercera persona|third person/i);
    assert.doesNotMatch(prompt, /Why Paul|Por Qué Paul|What he builds|Qué construye:/);
    assert.match(prompt, locale === "es" ? /Hablas en nombre del equipo/ : /You speak for the team/);
    // Paul is still named for the call and his own track record.
    assert.match(prompt, locale === "es" ? /la llamada de 15 minutos es con Paul/ : /the 15-minute call is with Paul/);
  });
}
