/**
 * Safety net for the two requests that must never be dropped: "book a call"
 * and "WhatsApp". The chat model usually calls the right tool, but a small
 * model sometimes answers in words only, and then no form or button appears.
 * When the visitor's message clearly asks for one, the tool call is added.
 */

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}

// "agendar/book/schedule" on their own, or "call/llamada" with a wish to have one.
const BOOKING =
  /\b(agendar|agendamos|agenda(r)? una|reservar una llamada|schedule|book (a |an |some |\d+ ?)(call|chat|time|slot|meeting|min\w*)|(quiero|quisiera|me gustar[ií]a|podemos|puedo) (tener |hacer |agendar )?(una |la )?(llamada|reuni[oó]n)|(i'd like|i would like|i want|can i|can we|could we|let's) (to )?(have |get |set up |jump on |hop on )?(a |an )?(call|meeting))\b/i;
const WHATSAPP = /whats\s?app|wasap|guasap/i;

// "Take me to X": the model sometimes says it scrolled without calling the tool.
const GO_TO = /ll[eé]vame|ir a la secci[oó]n|ve a la secci[oó]n|take me to|go to the|scroll to/i;
const SECTIONS: Array<[RegExp, string]> = [
  [/semillero/i, "semillero"],
  [/proyectos|projects/i, "projects"],
  [/servicios|services|qu[eé] construy|what (i|paul|he) builds?/i, "services"],
  [/con qui[eé]n trabaj|who (i|paul|he) works? with/i, "who-we-help"],
  [/formas de trabajar|ways to work|alianzas?|partnerships?|precios|pricing/i, "partnerships"],
  [/c[oó]mo trabaj|how (i|paul|he) works?|valores|values/i, "values"],
  [/qui[eé]nes somos|qui[eé]n es paul|about|who we are/i, "about"],
];

export function withContactTools(message: string, calls: ToolCall[]): ToolCall[] {
  const has = (name: string) => calls.some((call) => call.name === name);

  if (WHATSAPP.test(message)) {
    return has("offer_whatsapp")
      ? calls
      : [...calls, { name: "offer_whatsapp", args: { context_message: "" } }];
  }

  if (BOOKING.test(message) && !has("schedule_call") && !has("collect_lead_info")) {
    return [...calls, { name: "schedule_call", args: { reason: message.slice(0, 200) } }];
  }

  const pageActions = ["navigate_to_section", "show_service_details", "show_project_details"];
  if (GO_TO.test(message) && !pageActions.some(has)) {
    const section = SECTIONS.find(([pattern]) => pattern.test(message));
    if (section) {
      return [...calls, { name: "navigate_to_section", args: { section_id: section[1] } }];
    }
  }

  return calls;
}
