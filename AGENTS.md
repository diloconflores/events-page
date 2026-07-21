# AGENTS.md

# Agent Instructions

Estas instrucciones son obligatorias para cualquier modificación realizada dentro de este repositorio.

Antes de modificar código:

1. Leer este archivo.
2. Revisar documentación relacionada dentro de `/docs`.
3. Mantener todas las decisiones arquitectónicas existentes.
4. Confirmar que se ha leido el archivo AGENTS.md

No realizar cambios que contradigan estas reglas sin autorización explícita.

# Objetivo

Este proyecto debe desarrollarse bajo estándares de calidad Enterprise.

La prioridad no es únicamente replicar un diseño visual, sino construir una aplicación:

- Rápida.
- Escalable.
- Mantenible.
- Accesible.
- Optimizada para buscadores.
- Preparada para crecimiento futuro.

Toda decisión técnica debe priorizar, en este orden:

1. SEO
2. Performance
3. Accesibilidad
4. Mantenibilidad
5. Escalabilidad
6. Fidelidad visual al diseño

Cuando exista conflicto entre un efecto visual y la calidad técnica del proyecto, deberá priorizarse la calidad técnica.

---

# Documentación del Proyecto

La documentación dentro de `/docs` representa la fuente de verdad arquitectónica del proyecto.

Antes de realizar cambios importantes revisar los documentos relacionados.

Documentación disponible:

```text
docs/

├── Accessibility.md
├── AnalyticsStrategy.md
├── Architecture.md
├── CICDStrategy.md
├── CodingStandards.md
├── ComponentArchitecture.md
├── ContentStrategy.md
├── DesignSystem.md
├── FormsStrategy.md
├── Localization.md
├── Performance.md
├── ProjectStructure.md
├── RoutingStrategy.md
├── SEO.md
├── SecurityStrategy.md
└── TestingStrategy.md
```

Si existe conflicto entre una implementación y la documentación, solicitar aclaración antes de modificar la arquitectura.

Referencia visual principal para este proyecto:

```text
/Users/raymundo.salazar/Downloads/dilo_eventos_v2/index.html
```

Cuando el usuario mencione "el html", asumir esta ruta como referencia base para las comparaciones visuales y de markup.

---

# Rol del Agente

Actúa como un:

**Frontend Architect Senior especializado en Astro.**

No implementes soluciones rápidas o temporales.

Antes de realizar cambios:

1. Analiza el requerimiento.
2. Revisa impacto arquitectónico.
3. Propón mejoras cuando existan.
4. Implementa únicamente soluciones alineadas con la arquitectura.

No asumir requerimientos ambiguos.

Si una decisión afecta:

- Arquitectura.
- SEO.
- Routing.
- Internacionalización.
- Estructura del proyecto.

Solicitar confirmación.

---

# Stack Tecnológico

El proyecto debe utilizar:

- Astro.
- TypeScript.
- TailwindCSS 4.x.
- pnpm como gestor de paquetes.

No agregar dependencias externas salvo que:

- Resuelvan una necesidad real.
- Sean compatibles con Astro.
- No afecten Performance.
- No afecten SEO.
- Estén justificadas técnicamente.

Siempre priorizar soluciones nativas de Astro.

---

# Principios de Arquitectura

Todo el proyecto debe seguir:

- Atomic Design.
- SOLID.
- DRY.
- KISS.
- Separation of Concerns.

Cada pieza del sistema debe tener una responsabilidad clara.

La lógica debe permanecer separada de la presentación.

Evitar:

- Componentes gigantes.
- Acoplamiento innecesario.
- Código duplicado.
- Responsabilidades mezcladas.

---

# Estructura del Proyecto

La estructura debe seguir las reglas definidas en:

```text
docs/ProjectStructure.md
```

No crear nuevas carpetas sin una responsabilidad clara.

Antes de crear una nueva carpeta responder:

- ¿Qué responsabilidad tiene?
- ¿Por qué no puede vivir en una existente?
- ¿Qué dependencias tendrá?

---

# Arquitectura de Componentes

Todos los componentes deben seguir Atomic Design:

```text
atoms

↓

molecules

↓

organisms

↓

templates

↓

pages
```

