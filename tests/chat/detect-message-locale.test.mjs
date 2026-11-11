import assert from "node:assert/strict";
import { test } from "node:test";
import { detectMessageLocale, pickReplyLocale } from "../../src/lib/chat/detect-message-locale.ts";

test("recognises Spanish and English visitor messages", () => {
  assert.equal(detectMessageLocale("Hola, ¿trabajan con ecoaldeas?"), "es");
  assert.equal(detectMessageLocale("Tenemos un proyecto de restauración en Antioquia"), "es");
  assert.equal(detectMessageLocale("Prefiero hablar por WhatsApp"), "es");
  assert.equal(detectMessageLocale("Hi, do you work with eco-villages?"), "en");
  assert.equal(detectMessageLocale("I'd rather talk on WhatsApp"), "en");
  assert.equal(detectMessageLocale("What does Paul build?"), "en");
});

test("gives no answer when the message does not show its language", () => {
  assert.equal(detectMessageLocale("ok"), null);
  assert.equal(detectMessageLocale("ana@example.org"), null);
  assert.equal(detectMessageLocale("WhatsApp"), null);
  assert.equal(detectMessageLocale(""), null);
});

test("the reply follows the visitor's language, not the page's", () => {
  // Spanish speaker on an English-language browser.
  assert.equal(pickReplyLocale("en", "Hola, ¿trabajan con ecoaldeas?", []), "es");
  // An unclear message keeps the language the visitor used earlier.
  assert.equal(pickReplyLocale("en", "ok", ["Hola, tengo un proyecto", "sí"]), "es");
  // Nothing to go on: the page language stands.
  assert.equal(pickReplyLocale("es", "ok", []), "es");
  // Portuguese pages are left alone.
  assert.equal(pickReplyLocale("pt", "Hi, do you work with eco-villages?", []), "pt");
});
