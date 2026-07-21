# Coding Standards

## Objetivo

Este documento define las convenciones obligatorias para escribir código dentro del proyecto.

El objetivo es mantener una base de código:

- limpia
- consistente
- escalable
- fácil de mantener
- fácil de entender para cualquier desarrollador

Todas las contribuciones deben respetar estas reglas.

---

# Arquitectura de Componentes

El proyecto utiliza Atomic Design como metodología principal.

La estructura debe ser:

```text
src/
└── components/
    ├── atoms/
    ├── molecules/
    ├── organisms/
    └── templates/
```

## Responsabilidad de cada nivel

### Atoms

Componentes pequeños y altamente reutilizables.

Ejemplos:

- Button
- Icon
- Input
- Typography
- Badge

No deben contener lógica de negocio.

---

### Molecules

Combinaciones de atoms que forman componentes funcionales.

Ejemplos:

- SearchBox
- FormField
- CardHeader

Pueden manejar composición, pero no lógica compleja.

---

### Organisms

Secciones completas de interfaz.

Ejemplos:

- Hero
- Header
- Footer
- Testimonials
- Gallery

Pueden combinar molecules y atoms.

---

### Templates

Estructuras completas de páginas.

Definen composición general.

No deben contener contenido específico de una página.

---

# Estructura de Componentes

Cada componente debe seguir esta estructura:

```text
ComponentName/

├── index.astro
├── logic.ts
├── constants.ts
├── scripts.ts
└── types.d.ts
```

No todos los archivos son obligatorios.

Únicamente deben existir cuando sean necesarios.

`constants.ts` debe reservarse para configuración estable, datos estáticos o URLs.
No debe acumular clases Tailwind, cadenas de presentación ni estados visuales.
Las clases Tailwind deben escribirse inline en `index.astro` mediante `class` o `class:list`.
No crear mapas, helpers o constantes para clases visuales salvo una necesidad técnica real y justificada.
Los valores visuales deben permanecer en `index.astro`.
Cuando haya clases con posible solape o necesidad de merge, usar `src/utils/cn.ts` con `clsx` + `tailwind-merge`.
El JavaScript del componente debe vivir en `scripts.ts` dentro de la misma carpeta.
Los tokens globales de color, tipografía, sombras y radios deben declararse en `src/styles/global.css` mediante `@theme`.
`tailwind.config.mjs` no debe usarse para definir tokens visuales del sistema.

---

# Convención de Archivos

La carpeta del componente ya define el contexto.

No repetir el nombre del componente en los archivos internos.

Correcto:

```text
Hero/

├── index.astro
├── logic.ts
├── constants.ts
└── types.d.ts
```

Incorrecto:

```text
Hero/

├── Hero.logic.ts
├── Hero.constants.ts
├── Hero.types.ts
```

La intención es mantener una estructura limpia y evitar redundancia.

---

# index.astro

Responsabilidades:

- Renderizar UI.
- Recibir props.
- Componer componentes hijos.

No debe contener:

- lógica de negocio
- transformaciones complejas
- constantes
- scripts de comportamiento
- definiciones de tipos

Debe mantenerse simple.

El comportamiento cliente debe vivir en `scripts.ts`.

---

# logic.ts

Contiene lógica asociada al componente.

Ejemplos:

- transformación de información
- validaciones
- cálculos
- helpers específicos

No debe renderizar UI.

---

# constants.ts

Contiene valores constantes del componente.

Ejemplos:

- configuraciones
- listas estáticas
- valores predeterminados

Evitar clases Tailwind, cadenas de presentación y estilos de UI en este archivo.
Esas decisiones deben vivir inline junto a la UI en `index.astro`.

---

# scripts.ts

Contiene el JavaScript o TypeScript del componente que deba ejecutarse en cliente.

Responsabilidad:

- Comportamiento interactivo.
- Inicialización de listeners.
- Lógica de UI del navegador.