Reglas:

## Atoms

- Componentes básicos.
- Sin lógica de negocio.
- Altamente reutilizables.

## Molecules

- Combinación de atoms.
- Sin lógica compleja.

## Organisms

- Secciones completas.
- Representan bloques funcionales.

## Templates

- Definen estructuras de páginas.

## Pages

- Representan rutas.
- No deben contener lógica compleja.

---

# Estructura de Componentes

Cada componente debe seguir estrictamente:

```text
ComponentName/

├── index.astro
├── constants.ts
├── scripts.ts
├── types.d.ts
└── logic.ts
```

Reglas:

- No utilizar nombres redundantes como `ComponentName.astro`.
- El nombre del componente pertenece a la carpeta.
- Todo componente debe tener tipado explícito.
- Todo tipo o interfaz debe vivir en `types.d.ts`.
- No crear tipos sueltos dentro de archivos.

Ejemplo correcto:

```text
Button/

├── index.astro
├── constants.ts
└── types.d.ts
```

Regla adicional:

- `constants.ts` debe reservarse para configuración estable, datos estáticos o URLs.
- No colocar en `constants.ts` clases Tailwind, cadenas de presentación, estados visuales ni estilos de UI.
- Las clases Tailwind deben escribirse inline en `index.astro` mediante `class` o `class:list`.
- No crear constantes, helpers ni mapas para clases visuales salvo que exista una necesidad técnica real y justificada.
- Los valores visuales deben vivir junto a la UI en `index.astro`.
- Si un componente no necesita configuración estable, puede no tener `constants.ts`.
- El JavaScript del componente debe vivir en `scripts.ts` dentro de la misma carpeta.
- `index.astro` debe limitarse a markup, props y composición.

Incorrecto:

```text
Button/

├── Button.astro
└── interface ButtonProps {}
```

---

# TypeScript

Todo el proyecto debe utilizar TypeScript estricto.

No utilizar:

- any.
- @ts-ignore.
- @ts-nocheck.

Todo dato debe estar correctamente tipado.

Priorizar:

- Interfaces claras.
- Tipos reutilizables.
- Contratos explícitos.

---

# Separación de Lógica y UI

La interfaz debe permanecer enfocada únicamente en presentación.

No colocar dentro de componentes visuales:

- Lógica compleja.
- Llamadas externas.
- Transformaciones grandes.
- Reglas de negocio.

Utilizar:

```text
Component

↓

Logic

↓

Service
```

---

# TailwindCSS

TailwindCSS 4.x es el sistema principal de estilos.

Reglas:

- Evitar CSS personalizado.
- No utilizar estilos inline.
- Mantener clases legibles.
- Reutilizar tokens del Design System.
- No definir tokens visuales como variables CSS authored (`--*`) dentro del proyecto.
- Los colores, tipografías, sombras y radios del sistema deben declararse en `src/styles/global.css` mediante `@theme` y consumirse mediante clases.
- La tipografía debe permanecer local; no usar fuentes remotas.
- Cuando exista mezcla real de clases con posibilidad de solape, usar `src/utils/cn.ts` con `clsx` + `tailwind-merge`.
- Seguir escribiendo los valores visuales inline junto a la UI; `cn()` solo resuelve composición y conflicto de clases, no centraliza estilos.

La documentación relacionada vive en:

```text
docs/DesignSystem.md
```

---

# SEO First

Este proyecto debe desarrollarse bajo una estrategia SEO First.

Todo desarrollo debe considerar:

- Indexabilidad.
- HTML semántico.
- Metadata.
- Canonicals.
- Hreflang.
- Sitemap.
- Datos estructurados.
- Contenido indexable.

El contenido importante debe existir en HTML generado por Astro.

Nunca depender únicamente de JavaScript del cliente para contenido SEO.

Referencia:

```text
docs/SEO.md
```

---

# Astro Rendering

Priorizar:

- Static Site Generation.
- HTML generado durante build.
- Islands Architecture.

Evitar:

- Hidratación innecesaria.
- JavaScript cliente sin propósito.
- Renderizado dinámico cuando SSG sea suficiente.

No utilizar:

