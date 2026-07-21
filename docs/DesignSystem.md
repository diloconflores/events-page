# Design System Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia de **Design System First**.

El objetivo es construir una base visual y técnica consistente que permita:

- Crear interfaces escalables.
- Mantener consistencia visual.
- Reducir duplicación de código.
- Facilitar mantenimiento.
- Acelerar desarrollo futuro.
- Garantizar una experiencia uniforme.

El sistema de diseño no debe ser únicamente una colección de estilos.

Debe representar una arquitectura de componentes reutilizables.

---

# Principios del Design System

Reglas principales:

1. Todo elemento visual reutilizable debe convertirse en componente.
2. Evitar duplicación de UI.
3. Mantener una única fuente de verdad.
4. Separar estructura, comportamiento y estilos.
5. Los componentes deben tener responsabilidad única.
6. Los componentes deben ser independientes del contenido.
7. La lógica nunca debe mezclarse con la presentación.
8. Todos los componentes deben estar tipados.

Las clases Tailwind y demás decisiones visuales deben vivir inline junto a la UI.
No deben concentrarse en `constants.ts` ni en helpers de clases; ese archivo debe reservarse para configuración estable, datos estáticos o URLs.
Si una composición necesita merge real de clases Tailwind, usar `src/utils/cn.ts` con `clsx` + `tailwind-merge` sin mover estilos fuera del componente.
El comportamiento de cliente debe vivir en `scripts.ts` cuando un componente lo requiera.
Los tokens visuales del sistema, incluyendo colores, tipografías locales, sombras y radios, deben declararse en `src/styles/global.css` mediante `@theme`.
`tailwind.config.mjs` no debe contener tokens visuales del sistema.

---

# Atomic Design

El proyecto utilizará una arquitectura basada en **Atomic Design**.

La estructura deberá dividir componentes según su nivel de complejidad.

---

# Átomos

Los átomos representan elementos básicos de interfaz.

Ejemplos:

- Button.
- Input.
- Icon.
- Typography.
- Badge.
- Divider.
- Image.

Características:

- No conocen contexto de negocio.
- Son altamente reutilizables.
- No contienen lógica compleja.

Ejemplo:

```text id="atom01"
Button

↓

Recibe:

- variant
- size
- disabled

Renderiza:

<button>
```

---

# Moléculas

Las moléculas combinan varios átomos para crear elementos funcionales.

Ejemplos:

- SearchBar.
- FormField.
- CardHeader.
- SocialLinks.

Características:

- Agrupan componentes pequeños.
- Mantienen responsabilidad limitada.
- No representan una sección completa.

Ejemplo:

```text id="mol01"
FormField

=

Label

+

Input

+

ErrorMessage
```

---

# Organismos

Los organismos representan bloques completos de interfaz.

Ejemplos:

- Header.
- Footer.
- Hero.
- Gallery.
- PricingSection.

Características:

- Pueden combinar moléculas.
- Representan secciones completas.
- No deben contener lógica de negocio.

---

# Templates

Los templates definen estructuras de página.

Ejemplos:

- LandingTemplate.
- ArticleTemplate.
- ProductTemplate.

Responsabilidad:

- Organización de layout.
- Distribución de contenido.
- Composición de organismos.

No deben contener contenido específico.

---

# Pages

Las páginas representan rutas reales de la aplicación.

Ejemplos:

```text id="page01"
/es/bodas

/en/weddings
```

Responsabilidad:

- Obtener información.
- Resolver datos.
- Componer templates.

No deben contener componentes visuales complejos.

---

# Estructura de Componentes

Todos los componentes deben seguir una estructura estándar.

Ejemplo:

```text id="comp01"
ComponentName/

├── index.astro
├── constants.ts
├── scripts.ts
└── types.d.ts
```

Reglas:

- La carpeta representa el nombre del componente.
- El archivo principal siempre será `index.astro`.
- No repetir el nombre del componente en archivos internos.

Incorrecto:

```text id="comp02"
Button/

├── Button.astro
```

Correcto:

```text id="comp03"
Button/

├── index.astro
```

---

# Tipado

Todo componente debe tener sus tipos dentro de:

```text id="type01"
types.d.ts
```

No se permiten:

- Interfaces sueltas.
- Types dentro de componentes.
- Tipados duplicados.

Incorrecto:

