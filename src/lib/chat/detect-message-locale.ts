/**
 * Works out which language a visitor is writing in, so the chat replies in it.
 * The page language is only a guess from the browser: a Spanish speaker on an
 * English-language browser was getting English replies, and the small chat
 * model ignored a "reply in the user's language" instruction. Choosing the
 * prompt language from the message itself is reliable.
 */

type ChatLocale = "es" | "en" | "pt";

const SPANISH_WORDS = new Set(
  "el la los las un una unos unas de del que y en es son por para con sin como cómo qué cuál cuánto cuándo dónde quién hola gracias quiero quisiera tengo tenemos necesito necesitamos puedo puede pueden somos estamos estoy soy mi mis tu tus su sus nuestro nuestra proyecto proyectos sobre más pero también sí muy hay hablar prefiero trabajan trabaja hace hacer llamada cuesta ayuda ayudar busco buscamos".split(
    " "
  )
);

const ENGLISH_WORDS = new Set(
  "the a an and is are do does did you your i i'd i'm we we're our my what how who when where why can could would have has with for want need hello hi hey thanks project projects about to of in on it this that but also yes there talk rather work works build builds call cost much help looking".split(
    " "
  )
);

export function detectMessageLocale(message: string): "es" | "en" | null {
  const text = message.toLowerCase();
  let spanish = /[¿¡ñáéíóú]/.test(text) ? 2 : 0;
  let english = 0;
  for (const word of text.split(/[^a-zñáéíóúü']+/)) {
    if (SPANISH_WORDS.has(word)) spanish += 1;
    if (ENGLISH_WORDS.has(word)) english += 1;
  }
  if (spanish > english) return "es";
  if (english > spanish) return "en";
  return null;
}

/**
 * The language to answer in: the latest message's, else the visitor's most
 * recent clear message, else the page's. Portuguese pages are left alone
 * (hidden locale, not detected).
 */
export function pickReplyLocale(
  pageLocale: ChatLocale,
  message: string,
  earlierUserMessages: string[]
): ChatLocale {
  if (pageLocale === "pt") return "pt";
  for (const text of [message, ...[...earlierUserMessages].reverse()]) {
    const detected = detectMessageLocale(text);
    if (detected) return detected;
  }
  return pageLocale;
}