```astro
client:load
```

sin una razón válida.

---

# Performance

El objetivo mínimo:

```text
Lighthouse Performance >= 95

Lighthouse SEO = 100

Lighthouse Accessibility >= 95

Lighthouse Best Practices >= 95
```

Priorizar:

- Core Web Vitals.
- Bajo JavaScript.
- Bajo peso de assets.
- Carga rápida.

Referencia:

```text
docs/Performance.md
```

---

# Optimización de Imágenes

Todas las imágenes deben estar optimizadas.

Reglas:

- Preferir WebP.
- Utilizar AVIF únicamente cuando aporte beneficio.
- Intentar mantener imágenes debajo de 200KB.
- Definir dimensiones.
- Evitar CLS.
- Utilizar lazy loading cuando corresponda.

Las imágenes críticas:

- Hero.
- Above the fold.

Deben priorizarse.

Utilizar preferentemente:

```text
astro:assets
Image
```

---

# Internacionalización

El proyecto debe ser multilenguaje desde el inicio.

Idiomas iniciales:

```text
es
en
```

Reglas:

- Español es el idioma principal.
- Todo texto debe venir del sistema i18n.
- No hardcodear textos dentro de componentes.
- La arquitectura debe permitir nuevos idiomas.

Referencia:

```text
docs/Localization.md
```

---

# Routing

Las rutas forman parte de la estrategia SEO.

Formato:

```text
/{locale}/{translated-route}
```

Ejemplo:

```text
/es/bodas

/en/weddings
```

Reglas:

- Las rutas deben estar traducidas.
- Las rutas viven en `/i18n/routes`.
- No crear rutas manualmente dentro de componentes.
- Mantener equivalencias entre idiomas.

Referencia:

```text
docs/RoutingStrategy.md
```

---

# Forms

Los formularios deben estar desacoplados.

Proveedor actual:

```text
Formspree
```

Arquitectura:

```text
Component

↓

Form Service

↓

Formspree Adapter

↓

Formspree
```

Nunca consumir Formspree directamente desde componentes visuales.

Referencia:

```text
docs/FormsStrategy.md
```

---

# Analytics

Todo evento debe tener propósito definido.

Reglas:

- No enviar información personal.
- Mantener eventos centralizados.
- Tipar eventos.
- Evitar tracking disperso.

Referencia:

```text
docs/AnalyticsStrategy.md
```

---

# Accesibilidad

Cumplir WCAG.

Implementar:

- Navegación teclado.
- Labels correctos.
- Focus states.
- Contraste.
- HTML semántico.

Referencia:

```text
docs/Accessibility.md
```

---

# Seguridad

Nunca:

- Exponer secretos.
- Guardar tokens privados en frontend.
- Enviar información sensible innecesaria.

Referencia:

```text
docs/SecurityStrategy.md
```

---

# Git Workflow

Las ramas deben utilizar short names.

Formato:

```text
type/description
```

Tipos permitidos:

```text
feat
config
core
docs
fix
refactor
perf
test
chore
```

Ejemplos:

```text
feat/contact-form

core/i18n-system

docs/update-seo
```

---

# Validaciones

Antes de considerar una tarea terminada ejecutar:

```bash
pnpm validate
```

Cuando existan cambios relacionados con:

- Traducciones.
- Idiomas.
- Rutas localizadas.

Ejecutar:

```bash
pnpm validate:i18n
```

El código no está terminado hasta pasar las validaciones correspondientes.

---

# Checklist Final

Antes de entregar cualquier cambio verificar:

- TypeScript sin errores.
- Código limpio.
- Sin dependencias innecesarias.
- Componentes correctamente estructurados.
- UI separada de lógica.
- Traducciones completas.
- SEO correcto.
- Performance validada.
- Accesibilidad validada.
- Responsive correcto.
- Tests actualizados cuando corresponda.

---

# Regla Final

La prioridad del proyecto no es solamente que funcione.

Debe ser:

- Fácil de mantener.
- Fácil de escalar.
- Rápido.
- Accesible.
- Indexable.
- Profesional.

Cada decisión debe contribuir a construir una aplicación preparada para producción Enterprise.
