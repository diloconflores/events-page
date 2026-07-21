# Architecture

## Objetivo

Este documento define la arquitectura general del proyecto, la organización de carpetas, responsabilidades de cada capa y las reglas para mantener una estructura escalable.

La arquitectura debe permitir:

- Crecimiento del proyecto sin degradación de calidad.
- Fácil mantenimiento.
- Reutilización de componentes.
- Separación clara de responsabilidades.
- Desarrollo paralelo por múltiples personas.
- Optimización para SEO y Performance.

---

# Principios Arquitectónicos

La arquitectura está basada en:

- Atomic Design.
- Separation of Concerns.
- SOLID.
- Component Driven Development.
- Static Site Generation (SSG) cuando sea posible.

La regla principal es:

> Cada parte del sistema debe tener una responsabilidad clara y única.

---

# Estructura General del Proyecto

La estructura base debe seguir:

```text
src/
│
├── assets/
│
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
│
├── layouts/
│
├── pages/
│
├── i18n/
│
├── data/
│
├── services/
│
├── utils/
│
├── config/
│
└── styles/
```

---

# Responsabilidad de Carpetas

## assets/

Contiene recursos estáticos procesados por Astro.

Ejemplo:

```text
assets/

├── images/
├── icons/
└── fonts/
```

Reglas:

- Las imágenes deben estar optimizadas.
- No almacenar archivos sin utilizar.
- No colocar lógica aquí.

---

# components/

Contiene todos los componentes visuales.

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

# Atomic Design

## Atoms

Son los elementos más pequeños.

Características:

- Alta reutilización.
- Sin lógica de negocio.
- Sin conocimiento del contexto donde serán utilizados.

Ejemplo:

```text
atoms/

Button/
Input/
Icon/
```

---

## Molecules

Agrupan atoms.

Características:

- Resuelven una pequeña funcionalidad.
- Pueden recibir información mediante props.
- No manejan lógica compleja.

Ejemplo:

```text
molecules/

FormField/
SearchBox/
Card/
```

---

## Organisms

Representan secciones completas.

Características:

- Combinan molecules y atoms.
- Representan bloques funcionales.
- Pueden tener comportamiento visual.

Ejemplo:

```text
organisms/

Hero/
Header/
Footer/
Gallery/
```

---

## Templates

Representan estructuras completas de página.

Responsabilidades:

- Organización del layout.
- Orden de secciones.
- Composición general.

No deben contener contenido específico.

Ejemplo:

```text
templates/

LandingTemplate/
EventTemplate/
```

---

# layouts/

Contiene layouts globales de Astro.

Responsabilidades:

- HTML base.
- Metadata global.
- Providers.
- Configuraciones compartidas.
- Estructura general del documento.

Ejemplo:

```text
layouts/

BaseLayout.astro
```

Los layouts no deben contener lógica específica de una página.

---

# pages/

Contiene las rutas del sitio.

Astro utiliza esta carpeta para generar páginas.

Ejemplo:

```text
pages/

es/

index.astro

eventos/

index.astro


en/

index.astro

events/

index.astro
```

Las páginas deben ser principalmente composición.

No deben contener lógica compleja.

---

# i18n/

Contiene todo lo relacionado con internacionalización.

Ejemplo:

```text
i18n/

├── es.ts
├── en.ts
├── index.ts
└── types.d.ts
```

Responsabilidades:

- Traducciones.
- Resolución de idioma.
- Tipado de traducciones.

Los componentes no deben conocer cómo funciona el sistema de idiomas.

---

# data/

Contiene información estática del proyecto.

Ejemplo:

```text
data/

products.ts
services.ts
navigation.ts
```

Utilizar cuando la información no corresponde a lógica.

---

# services/

Contiene integraciones externas.

Ejemplo:

```text
services/

analytics.ts
forms.ts
api.ts
```

Responsabilidades:

- Comunicación externa.
- APIs.
- Servicios terceros.

Los componentes visuales nunca deben llamar servicios directamente.

---

# utils/

Contiene funciones reutilizables sin contexto específico.

Ejemplo:

```text
utils/

formatDate.ts
formatCurrency.ts
```

Reglas:

- No colocar lógica de negocio.
- No crear archivos genéricos sin propósito.

Evitar nombres como:

```text
helpers.ts
common.ts
misc.ts
```

---

# config/

Configuraciones generales.

Ejemplo:

```text
config/

site.ts
seo.ts
navigation.ts
```

Debe contener valores globales.

---

# styles/

Contiene estilos globales.

Tailwind debe ser la solución principal.

CSS adicional solamente cuando sea estrictamente necesario.

---

# Flujo de Información

El flujo correcto debe ser:

```text
Data / Services

        ↓

Logic / Transformación

        ↓

Components

        ↓

Pages / Templates

        ↓

Usuario
```

Los componentes no deben saltarse capas.

---

# Reglas de Dependencia

Las dependencias deben fluir hacia abajo.

Correcto:

```text
Pages

 ↓

Templates

 ↓

Organisms

 ↓

Molecules

 ↓

Atoms
```

Incorrecto:

```text
Atoms

 ↓

Organisms
```

Los componentes pequeños nunca deben depender de componentes grandes.

---

# Manejo de Contenido

El contenido debe estar separado de la estructura visual.

Ejemplo:

Incorrecto:

```astro
<h1>
  Creamos eventos increíbles
</h1>
```

Correcto:

```astro
<h1>
 {title}
</h1>
```

El contenido debe provenir de:

- i18n.
- data.
- configuración.

---

# SEO Architecture

El SEO debe estar centralizado.

Debe existir una estrategia única para:

- metadata.
- canonical.
- Open Graph.
- Schema.
- sitemap.

Evitar duplicar configuraciones SEO en múltiples páginas.

---

# Performance Architecture

La arquitectura debe favorecer:

- SSG.
- HTML generado en build.
- Mínimo JavaScript.
- Componentes sin hidratación cuando sea posible.

Utilizar JavaScript únicamente cuando exista una necesidad real.

---

# Extensibilidad

Agregar una nueva sección al sitio debe requerir:

1. Crear componentes necesarios.
2. Agregar contenido.
3. Agregar traducciones.
4. Componer la página.

No debe requerir modificar componentes existentes.

---

# Regla Final

La arquitectura debe permitir que un nuevo desarrollador pueda entender el proyecto rápidamente.

Si una decisión hace el código más complejo sin aportar valor real, debe evitarse.

La simplicidad es una característica arquitectónica.
