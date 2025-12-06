# CultivoAI Website v3.2 Content Upgrade - Requirements

## Overview
Upgrade the CultivoAI landing page to v3.2 content specifications while preserving the existing Brutalist design system and reusing existing components.

## Source Document
`docs/project_info/cultivoai-website-content-v3.2.md`

---

## Critical Constraints

1. **DO NOT CHANGE THE DESIGN** - Preserve all existing Brutalist styling
2. **REUSE EXISTING COMPONENTS** - No new components unless absolutely necessary
3. **PRESERVE ALL ANIMATIONS** - Keep existing Reveal, hover effects, shadows
4. **MAINTAIN BILINGUAL SUPPORT** - All content in ES/EN via content files
5. **MINIMAL ICONS** - Use Lucide icons sparingly, NO emoji overuse (professional look)
6. **EN/ES CONTENT PARITY** - Every piece of content must have both versions, identical structure
7. **DYNAMIC CURRENCY** - All prices support COP/USD/EUR with real exchange rates

---

## Changes Summary

### Section-by-Section Requirements

| Section | Status | Change Type | Priority |
|---------|--------|-------------|----------|
| Hero Animation | NEW | Replace purple panel with "Growing Ecosystem" tree | HIGH |
| Hero Text | UPDATE | New simplified copy + footer bar | MEDIUM |
| Who We Are | UPDATE | Add Marta (3rd person) + LinkedIn + popup bios | MEDIUM |
| How We Work | NEW | New section (3 pillars) | MEDIUM |
| What We Do | NEW | New section (Optimize/Expand columns) | MEDIUM |
| Sectors | UPDATE | Reframe "Who We Help" with badges | LOW |
| Services | UPDATE | Updated pricing copy in popups | LOW |
| Demos | UPDATE | Add Rocky's Project19 AI Coach demo | MEDIUM |
| Real Examples | UPDATE | Add before/after metrics format | LOW |
| Values | NEW | New section (6 value items) | LOW |
| Mission Statement | NEW | New full-width section | LOW |
| Contact | UPDATE | Expanded contact section | LOW |
| Footer | UPDATE | Add currency selector | LOW |

---

## Detailed Requirements

### 1. Hero Section

#### 1.1 Hero Text (Left Panel)
**Current:** "Somos Paul y Rocky" headline with long subheadline
**New v3.2:**
```
ES: INTEGRACIÓN DE IA SIMPLIFICADA.
    Para negocios. Para proyectos de impacto.
    Sin complejidad ni costos inflados.
    Ayudamos. Compartimos. Crecemos juntos.
    [Hablemos →]

EN: AI INTEGRATION MADE SIMPLE.
    For businesses. For impact projects.
    Without the complexity or high costs.
    We help. We share. We grow together.
    [Let's talk →]
```

**Footer bar (new element at bottom of hero):**
```
ES: Desde $100 USD | Tarifas especiales para proyectos de impacto | 🇬🇧🇨🇴 Padre e hijo desde Medellín
EN: From $100 USD | Special rates for impact projects | 🇬🇧🇨🇴 Father & son from Medellín
```

#### 1.2 Hero Animation (Right Panel)
**Current:** Purple panel with rocket emoji, floating shapes, "AI" text
**New v3.2:** "Growing Ecosystem" animated tree

**Animation Concept:**
- Organic tree growth representing "Cultivo" (cultivation)
- Seed (your business) grows into ecosystem of AI solutions
- MUST use geometric/brutalist style to match design system

**Animation Stages:**
1. Stage 1 (0-1s): Seed appears with pulse/glow - "Tu negocio"
2. Stage 2 (1-2s): Stem grows upward
3. Stage 3 (2-3.5s): Main branches appear with icons (Chatbots, Automatización, Dashboards)
4. Stage 4 (3.5-5s): Sub-branches with results (24/7, Clientes felices, etc.)
5. Stage 5 (5-6s): Crown/Success star at top with radial glow
6. Stage 6 (6-8s): Hold, ambient animation, then loop

