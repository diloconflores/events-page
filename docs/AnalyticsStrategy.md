# Analytics Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia de **Data Driven Development**.

El objetivo es implementar una arquitectura de medición que permita:

- Entender el comportamiento de los usuarios.
- Medir conversiones reales.
- Optimizar campañas.
- Evaluar contenido SEO.
- Mejorar experiencia de usuario.
- Tomar decisiones basadas en datos.

Analytics no debe agregarse al final del desarrollo.

Debe formar parte de la arquitectura desde el inicio.

---

# Principios de Analytics

Reglas principales:

1. Medir acciones importantes, no únicamente visitas.
2. Evitar recopilar información innecesaria.
3. Mantener eventos consistentes.
4. Separar métricas de negocio y métricas técnicas.
5. Respetar privacidad del usuario.
6. Evitar afectar performance.
7. Toda medición debe tener un propósito.

---

# Arquitectura de Medición

La estrategia debe considerar diferentes capas:

```text
Usuario

↓

Interacción

↓

Evento

↓

Analytics Platform

↓

Reporte

↓

Decisión
```

---

# Herramientas de Analytics

El proyecto puede integrar:

## Google Analytics 4 (GA4)

Responsabilidad:

- Tráfico.
- Conversiones.
- Comportamiento.
- Fuentes de adquisición.

---

## Google Search Console

Responsabilidad:

- Posicionamiento orgánico.
- Keywords.
- CTR.
- Indexación.
- Errores SEO.

---

## Microsoft Clarity

Responsabilidad:

- Comportamiento visual.
- Heatmaps.
- Grabaciones.
- Análisis UX.

---

# Google Tag Manager

Cuando exista una cantidad considerable de tracking, utilizar un sistema centralizado.

Responsabilidad:

- Administración de tags.
- Eventos.
- Conversiones.
- Integraciones externas.

Evitar agregar múltiples scripts directamente dentro del código.

---

# Performance y Analytics

Los scripts de medición no deben afectar la experiencia.

Reglas:

- Cargar analytics de forma no bloqueante.
- Evitar scripts innecesarios.
- Revisar impacto en Core Web Vitals.
- No agregar trackers sin justificación.

---

# Modelo de Eventos

Los eventos deben seguir una convención clara.

Formato:

```text
object_action
```

Ejemplos:

```text
form_submit

button_click

language_change

gallery_view

whatsapp_click
```

---

# Eventos Principales

## Navegación

Medir:

```text
page_view
```

Información:

- Página visitada.
- Idioma.
- Fuente.
- Campaña.

---

# Cambio de Idioma

Evento:

```text
language_change
```

Parámetros:

```text
from_language

to_language
```

Ejemplo:

```text
es → en
```

---

# Click en CTA

Evento:

```text
cta_click
```

Parámetros:

```text
cta_name

location

page
```

Ejemplo:

```text
cta_name:
request_quote

location:
hero
```

---

# Formularios

Los formularios son eventos críticos.

Eventos:

```text
form_view

form_start

form_submit

form_success

form_error
```

---

# Parámetros de Formularios

Registrar:

```text
form_name

page

language

source
```

No registrar:

- Nombre completo.
- Teléfono.
- Email.
- Información personal.

---

# WhatsApp Tracking

Para negocios locales, WhatsApp es una conversión importante.

Evento:

```text
whatsapp_click
```

Parámetros:

```text
location

page

language
```

Ejemplo:

```text
location:
floating_button
```

---

# Conversiones

Una conversión debe representar valor de negocio.

Ejemplos:

Alta prioridad:

```text
form_success

whatsapp_click

phone_click
```

Media prioridad:

```text
gallery_view

service_view
```

Baja prioridad:

```text
scroll
```

---

# Embudo de Conversión

El proyecto debe permitir analizar:

```text
Visita

↓

Interacción

↓

Interés

↓

Contacto

↓

Cliente
```

Ejemplo:

```text
Landing Wedding

↓

Gallery View

↓

CTA Click

↓

Form Submit

↓

Lead
```

---

# SEO Analytics

Debe medirse:

- Páginas orgánicas más visitadas.
- Keywords principales.
- CTR.
- Conversiones por página.
- Idioma con mejor rendimiento.

---

# Contenido Analytics

Relacionar contenido con resultados.

Analizar:

- Qué artículos generan tráfico.
- Qué páginas generan leads.
- Qué contenido tiene bajo rendimiento.

---

# Analytics Multilenguaje

Todas las métricas deben considerar idioma.

Registrar:

```text
language
```

Ejemplo:

```text
es

en
```

Permitir comparar:

- Conversión por idioma.
- Tráfico por idioma.
- Rendimiento SEO por idioma.

---

# Analytics por Página

Cada página importante debe poder responder:

- Cuántos usuarios llegaron.
- De dónde llegaron.
- Qué hicieron.
- Si convirtieron.

---

# UTM Tracking

Las campañas externas deben utilizar parámetros UTM.

Formato:

```text
utm_source

utm_medium

utm_campaign

utm_content
```

Ejemplo:

```text
utm_source:
instagram

utm_medium:
social

utm_campaign:
wedding_campaign
```

---

# Formularios y Privacidad

Nunca enviar información personal directamente a analytics.

Incorrecto:

```json
{
  "name": "Juan",
  "email": "juan@email.com"
}
```

Correcto:

```json
{
  "form_name": "contact",
  "success": true
}
```

---

# Consentimiento y Privacidad

Cuando aplique:

- Respetar consentimiento del usuario.
- Configurar correctamente cookies.
- Evitar tracking innecesario.

---

# Naming Convention de Eventos

Los nombres deben:

- Estar en inglés.
- Usar snake_case.
- Ser descriptivos.
- Mantener consistencia.

Correcto:

```text
contact_form_submit
```

Incorrecto:

```text
EnviarFormulario
```

---

# Documentación de Eventos

Todo evento debe documentarse.

Ejemplo:

```text
Event:

contact_form_submit


Purpose:

Medir solicitudes enviadas.


Parameters:

form_name
language
page
```

---

# Implementación Técnica

Analytics no debe mezclarse con componentes visuales.

Incorrecto:

```astro
<Button>

<script>
sendAnalytics()
</script>

</Button>
```

Correcto:

```text
Component

↓

Analytics Service

↓

Tracking Provider
```

---

# Analytics Service

La lógica de tracking debe centralizarse.

Ejemplo:

```text
src/

analytics/

├── index.ts
├── events.ts
├── types.d.ts
└── constants.ts
```

Responsabilidad:

- Definir eventos.
- Tipar parámetros.
- Enviar eventos.

---

# Tipado de Eventos

Los eventos deben estar tipados.

Ejemplo:

```ts
export interface AnalyticsEvent {
  name: string;
  params?: Record<string, string>;
}
```

Evitar:

```ts
any;
```

---

# Validación de Analytics

Antes de producción validar:

- Eventos disparan correctamente.
- Conversiones registradas.
- No existe información sensible.
- Performance no se degrada.
- Eventos tienen documentación.

---

# Checklist de Nueva Funcionalidad

```text
Nueva funcionalidad

↓

Definir objetivo de medición

↓

Crear evento si aplica

↓

Documentar parámetros

↓

Implementar tracking

↓

Validar privacidad

↓

Validar Analytics
```

---

# Regla Final

Analytics no debe medir solamente tráfico.

Debe medir comportamiento que permita mejorar el producto y alcanzar objetivos de negocio.

Una arquitectura sin medición obliga a tomar decisiones a ciegas.

Una arquitectura con Analytics permite evolucionar basada en evidencia.
