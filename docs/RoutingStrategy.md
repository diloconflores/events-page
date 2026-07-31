# Routing Strategy

## Objetivo

Este proyecto debe implementar una estrategia de rutas basada en:

- SEO First.
- Internacionalización.
- URLs limpias.
- Escalabilidad.
- Mantenimiento sencillo.

Las rutas no deben considerarse únicamente una implementación técnica.

Son parte de:

- La arquitectura SEO.
- La experiencia del usuario.
- La estructura de contenido.

---

# Principios de Routing

Reglas principales:

1. Cada página indexable debe tener una URL única.
2. Las URLs deben ser descriptivas.
3. Las rutas deben estar traducidas por idioma.
4. Nunca depender de query parameters para contenido principal.
5. Evitar cambios innecesarios de URLs.
6. Las rutas deben estar centralizadas.
7. La estructura debe soportar nuevos idiomas.

---

# Arquitectura de Idiomas

El idioma forma parte de la URL y se resuelve desde una ruta dinámica.

Estructura conceptual:

```text
/
/{locale}/
```

Reglas:

- El idioma por defecto es español.
- La URL raíz actúa como fallback en español.
- La ruta `/es/` debe redirigir a `/` por compatibilidad.
- Las rutas por idioma se resuelven con wildcard a nivel de idioma.
- Las rutas traducidas siguen centralizadas en `src/i18n/routes`.

---

# Idioma Principal

El idioma original del proyecto será:

```text
es
```

Reglas:

- Todo contenido debe crearse primero en español.
- Las traducciones parten del contenido original.
- Español será la fuente de verdad.

---

# Rutas Traducidas

Las rutas deben estar traducidas.

Ejemplo:

Archivo:

```text
i18n/routes/es.json
```

```json
{
  "weddings": "bodas",
  "events": "eventos",
  "contact": "contacto"
}
```

Archivo:

```text
i18n/routes/en.json
```

```json
{
  "weddings": "weddings",
  "events": "events",
  "contact": "contact"
}
```

---

# Nunca Traducir Dinámicamente

Las rutas no deben generarse mediante traducción automática.

Incorrecto:

```ts
translate("weddings");
```

para construir URLs.

Correcto:

```ts
routes.es.weddings;
```

Las rutas son contenido controlado.

---

# Language Registry

Todos los idiomas deben estar registrados centralmente.

Ejemplo conceptual:

```text
i18n/

├── registry.ts
├── es.json
├── en.json
└── routes/
```

Responsabilidades:

- Idiomas disponibles.
- Idioma por defecto.
- Metadata del idioma.
- Configuración regional.

Ejemplo:

```ts
{
 locale:"es",
 name:"Español",
 default:true
}
```

---

# Creación de Nuevos Idiomas

Agregar un idioma debe requerir únicamente:

1. Registrar idioma.

Ejemplo:

```text
fr
```

2. Crear traducciones.

```text
i18n/fr.json
```

3. Crear rutas.

```text
i18n/routes/fr.json
```

4. Ejecutar:

```bash
pnpm validate:i18n
```

No deben requerirse cambios dispersos en múltiples componentes.

---

# Estructura Astro

Las páginas deben seguir:

```text
src/pages/

├── index.astro
├── es/
│   └── index.astro
└── [lang]/
    └── index.astro
```

Reglas:

- `src/pages/index.astro` representa la versión principal en español.
- `src/pages/es/index.astro` debe existir solo como compatibilidad y redirigir a `/`.
- `src/pages/[lang]/index.astro` debe generar únicamente idiomas no default.

---

# Dynamic Routes

Cuando existan rutas dinámicas utilizar Astro dynamic routes.

Ejemplo:

```text
pages/[lang]/index.astro
```

La generación debe realizarse mediante:

```ts
getStaticPaths();
```

---

# Static Generation

Las rutas públicas deben generarse durante build.

Preferir:

```text
SSG
```

Evitar:

```text
SSR
```

cuando no sea necesario.

---

# Validación de Rutas

Todas las rutas deben validarse.

Validar:

- Existe traducción.
- Existe página.
- Tiene metadata.
- Tiene contenido.
- Tiene versión en idiomas disponibles.

---

# Ruta No Encontrada

Debe existir una página personalizada:

```text
404
```

Debe:

- Mantener idioma.
- Tener navegación.
- Evitar frustración del usuario.

Ejemplo:

```text
/es/404

/en/404
```

---

# Redirecciones

Las redirecciones deben manejarse explícitamente.

Casos:

- Cambio de URL.
- Migraciones.
- Corrección SEO.

Ejemplo:

```text
/bodas-florales

↓

/bodas
```

---

# Canonical por Ruta

Cada URL debe generar su canonical propio.

Ejemplo:

Página:

```text
/es/bodas
```

Canonical:

```html
<link rel="canonical" href="https://domain.com/es/bodas" />
```

---

# Hreflang por Ruta

Cada ruta debe conocer sus equivalentes.

Ejemplo:

```text
/es/bodas

/en/weddings
```

Generar:

```html
<link rel="alternate" hreflang="es" />

<link rel="alternate" hreflang="en" />
```

---

# Navegación Multilenguaje

El cambio de idioma debe mantener contexto.

Ejemplo:

Usuario en:

```text
/es/bodas
```

Cambia inglés:

Debe ir a:

```text
/en/weddings
```

No:

```text
/en/
```

---

# Componentes de Routing

La lógica de rutas debe estar separada.

Ejemplo:

```text
src/

├── services/
│   └── routing/
│
└── components/
    └── LanguageSelector/
```

El componente no debe conocer reglas internas de rutas.

---

# Language Selector

Debe:

- Mostrar idiomas disponibles.
- Mantener página actual.
- Generar URL correcta.

No debe:

- Traducir rutas manualmente.
- Crear URLs dinámicas sin validación.

---

# URLs y SEO

Las URLs deben:

- Usar palabras reales.
- Evitar caracteres especiales.
- Ser cortas.
- Mantener consistencia.

Correcto:

```text
/es/decoracion-floral-bodas
```

Incorrecto:

```text
/es/page?id=23
```

---

# Slugs

Los slugs deben:

- Estar en minúsculas.
- Usar guiones.
- No usar espacios.
- No contener caracteres especiales.

Correcto:

```text
decoracion-floral
```

Incorrecto:

```text
Decoración Floral
```

---

# Fechas en Rutas

Cuando existan fechas:

Utilizar:

```text
day.js
```

para manejo y transformación.

Reglas:

- No manipular fechas manualmente.
- Mantener timezone consistente.
- Localizar formato según idioma.

---

# Validación i18n

La validación de rutas forma parte de:

```bash
pnpm validate:i18n
```

Debe verificar:

- Idiomas registrados.
- Traducciones existentes.
- Rutas existentes.
- Ausencia de claves faltantes.
- Consistencia entre idiomas.

---

# Checklist Nueva Ruta

Antes de agregar una página:

```text
Nueva página

↓

Definir intención SEO

↓

Crear ruta base

↓

Agregar traducción de ruta

↓

Agregar metadata

↓

Agregar contenido

↓

Agregar hreflang

↓

Validar i18n

↓

Validar SEO
```

---

# Regla Final

Las rutas son contratos públicos.

Una URL bien diseñada mejora:

- SEO.
- Experiencia del usuario.
- Compartibilidad.
- Mantenimiento.

Cambiar una ruta debe considerarse una decisión arquitectónica, no un simple cambio técnico.