No debe mezclar markup ni CSS.

---

# types.d.ts

Todo tipo relacionado con el componente debe vivir aquí.

Ejemplo:

```ts
export interface HeroProps {
  title: string;
  description?: string;
}
```

No crear:

- interfaces dentro de `.astro`
- tipos inline
- duplicación de tipos

---

# Naming Convention

## Componentes

Utilizar PascalCase.

Correcto:

```text
HeroSection
ProductCard
ContactForm
```

Incorrecto:

```text
hero-section
hero_section
```

---

# TypeScript

Reglas obligatorias:

- TypeScript strict mode.
- Todo debe estar tipado.
- Los tipos deben ser explícitos.

Prohibido:

```ts
any;
```

```ts
@ts-ignore
```

```ts
@ts-nocheck
```

---

# Imports

Mantener imports ordenados.

Orden recomendado:

1. Dependencias externas.
2. Imports de Astro.
3. Componentes.
4. Helpers.
5. Tipos.

---

# Separación UI / Lógica

La UI debe contener únicamente estructura visual.

No colocar:

- cálculos
- filtros
- transformación de datos
- lógica compleja

dentro del template.

Mover lógica compleja a:

```text
logic.ts
```

---

# TailwindCSS

El proyecto debe utilizar:

**TailwindCSS v4.x**

Tailwind será el sistema principal de estilos.

Reglas:

- No usar CSS inline.
- Evitar CSS personalizado salvo casos excepcionales.
- No duplicar estilos repetitivos.
- Mantener clases legibles.

Cuando un patrón visual se repita constantemente:

Crear un componente reutilizable.

---

# Responsive Design

Todo componente debe desarrollarse con enfoque:

- Mobile First.
- Tablet.
- Desktop.
- Pantallas grandes.

Nunca asumir únicamente escritorio.

---

# Manejo de Datos

Los componentes visuales no deben realizar llamadas externas.

Separar:

- obtención de datos
- transformación
- presentación

---

# Assets

Los assets deben mantenerse organizados.

Ejemplo:

```text
src/

├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
```

No agregar recursos sin optimización.

---

# Optimización de Imágenes

Las imágenes son un recurso crítico del proyecto.

Reglas obligatorias:

- Formato principal: WebP.
- Evitar PNG o JPEG salvo casos justificados.
- Peso máximo recomendado: 200 KB por imagen.
- Mantener calidad visual adecuada.

Siempre que sea posible:

- utilizar optimización automática de Astro.
- utilizar `astro:assets`.
- utilizar el componente `Image`.

Todas las imágenes deben definir:

- width
- height
- alt descriptivo

---

# Lazy Loading

Todas las imágenes deben utilizar lazy loading por defecto.

Ejemplo:

```html
loading="lazy"
```

Excepciones:

Las imágenes críticas del primer viewport pueden utilizar carga prioritaria cuando sea necesario mejorar LCP.

Ejemplos:

- Hero principal.
- Imagen principal de portada.

Estas excepciones deben estar justificadas.

---

# Responsive Images

Cuando aplique utilizar:

- srcset
- sizes

No enviar imágenes más grandes de lo necesario para el dispositivo.

---

# Accesibilidad

Todos los componentes deben considerar:

- HTML semántico.
- Navegación por teclado.
- Estados focus.
- Labels correctos.
- Contraste adecuado.

---

# Componentes Grandes

Si un componente supera aproximadamente:

- 150-200 líneas
- múltiples responsabilidades

Debe evaluarse dividirlo.

---

# Reutilización

Antes de crear un componente nuevo:

Preguntarse:

- ¿Existe algo similar?
- ¿Puede extenderse un componente existente?
- ¿Debe convertirse en reusable?

Evitar duplicación.

---

# Regla Final

La prioridad es:

1. Código mantenible.
2. Código legible.
3. Código reutilizable.
4. Código optimizado.

Una solución simple y clara siempre será preferible a una solución compleja.
