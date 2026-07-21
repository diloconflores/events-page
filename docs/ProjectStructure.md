# Project Structure Strategy

## Objetivo

Este proyecto debe mantener una estructura de carpetas clara, predecible y escalable.

El objetivo es:

- Facilitar navegación del código.
- Mantener separación de responsabilidades.
- Reducir acoplamiento.
- Permitir crecimiento del proyecto.
- Facilitar mantenimiento por múltiples desarrolladores.

La estructura del proyecto debe reflejar la arquitectura definida en los documentos:

- Architecture.
- Component Architecture.
- Design System.
- Localization.
- SEO Strategy.
- Testing Strategy.

---

# Estructura General

La estructura base del proyecto debe seguir:

```text
/
├── public/
├── src/
├── tests/
├── docs/
├── astro.config.*
├── package.json
├── pnpm-lock.yaml
├── src/styles/global.css
└── tsconfig.json
```

---

# public/

Contiene archivos públicos que no requieren procesamiento por Astro.

Ejemplos:

```text
public/

├── favicon.ico
├── robots.txt
├── sitemap.xml
└── static-assets/
```

Reglas:

- No colocar componentes.
- No colocar código fuente.
- No colocar imágenes que requieran optimización.

---

# src/

Contiene todo el código fuente de la aplicación.

Estructura:

```text
src/

├── components/
├── layouts/
├── pages/
├── content/
├── i18n/
├── assets/
├── services/
├── utils/
├── constants/
├── styles/
└── types/
```

---

# components/

Contiene todos los componentes reutilizables.

Debe seguir Atomic Design.

Estructura:

```text
components/

├── atoms/
├── molecules/
├── organisms/
└── templates/
```

---

# atoms/

Componentes básicos.

Ejemplos:

```text
atoms/

├── Button/
├── Icon/
├── Image/
└── Typography/
```

Reglas:

- No conocen negocio.
- No realizan llamadas externas.
- Son altamente reutilizables.

---

# molecules/

Combinación de átomos.

Ejemplos:

```text
molecules/

├── FormField/
├── Card/
└── SocialLinks/
```

---

# organisms/

Secciones completas.

Ejemplos:

```text
organisms/

├── Header/
├── Footer/
├── Hero/
└── Gallery/
```

---

# templates/

Estructuras de páginas.

Ejemplos:

```text
templates/

├── Landing/
├── Article/
└── Service/
```

---

# Component Structure

Todos los componentes deben respetar:

```text
ComponentName/

├── index.astro
├── constants.ts
├── scripts.ts
├── types.d.ts
├── logic.ts
└── utils.ts
```

No repetir nombres.

Incorrecto:

```text
Button/

└── Button.astro
```

Correcto:

```text
Button/

└── index.astro
```

---

# layouts/

Contiene layouts globales.

Ejemplos:

```text
layouts/

├── BaseLayout/
└── LandingLayout/
```

Responsabilidad:

- HTML base.
- Metadata.
- Providers.
- Estructura general.

No debe contener lógica de negocio.

---

# pages/

Contiene rutas públicas.

Ejemplo:

```text
pages/

├── es/
│   ├── index.astro
│   └── bodas/
│       └── index.astro
│
└── en/
    ├── index.astro
    └── weddings/
        └── index.astro
```

Reglas:

- Cada página debe representar una ruta.
- No colocar componentes complejos directamente.
- Utilizar templates y organismos.

---

# i18n/

Contiene toda la configuración de internacionalización.

Estructura:

```text
i18n/

├── es.json
├── en.json
├── routes/
│   ├── es.json
│   └── en.json
└── types.d.ts
```

Contiene:

- Traducciones.
- Rutas traducidas.
- Metadata localizada.

---

# assets/

Contiene recursos procesados por Astro.

Ejemplo:

```text
assets/

├── images/
├── icons/
└── fonts/
```

Reglas:

- Imágenes deben optimizarse.
- Preferir WebP.
- Mantener nombres descriptivos.

---

# services/

Contiene comunicación con servicios externos.

Ejemplos:

```text
services/

├── analytics/
├── api/
└── forms/
```

Responsabilidad:

- Comunicación externa.
- Integraciones.
- Adaptadores.

Los componentes no deben consumir servicios directamente.

---

# utils/

Contiene funciones auxiliares puras.

Ejemplos:

```text
utils/

├── date.ts
├── format.ts
└── validation.ts
```

Reglas:

- Sin efectos secundarios.
- Fácilmente testeables.

---

# constants/

Contiene valores globales.

Ejemplos:

```text
constants/

├── site.ts
├── seo.ts
└── routes.ts
```

---

# styles/

Contiene estilos globales.

Ejemplo:

```text
styles/

├── global.css
└── tokens.css
```

Reglas:

- Tailwind 4 será la fuente principal.
- Evitar CSS aislado sin justificación.

---

# types/

Contiene tipos globales compartidos.

Ejemplo:

```text
types/

├── common.d.ts
├── seo.d.ts
└── analytics.d.ts
```

No reemplaza los tipos propios de componentes.

Los componentes mantienen:

```text
ComponentName/types.d.ts
```

---

# tests/

Contiene pruebas automatizadas.

Estructura:

```text
tests/

├── unit/
├── integration/
└── e2e/
```

---

# docs/

Contiene documentación técnica.

Ejemplo:

```text
docs/

├── Architecture.md
├── Localization.md
├── SEO.md
├── Performance.md
└── Security.md
```

---

# Dependencias Permitidas

La dirección de dependencias debe ser:

```text
pages

↓

layouts/templates

↓

organisms

↓

molecules

↓

atoms
```

No permitido:

```text
atoms

↓

pages
```

---

# Alias de Imports

El proyecto debe utilizar aliases para evitar rutas relativas extensas.

Ejemplo:

```ts
import Button from "@/components/atoms/Button";
```

Evitar:

```ts
import Button from "../../../../components/Button";
```

---

# Naming Convention

Reglas:

## Carpetas

Utilizar:

```text
PascalCase
```

Ejemplo:

```text
ContactForm
```

---

## Archivos

Utilizar:

```text
camelCase
```

Ejemplo:

```text
constants.ts
```

---

## Componentes

Utilizar:

```text
PascalCase
```

Ejemplo:

```text
HeroSection
```

---

# Archivos Prohibidos

Evitar crear:

```text
misc/

helpers/

common/

shared/
```

sin una responsabilidad clara.

Estas carpetas suelen convertirse en acumuladores de código sin organización.

---

# Regla para Nuevas Carpetas

Antes de crear una nueva carpeta responder:

1. ¿Qué responsabilidad tiene?
2. ¿Quién depende de ella?
3. ¿Puede vivir dentro de una estructura existente?
4. ¿Tiene límites claros?

---

# Checklist de Nueva Funcionalidad

```text
Nueva funcionalidad

↓

Definir ubicación

↓

Crear estructura correcta

↓

Separar lógica/UI

↓

Agregar tipos

↓

Agregar tests

↓

Validar arquitectura
```

---

# Regla Final

La estructura del proyecto debe hacer evidente dónde pertenece cada cosa.

Un proyecto escalable no depende de que todos conozcan el código.

Depende de que la arquitectura guíe naturalmente dónde crear, modificar y mantener cada pieza.
