import assert from "node:assert/strict";
import { test } from "node:test";
import { buildSiteMetadata, localeFromAcceptLanguage, SITE_URL } from "../src/lib/site-metadata.ts";

test("English browsers get English title, description and share tags", () => {
  const meta = buildSiteMetadata("en");
  const title = "Cultivo Labs · Hands-on tech partner for projects that care for land, people and communities";
  assert.equal(meta.title.default, title);
  assert.match(meta.description, /^Startup co-founder turned hands-on builder\./);
  assert.equal(meta.openGraph.title, title);
  assert.equal(meta.openGraph.description, meta.description);
  assert.equal(meta.openGraph.locale, "en_US");
  assert.equal(meta.twitter.title, title);
  assert.equal(meta.twitter.description, meta.description);
});

test("Spanish browsers get Spanish title, description and share tags", () => {
  const meta = buildSiteMetadata("es");
  assert.match(meta.title.default, /^Cultivo Labs · Tu socio tecnológico/);
  assert.match(meta.description, /^Cofundador de startups/);
  assert.equal(meta.openGraph.locale, "es_CO");
  assert.equal(meta.openGraph.title, meta.title.default);
});

test("hidden Portuguese falls back to Spanish metadata", () => {
  assert.equal(buildSiteMetadata("pt").title.default, buildSiteMetadata("es").title.default);
});

test("no metadata uses an em dash", () => {
  for (const locale of ["es", "en"]) {
    assert.doesNotMatch(JSON.stringify(buildSiteMetadata(locale)), /—/);
  }
});

test("the site address falls back to the live production URL", () => {
  if (!process.env.NEXT_PUBLIC_APP_URL) assert.equal(SITE_URL, "https://cultivolab.vercel.app");
  assert.equal(buildSiteMetadata("en").metadataBase.href, new URL(SITE_URL).href);
});

test("Accept-Language picks the highest-ranked language", () => {
  assert.equal(localeFromAcceptLanguage("es-CO,es;q=0.9,en;q=0.8"), "es");
  assert.equal(localeFromAcceptLanguage("en-GB,en;q=0.9,es;q=0.8"), "en");
  assert.equal(localeFromAcceptLanguage("en;q=0.5,es;q=0.9"), "es");
  assert.equal(localeFromAcceptLanguage(""), "en");
  assert.equal(localeFromAcceptLanguage("pt-BR,pt;q=0.9", false), "es");
  assert.equal(localeFromAcceptLanguage("pt-BR,pt;q=0.9", true), "pt");
});
