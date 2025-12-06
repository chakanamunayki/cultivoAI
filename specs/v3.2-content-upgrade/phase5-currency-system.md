# Phase 5: Dynamic Currency System

This is a supplementary phase to the main implementation plan, adding dynamic currency conversion with admin management.

---

## Overview

- All prices stored in USD (base currency)
- Display in user's selected currency: USD | COP | EUR
- Exchange rates fetched from API, cached in database
- Admin can override rates manually from dashboard

---

## 5.1 Database Schema

- [ ] Add `exchangeRates` table to `src/lib/schema.ts`:

```typescript
export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  fromCurrency: varchar("from_currency", { length: 3 }).default("USD").notNull(),
  toCurrency: varchar("to_currency", { length: 3 }).notNull(),
  rate: decimal("rate", { precision: 12, scale: 4 }).notNull(),
  manualOverride: boolean("manual_override").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  source: varchar("source", { length: 50 }).notNull(), // 'api' or 'manual'
});
```

- [ ] Run `pnpm db:generate`
- [ ] Run `pnpm db:migrate`

---

## 5.2 Exchange Rate Service

- [ ] Create `src/lib/currency/exchange-rates.ts`:

```typescript
// Functions needed:
export async function fetchRatesFromAPI(): Promise<{ COP: number; EUR: number }>
export async function saveRatesToDB(rates: { COP: number; EUR: number }): Promise<void>
export async function getCurrentRates(): Promise<{ COP: number; EUR: number }>
export async function setManualRate(currency: 'COP' | 'EUR', rate: number): Promise<void>
export async function removeManualOverride(currency: 'COP' | 'EUR'): Promise<void>
```

**API Source**: ExchangeRate-API (free tier: 1,500 requests/month)
- Endpoint: `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`
- Only need USD -> COP and USD -> EUR

**Fallback rates** (hardcoded if API fails):
- USD -> COP: 4200
- USD -> EUR: 0.92

---

## 5.3 API Routes

### Public Route: `src/app/api/currency/rates/route.ts`

- [ ] GET: Return current exchange rates

```typescript
// Response:
{
  rates: { COP: 4200, EUR: 0.92 },
  updatedAt: "2024-01-15T10:00:00Z"
}
```

### Admin Route: `src/app/api/admin/currency/route.ts`

- [ ] GET: Get rates with admin info

```typescript
// Response:
{
  rates: [
    { currency: "COP", rate: 4200, manualOverride: false, source: "api", updatedAt: "..." },
    { currency: "EUR", rate: 0.92, manualOverride: true, source: "manual", updatedAt: "..." }
  ],
  lastApiUpdate: "2024-01-15T10:00:00Z"
}
```

- [ ] POST: Set manual rate override

```typescript
// Request body:
{ currency: "COP", rate: 4300 }
```

- [ ] DELETE: Remove manual override

```typescript
// Request body:
{ currency: "COP" }
```

---

## 5.4 Admin Dashboard - Currency Management

- [ ] Create `src/app/admin/currency/page.tsx`
- [ ] Add to admin navigation

**UI Elements:**
- Table showing: Currency | Current Rate | Source | Last Updated | Actions
- Toggle switch for manual override per currency
- Input field for manual rate (only enabled when override is on)
- "Refresh from API" button
- Last API fetch timestamp display

**Styling:** Use existing admin dashboard patterns (brutalist cards, tables)

---

## 5.5 Frontend Currency Hook

- [ ] Create `src/hooks/use-currency.ts`:

```typescript
type Currency = 'USD' | 'COP' | 'EUR';

interface UseCurrencyReturn {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (amountUSD: number) => number;
  formatPrice: (amountUSD: number) => string;
  isLoading: boolean;
}

export function useCurrency(): UseCurrencyReturn {
  // - Store selected currency in localStorage
  // - Fetch rates from /api/currency/rates on mount
  // - Cache rates in state
  // - Provide conversion and formatting functions
}
```

---

## 5.6 Price Component

- [ ] Create `src/components/ui/price.tsx`:

```typescript
interface PriceProps {
  amount: number; // Always in USD
  showCurrency?: boolean; // Default: true
  className?: string;
}

export function Price({ amount, showCurrency = true, className }: PriceProps) {
  const { formatPrice } = useCurrency();
  return <span className={className}>{formatPrice(amount)}</span>;
}
```

**Format Examples:**
- USD: `$100 USD`
- COP: `$420,000 COP` (no decimals)
- EUR: `92 EUR` (or `92 €`)

---

## 5.7 Integration Points

Update these to use `<Price />` component:

- [ ] Hero footer bar: "Desde $100 USD"
- [ ] Service modal pricing: "Desde $100 USD"
- [ ] Semilla section pricing
- [ ] Any other hardcoded prices

---

## 5.8 Currency Selector

- [ ] Wire footer currency selector to useCurrency hook
- [ ] On change: update localStorage, prices reactively update
- [ ] Style: match existing language toggle (ES | EN)

---

## Environment Variable

Add to `.env`:
```
EXCHANGERATE_API_KEY=your-api-key-here
```

---

## New Files Summary

- `src/lib/currency/exchange-rates.ts`
- `src/hooks/use-currency.ts`
- `src/components/ui/price.tsx`
- `src/app/api/currency/rhave done ates/route.ts`
- `src/app/api/admin/currency/route.ts`
- `src/app/admin/currency/page.tsx`

## Modified Files

- `src/lib/schema.ts` (add exchangeRates table)
- `src/components/landing/layout/footer.tsx` (wire currency selector)
- `src/components/landing/sections/hero-section.tsx` (use Price component)
- `src/components/landing/ui/service-modal.tsx` (use Price component)
- Various sections with price displays