**Color Palette for Animation:**
- Trunk/Branches: #059669 or #10B981 (emerald green)
- Chatbot icon: #3b82f6 (blue)
- Automation icon: #f59e0b (amber)
- Dashboard icon: #8b5cf6 (purple)
- Seed: #92400e (earth brown)
- Success star: #fbbf24 (gold)

**Style:** Geometric/brutalist (hard edges, not organic curves) to match existing design

---

### 2. Who We Are Section

**Current:** 2-column grid with Paul and Rocky cards
**New v3.2:** 3-column grid adding Marta + LinkedIn links + "Ver más" popup triggers

#### 2.1 Card Updates
- Keep existing card design pattern exactly
- Add third card for Marta with green (#10B981) accent
- Add LinkedIn button to each card
- Add "Ver más" button that opens bio popup modal

#### 2.2 Team Member Data
**Paul:**
- Title: "Estrategia & Negocios" / "Strategy & Business"
- Subtitle: Co-fundador nbn23 · nagi | Fundador Raíz
- Links: LinkedIn, Ver más

**Rocky:**
- Title: "Tech & IA" / "Tech & AI"
- Age badge: "14 años 🇬🇧🇨🇴"
- Links: Ver más, Video (Samsung project)

**Marta (NEW):**
- Title: "El Ancla" / "The Anchor"
- Subtitle: Terapeuta holística | Munayki
- Links: LinkedIn, Ver más

#### 2.3 Bio Popups
Reuse existing `Modal` component with new `TeamMemberModal` content component.

**Paul's Bio Popup Content:** (see v3.2 doc lines 348-418)
**Rocky's Bio Popup Content:** (see v3.2 doc lines 422-498)
**Marta's Bio Popup Content:** (see v3.2 doc lines 502-541)

#### 2.4 Footer Note
Add below cards:
```
ES: Para proyectos de mayor impacto, contamos con expertos técnicos que nos apoyan cuando es necesario.
EN: For larger impact projects, we have technical experts who support us when needed.
```

---

### 3. How We Work Section (NEW)

**Location:** After "Who We Are", before "What We Do"
**Background:** White or light gray
**Component:** Reuse existing card patterns

**Content - 3 Pillars (Lucide icons only, no emojis):**
1. **Win-Win o No Hay Trato**
   - Icon: Lucide `RefreshCw`
   - Description about mutual benefit

2. **Negocio Holístico**
   - Icon: Lucide `Sprout`
   - Description about sharing and impact

3. **Rocky Aprende en Cada Paso**
   - Icon: Lucide `Users`
   - Full-width card describing learning journey

---

### 4. What We Do Section (NEW)

**Location:** After "How We Work", before Services
**Background:** Similar to existing sections

**Layout:**
- Title: "CÓMO AYUDAMOS" / "HOW WE HELP"
- Intro paragraph about integration
- Two columns: "OPTIMIZAR" and "EXPANDIR"
- Services preview list linking to Services section

---

### 5. Sectors Section (Update Who We Help)

**Current:** "Who We Help" with ideal/not ideal lists + sector cards
**Update:** Add "Descuentos disponibles ✓" badge to sector cards

Sector cards should now have:
- Badge showing discounts available
- "Hablemos →" button on each card that opens chat with sector context

---

### 6. Services Section Updates

**Pricing updates in popups:**
- Automatización: Desde $100 USD
- Chatbots: Desde $100 USD
- Marketing: Desde $150 USD
- Inteligencia de Negocios: Desde $200 USD
- Desarrollo Web: Desde $300 USD
- Asesoría: Desde $50 USD/hora

---

### 7. Demos Section - Add Project19

**Add new demo tab:** "Project19 Coach"

**Visual:** Simulated WhatsApp/chat interface showing:
- 7am morning briefing message
- 8pm evening check-in
- Voice transcription indicator
- Notion save confirmation

**Stack display:** n8n + Notion + WhatsApp + OpenRouter
**Cost display:** ~$0.30/mes

---

### 8. Real Examples Section (Update Stories)

**Update format to include metrics:**
```
ANTES: [pain point]
DESPUÉS: [solution]
RESULTADO: 📊 [metric] (e.g., "21 horas/semana recuperadas")
```

---

### 9. Values Section (NEW)

**Location:** Before Mission Statement
**Layout:** 2x3 grid or stacked list

**6 Values (Lucide icons only, no emojis):**
1. CULTIVAR, NO EXTRAER - Icon: `Sprout`
2. WIN-WIN O NO HAY TRATO - Icon: `Handshake`
3. SIEMPRE HUMANOS - Icon: `User`
4. APRENDER HACIENDO - Icon: `Hammer`
5. INTEGRAR, NO FRAGMENTAR - Icon: `Scale`
6. CONSTRUIR PARA EL LARGO PLAZO - Icon: `Mountain`

---

### 10. Mission Statement Section (NEW)

**Location:** After Values, before Contact
**Layout:** Full-width, centered text block

**Content:**
```
NUESTRA MISIÓN

No solo estamos construyendo un negocio.
Estamos documentando cómo un padre le enseña a su hijo a construir desde cero.
Compartimos lo que funciona. Ayudamos a proyectos de impacto a integrar IA.
Creamos valor en cada paso.
Y esperamos inspirar a otras familias y jóvenes a hacer lo mismo.

Win-win. Siempre.
```

---

### 11. Contact Section Updates

**Expand with:**
- Primary CTA: Chat button
- Alternative methods: WhatsApp, Email, Calendar link

---

### 12. Footer Updates

**Add currency selector:** COP | USD | EUR

---

### 13. Dynamic Currency System (NEW FEATURE)

**Requirement:** All prices on the site must display in user's selected currency with accurate exchange rates.

#### 13.1 Currency Options
- **USD** (base currency - all prices stored in USD)
- **COP** (Colombian Peso)
- **EUR** (Euro)

#### 13.2 Exchange Rate Sources (Options)

**Option A: Free API (Recommended for MVP)**
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Free tier: 1,500 requests/month
- [Open Exchange Rates](https://openexchangerates.org/) - Free tier: 1,000 requests/month
- Cache rates daily (rates don't change that frequently)

**Option B: Admin-Managed Rates (Simpler, More Control)**
- Store rates in database, update via admin dashboard
- Admin sets USD→COP and USD→EUR manually
- Pros: No external dependency, full control
- Cons: Requires manual updates

**Option C: Hybrid (Recommended)**
- Fetch rates from free API daily via cron/scheduled function
- Store in database as cache
- Admin can override rates if needed from dashboard
- Fallback to last known rates if API fails

#### 13.3 Implementation Details

**Database Schema:**
```sql
CREATE TABLE exchange_rates (
  id SERIAL PRIMARY KEY,
  from_currency VARCHAR(3) DEFAULT 'USD',
  to_currency VARCHAR(3) NOT NULL,
  rate DECIMAL(12,4) NOT NULL,
  manual_override BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50) -- 'api' or 'manual'
);
```

**Admin Dashboard:**
- View current exchange rates
- Toggle manual override
- Set manual rate values
- See last API update timestamp
- Force refresh from API

**Frontend:**
- Currency selector in footer (and optionally nav)
- Store preference in localStorage
- `useCurrency` hook for conversion
- All price displays use `<Price amount={100} />` component

#### 13.4 Price Display Format
- USD: $100 USD
- COP: $420,000 COP (no decimals for COP)
- EUR: 92 EUR

---

## Content File Updates Required

### Types to Add (`src/content/types.ts`)
- `TeamMember` interface with bio popup fields
- `HowWeWorkPillar` interface
- `WhatWeDoContent` interface
- `Value` interface
- `MissionStatement` interface
- Update `AboutCopy` to include Marta

### Content Files (`src/content/es.ts`, `src/content/en.ts`)
- Update hero copy
- Add howWeWork content
- Add whatWeDo content
- Update about with Marta + popup bios
- Update whoWeHelp sectors with badges
- Add project19 demo use case
- Update stories with metrics
- Add values content
- Add missionStatement content
- Update footer with currency

---

## Assets Needed

1. **Photos (placeholder for now):**
   - Paul - professional but warm
   - Rocky - suit jacket + Barça shirt concept
   - Marta - wellness/healing context

2. **Icons:** All available in Lucide (already installed)

3. **Animation:** SVG-based with CSS/Framer Motion (no external dependencies)
