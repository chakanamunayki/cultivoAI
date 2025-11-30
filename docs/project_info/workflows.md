# n8n Workflow Specifications

Automation workflows for Cultivo AI.

---

## Overview

These workflows run externally in n8n, triggered by database changes or schedules.

1. **New Lead Notification** - Alert Paul when leads come in
2. **Chatbot Escalation** - Handle escalation to human
3. **Lead Follow-up Sequence** - Automated nurture emails
4. **Weekly Summary** - Performance report
5. **Promo Code Tracking** - Validate and track usage

---

## Workflow 1: New Lead Notification

**Trigger:** New row inserted in `leads` table

**Purpose:** Immediately notify Paul of new leads

### Flow

1. **Trigger:** PostgreSQL webhook or polling
2. **Format message** with lead details
3. **Send WhatsApp** to Paul
4. **If newsletter_consent = true:** Add to email subscriber list
5. **Log** activity

### WhatsApp Message Template

**ES (default):**
```
Nuevo lead en Cultivo AI

Nombre: {{name}}
Email: {{email}}
WhatsApp: {{whatsapp}}
Proyecto: {{project_type}}

"{{project_description}}"

Fuente: {{source}}
Idioma: {{preferred_language}}
Promo: {{promo_code || 'ninguno'}}

Recibido: {{created_at}}
```

**Priority indicators:**
- If `project_type` = 'Asesoría startup' → Add "STARTUP" tag
- If `promo_code` exists → Add "CON PROMO" tag
- If `project_type` = 'Fondo Semilla' → Add "SEMILLA" tag

---

## Workflow 2: Chatbot Escalation

**Trigger:** `escalated_to_human = true` in `chat_conversations`

**Purpose:** Smooth handoff from chatbot to Paul

### Flow

1. **Trigger:** Database change detected
2. **Generate AI summary** of conversation
3. **Update** conversation record with summary
4. **Send WhatsApp** to Paul with context
5. **If email captured:** Send confirmation to visitor

### WhatsApp Message Template

```
Escalación de chatbot

Visitante: {{lead.name || 'Anónimo'}}
Email: {{lead.email || 'No capturado'}}
Idioma: {{conversation.language}}

Resumen:
{{conversation.summary}}

Método solicitado: {{escalation_method}}
Página: {{page_url}}

Mensajes: {{message_count}}
```

### Visitor Email (if captured)

**ES:**
```
Subject: Paul te contactará pronto

Hola {{name}},

Gracias por chatear con nosotros. Paul ha recibido tu conversación 
y te contactará pronto.

Si prefieres contacto inmediato:
WhatsApp: [number]
Email: hola@cultivoai.co

Saludos,
Cultivo AI
```

**EN:**
```
Subject: Paul will contact you soon

Hi {{name}},

Thanks for chatting with us. Paul has received your conversation 
and will contact you soon.

If you prefer immediate contact:
WhatsApp: [number]
Email: hola@cultivoai.co

Best,
Cultivo AI
```

---

## Workflow 3: Lead Follow-up Sequence

**Trigger:** Lead with status = 'new' for 24+ hours and no notes/activity

**Purpose:** Nurture leads who haven't responded

### Sequence

**Day 1 (24h after submission):**
- Personal welcome email from Paul
- Acknowledge their project type
- Offer to schedule call

**Day 3:**
- Value content email based on `project_type`
- Share relevant insight or resource
- Soft CTA to continue conversation

**Day 7:**
- "Still thinking about it?" check-in
- Address common hesitations
- Final CTA

**Day 14:**
- Move to 'nurturing' status
- Add to monthly newsletter (if consented)

### Email Templates

**Day 1 - Welcome (ES):**
```
Subject: Recibimos tu mensaje, {{name}}

Hola {{name}},

Gracias por escribirnos. Vi que estás interesado en {{project_type}} 
— es algo que disfrutamos mucho.

¿Tienes 15 minutos esta semana para una llamada rápida? Me gustaría 
entender mejor tu situación y ver si hay algo en lo que podamos ayudar.

Agenda aquí: [calendar link]

O si prefieres, responde este email con tus preguntas y te contesto 
personalmente.

Saludos,
Paul
Cultivo AI
```

**Day 1 - Welcome (EN):**
```
Subject: Got your message, {{name}}

Hi {{name}},

Thanks for reaching out. I saw you're interested in {{project_type}} 
— it's something we really enjoy working on.

Do you have 15 minutes this week for a quick call? I'd like to 
understand your situation better and see if there's something we 
can help with.

Book here: [calendar link]

Or if you prefer, reply to this email with your questions and I'll 
respond personally.

Best,
Paul
Cultivo AI
```

**Day 3 - Value (varies by project_type)**

**Day 7 - Check-in (ES):**
```
Subject: ¿Todavía pensando en {{project_type}}?

Hola {{name}},

Solo quería hacer seguimiento. Sé que estas decisiones toman tiempo, 
y está bien.

Si tienes dudas sobre precios, alcance, o si realmente tiene sentido 
trabajar con nosotros — pregunta. Prefiero una conversación honesta 
a un email ignorado.

¿Hay algo específico que te ayudaría decidir?

Paul
```