```ts id="type02"
interface Props {
  title: string;
}
```

dentro de:

```text
index.astro
```

Correcto:

```text id="type03"
types.d.ts

export interface Props {
 title:string
}
```

---

# Separación de responsabilidades

La lógica debe estar separada de la UI.

Un componente visual debe enfocarse en:

- Renderizar.
- Recibir propiedades.
- Mostrar estados visuales.

No debe manejar:

- Peticiones API.
- Transformación compleja de datos.
- Reglas de negocio.
- Cálculos.

---

# Estructura recomendada

Para componentes complejos:

```text id="logic01"
ComponentName/

├── index.astro
├── constants.ts
├── types.d.ts
├── hooks.ts
└── utils.ts
```

Donde:

## index.astro

Responsabilidad:

- Renderizado.
- Composición visual.

---

## constants.ts

Responsabilidad:

- Valores constantes.
- Configuraciones estáticas.

---

## types.d.ts

Responsabilidad:

- Todos los contratos TypeScript.

---

## hooks.ts

Responsabilidad:

- Lógica reutilizable.
- Estados.
- Comportamientos.

---

## utils.ts

Responsabilidad:

- Funciones auxiliares puras.

---

# Tailwind CSS

El proyecto utiliza:

```text id="tw01"
Tailwind CSS 4
```

Reglas:

- Tailwind será la única fuente de estilos.
- Evitar CSS tradicional salvo casos justificados.
- Evitar estilos inline.
- Evitar duplicación de clases.

---

# Tokens de Diseño

Los valores visuales repetidos deben convertirse en tokens.

Ejemplos:

- Colores.
- Espaciados.
- Tipografías.
- Bordes.
- Sombras.
- Breakpoints.

No repetir valores arbitrarios.

Incorrecto:

```html
<div class="mt-[37px]"></div>
```

Correcto:

```html
<div class="mt-spacing-lg"></div>
```

cuando exista un token definido.

---

# Variantes de Componentes

Los componentes deben utilizar variantes explícitas.

Ejemplo:

```ts
type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "nav" | "wizard-back" | "wizard-next" | "submit" | "link" | "chip" | "icon";
```

Evitar:

```text id="var01"
Crear múltiples componentes:

ButtonBlue
ButtonGreen
ButtonLarge
```

Debe existir:

```text id="var02"
Button

variant="primary"
size="large"
```

---

# Accesibilidad

Todos los componentes deben cumplir requisitos de accesibilidad.

Antes de crear un componente validar:

- HTML semántico.
- Navegación teclado.
- Estados visibles.
- Labels.
- ARIA cuando sea necesario.

---

# Responsabilidad única

Cada componente debe resolver un problema específico.

Incorrecto:

```text id="sr01"
MegaLandingComponent
```

que contiene:

- Header.
- Hero.
- Gallery.
- Formulario.
- Footer.

````

Correcto:

```text id="sr02"
LandingPage

├── Header
├── Hero
├── Gallery
├── ContactForm
└── Footer
````

---

# Reutilización

Antes de crear un componente nuevo:

Verificar:

- ¿Existe uno similar?
- ¿Puede extenderse?
- ¿Puede convertirse en variante?

Evitar crear componentes duplicados.

---

# Naming Convention

Los nombres deben ser:

- Claros.
- En inglés.
- Descriptivos.
- Independientes del contexto.

Correcto:

```text id="name01"
HeroSection
```

Incorrecto:

```text id="name02"
BodasHero
```

Un componente debe poder reutilizarse en diferentes contextos.

---

# Documentación de Componentes

Los componentes complejos deben documentarse.

Debe incluir:

- Propósito.
- Props disponibles.
- Variantes.
- Ejemplos de uso.

---

# Validación del Design System

Antes de aprobar nuevos componentes verificar:

- Sigue Atomic Design.
- Tiene estructura correcta.
- Tiene types.d.ts.
- No contiene lógica de negocio.
- Utiliza Tailwind 4.
- Cumple accesibilidad.
- Es reutilizable.

---

# Regla Final

Un Design System exitoso no depende únicamente de componentes bonitos.

Depende de reglas claras que permitan evolucionar el producto sin perder consistencia.

Cada componente debe ser:

- Reutilizable.
- Tipado.
- Accesible.
- Mantenible.
- Independiente.
- Escalable.
