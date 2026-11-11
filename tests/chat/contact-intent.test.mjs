import assert from "node:assert/strict";
import { test } from "node:test";
import { withContactTools } from "../../src/lib/chat/contact-intent.ts";

const names = (calls) => calls.map((c) => c.name);

test("asking to book always shows the contact form, even if the model forgot the tool", () => {
  assert.deepEqual(names(withContactTools("¿Puedo agendar 15 minutos con Paul?", [])), ["schedule_call"]);
  assert.deepEqual(names(withContactTools("Can I book 15 minutes with Paul?", [])), ["schedule_call"]);
  assert.deepEqual(names(withContactTools("Quiero una llamada con Paul", [])), ["schedule_call"]);
  assert.deepEqual(names(withContactTools("I'd like to schedule a call", [])), ["schedule_call"]);
});

test("asking for WhatsApp always shows the WhatsApp button", () => {
  assert.deepEqual(names(withContactTools("Prefiero hablar por WhatsApp", [])), ["offer_whatsapp"]);
  assert.deepEqual(names(withContactTools("do you have whatsapp?", [])), ["offer_whatsapp"]);
});

test("nothing is added when the model already acted or the visitor did not ask", () => {
  const form = [{ name: "collect_lead_info", args: { name: "Ana" } }];
  assert.deepEqual(withContactTools("Quiero una llamada, soy Ana", form), form);
  const wa = [{ name: "offer_whatsapp", args: { context_message: "x" } }];
  assert.deepEqual(withContactTools("WhatsApp please", wa), wa);
  assert.deepEqual(withContactTools("What does Paul build?", []), []);
  assert.deepEqual(withContactTools("We call it the seed bank. I read a book about it.", []), []);
});

test("asking to be taken to a section always scrolls there", () => {
  assert.deepEqual(withContactTools("Llévame a la sección de Semillero", []), [
    { name: "navigate_to_section", args: { section_id: "semillero" } },
  ]);
  assert.deepEqual(withContactTools("Take me to the projects section", []), [
    { name: "navigate_to_section", args: { section_id: "projects" } },
  ]);
  // The model already opened something: leave it alone.
  const opened = [{ name: "show_service_details", args: { service_title: "Proof and records" } }];
  assert.deepEqual(withContactTools("Take me to the services section", opened), opened);
  // Mentioning a section without asking to go there does nothing.
  assert.deepEqual(withContactTools("What is Semillero?", []), []);
});