---

## Workflow 4: Weekly Summary

**Trigger:** Every Monday 9:00 AM Colombia time (UTC-5)

**Purpose:** Keep Paul informed of business activity

### Flow

1. **Query** leads created in past 7 days
2. **Query** chatbot conversations
3. **Query** Semilla Fund activity
4. **Calculate** metrics
5. **Generate** summary report
6. **Send** via email

### Report Template

```
RESUMEN SEMANAL - Cultivo AI
Semana: {{start_date}} - {{end_date}}

LEADS
------
Nuevos: {{new_leads_count}}
Por fuente:
  - Formulario: {{form_count}}
  - Chatbot: {{chatbot_count}}
  - WhatsApp: {{whatsapp_count}}

Por tipo de proyecto:
{{#each project_types}}
  - {{type}}: {{count}}
{{/each}}

Estados actuales:
  - Nuevos: {{status_new}}
  - Contactados: {{status_contacted}}
  - Calificados: {{status_qualified}}
  - Ganados: {{status_won}}
  - Perdidos: {{status_lost}}

CHATBOT
-------
Conversaciones: {{total_conversations}}
Mensajes: {{total_messages}}
Escalaciones: {{escalations}}
Tasa de captura de email: {{email_capture_rate}}%

Preguntas más frecuentes:
{{#each top_questions}}
  - {{question}} ({{count}})
{{/each}}

SEMILLA FUND
------------
Nuevos supporters: {{new_supporters}}
Monto total: ${{total_amount}} USD

ACCIONES SUGERIDAS
------------------
{{#if leads_without_followup}}
- {{leads_without_followup}} leads sin seguimiento
{{/if}}
{{#if high_intent_conversations}}
- {{high_intent_conversations}} conversaciones de alto interés sin convertir
{{/if}}
```

---

## Workflow 5: Promo Code Tracking

**Trigger:** Lead submitted with `promo_code` field populated

**Purpose:** Validate codes and track usage

### Flow

1. **Trigger:** New lead with promo_code
2. **Query** promotions table for code
3. **Validate:**
   - Code exists and is active
   - Within valid date range
   - Under max_uses limit
4. **If valid:**
   - Increment `times_used`
   - Tag lead with promo info
   - If `times_used >= max_uses`, deactivate promo
5. **If invalid:**
   - Log invalid attempt
   - Continue processing lead normally

### Validation Logic

```javascript
// Pseudo-code
const promo = await db.query('SELECT * FROM promotions WHERE code = ?', [code]);

if (!promo) {
  log('Invalid promo code attempted:', code);
  return { valid: false, reason: 'not_found' };
}

if (!promo.active) {
  return { valid: false, reason: 'inactive' };
}

if (promo.valid_from && new Date() < promo.valid_from) {
  return { valid: false, reason: 'not_started' };
}

if (promo.valid_until && new Date() > promo.valid_until) {
  return { valid: false, reason: 'expired' };
}

if (promo.max_uses && promo.times_used >= promo.max_uses) {
  return { valid: false, reason: 'max_uses_reached' };
}

// Valid - increment usage
await db.query('UPDATE promotions SET times_used = times_used + 1 WHERE id = ?', [promo.id]);

// Check if should deactivate
if (promo.max_uses && promo.times_used + 1 >= promo.max_uses) {
  await db.query('UPDATE promotions SET active = false WHERE id = ?', [promo.id]);
}

return { valid: true, promo };
```

---

## Database Triggers (Alternative to n8n polling)

If PostgreSQL supports triggers/webhooks, can use these instead of polling:

```sql
-- Notify on new lead
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('new_lead', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_insert_trigger
AFTER INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION notify_new_lead();


-- Notify on chatbot escalation
CREATE OR REPLACE FUNCTION notify_escalation()
RETURNS trigger AS $$
BEGIN
  IF NEW.escalated_to_human = true AND OLD.escalated_to_human = false THEN
    PERFORM pg_notify('chatbot_escalation', row_to_json(NEW)::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER escalation_trigger
AFTER UPDATE ON chat_conversations
FOR EACH ROW
EXECUTE FUNCTION notify_escalation();
```

---

## Environment Variables Needed

```
# Database
DATABASE_URL=postgresql://...

# WhatsApp (via WhatsApp Business API or third party)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
PAUL_WHATSAPP_NUMBER=

# Email (SMTP or service like Resend)
EMAIL_FROM=hola@cultivoai.co
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Calendar (Cal.com or Calendly)
CALENDAR_BOOKING_URL=

# OpenRouter (for AI summaries)
OPENROUTER_API_KEY=
```

---

## Notes

- All workflows should have error handling and logging
- Consider rate limiting for WhatsApp messages
- Email templates should be stored in database for easy editing
- Test with staging database before production
