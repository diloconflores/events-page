# Component Architecture Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una arquitectura de componentes escalable, mantenible y orientada a principios SOLID.

El objetivo es construir componentes que:

- Sean reutilizables.
- Tengan responsabilidades claras.
- Mantengan bajo acoplamiento.
- Sean fáciles de probar.
- Sean fáciles de extender.
- Mantengan consistencia con el Design System.

Los componentes no deben ser únicamente bloques visuales.

Deben representar unidades independientes de funcionalidad dentro del sistema.

---

# Principios SOLID aplicados a componentes

La arquitectura debe seguir principios SOLID adaptados al desarrollo frontend.

---

# Single Responsibility Principle (SRP)

Cada componente debe tener una única responsabilidad.

Un componente debe cambiar solamente cuando cambia la responsabilidad que representa.

Incorrecto:

```text
CheckoutSection

Responsabilidades:

- Renderizar formulario.
- Validar campos.
- Calcular precios.
- Enviar información.
- Mostrar mensajes.
```

Correcto:

```text
CheckoutSection

↓

CheckoutForm

↓

ValidationService

↓

CheckoutService
```

---

# Open / Closed Principle (OCP)

Los componentes deben estar abiertos para extensión pero cerrados para modificación.

Preferir:

- Props.
- Variantes.
- Composición.

Evitar:

- Duplicar componentes.
- Crear versiones específicas por caso.

Incorrecto:

```text
ButtonBlue
ButtonGreen
ButtonLarge
ButtonSmall
```

Correcto:

```text
Button

variant="primary"

size="large"
```

---

# Liskov Substitution Principle (LSP)

Los componentes derivados o variantes deben mantener el mismo contrato.

Ejemplo:

Si existe:

```ts
Button;
```

Todas sus variantes deben aceptar las mismas propiedades base.

Incorrecto:

```text
PrimaryButton

requiere:
href


SecondaryButton

requiere:
onClick
```

Correcto:

```ts
ButtonProps;
```

define un contrato consistente.

---

# Interface Segregation Principle (ISP)

Los componentes no deben recibir propiedades que no utilizan.

Incorrecto:

```ts
interface CardProps {
  title: string;

  image: string;

  price: number;

  location: string;

  author: string;

  rating: number;
}
```

si el componente solamente utiliza:

```text
title
image
```

Correcto:

Crear contratos específicos.

---

# Dependency Inversion Principle (DIP)

Los componentes visuales no deben depender de implementaciones concretas.

Incorrecto:

```astro
<Component />

↓

fetch API
```

Correcto:

```text
Data Source

↓

Props

↓

Component
```

Los componentes deben recibir información, no obtenerla directamente.

---

# Jerarquía de componentes

La dirección de dependencias debe ser siempre descendente.

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

Reglas:

- Un nivel inferior no debe conocer niveles superiores.
- Los átomos no conocen páginas.
- Las moléculas no conocen organismos.
- Los componentes no deben depender del routing.

---

# Ejemplo de dependencia incorrecta

Incorrecto:

```text
Button

↓

importa

WeddingPage
```

Un botón no debe conocer el contexto donde se utiliza.

---

# Ejemplo correcto

```text
WeddingPage

↓

HeroSection

↓

Button
```

La información fluye hacia abajo mediante props.

---

# Estructura estándar de componentes

Todos los componentes deben seguir:

```text
ComponentName/

├── index.astro
├── constants.ts
├── scripts.ts
├── types.d.ts
```

`constants.ts` no debe actuar como contenedor de clases Tailwind ni de estilos visuales.
Las clases deben ir inline en `index.astro` con `class` o `class:list`.
Queda solo para configuración estable, datos estáticos o URLs.
Si el componente no necesita configuración estable, puede no tener `constants.ts`.
El JavaScript del componente debe vivir en `scripts.ts`.

---

# Componentes complejos

Cuando un componente requiera lógica adicional:

```text
ComponentName/

├── index.astro
├── constants.ts
├── types.d.ts
├── logic.ts
├── scripts.ts
└── utils.ts
```

---

# Responsabilidad de archivos

## index.astro

Responsabilidad:

- Renderizado.
- Composición visual.
- Uso de componentes hijos.

No debe contener:

- Lógica compleja.
- Transformaciones extensas.
- Reglas de negocio.

---

## constants.ts

Responsabilidad:

- Valores constantes.
- Configuraciones estáticas.
- Opciones disponibles.

Ejemplo:

```ts
export const variants = ["primary", "secondary"];
```

No usar `constants.ts` como repositorio de clases Tailwind o estilos de presentación.
Las clases visuales deben permanecer inline junto a la UI en `index.astro`.

---

## scripts.ts

Responsabilidad:

- Comportamiento de cliente del componente.
- Inicialización de eventos.
- Manipulación de estado visual en navegador.

Reglas:

- No mezclar markup.
- No mezclar estilos.
- No duplicar lógica de negocio.

---

## types.d.ts

Responsabilidad:

- Todos los contratos TypeScript.

Reglas:

- No crear interfaces dentro de `.astro`.
- No crear tipos duplicados.
- Todo tipado público debe vivir aquí.

Ejemplo:

```ts
export interface Props {
  title: string;
  variant?: Variant;
}
```

---

## logic.ts

Responsabilidad:

- Lógica reutilizable.
- Transformación de datos.
- Estados complejos.

No debe contener:

- HTML.
- Clases Tailwind.
- Renderizado.

---

## utils.ts

Responsabilidad:

- Funciones puras.
- Helpers.
- Transformaciones simples.

Ejemplo:

```ts
formatDate();
formatCurrency();
```

---

# Separación UI / Lógica

La UI debe estar separada de la lógica.

Incorrecto:

```astro
---
const total =
items.reduce(...)
---
```

Correcto:

```text
Component

↓

logic.ts

↓

resultado

↓

index.astro
```

---

# Componentes Presentacionales

Son componentes enfocados únicamente en UI.

Ejemplos:

- Button.
- Card.
- Typography.
- Image.
- Badge.

Características:

- No realizan llamadas externas.
- No conocen negocio.
- Reciben información mediante props.

---

# Componentes Contenedores

Son componentes responsables de composición o preparación de datos.

Ejemplos:

- ProductGalleryContainer.
- WeddingPortfolioContainer.

Responsabilidades:

- Obtener datos.
- Preparar información.
- Pasar props.

No deben controlar estilos internos.

---

# Flujo de datos

La información debe fluir en una sola dirección.

```text
Page

↓

Template

↓

Organism

↓

Molecule

↓

Atom
```

Los componentes hijos no deben modificar directamente datos del padre.

---

# Props

Los componentes deben comunicarse mediante props.

Ejemplo:

```astro
<Card
 title="Boda elegante"
 image="/image.webp"
/>
```

Evitar:

- Variables globales.
- Estados compartidos innecesarios.
- Dependencias ocultas.

---

# Manejo de variantes

Las variantes deben estar definidas mediante tipos.

Ejemplo:

```ts
export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "nav" | "wizard-back" | "wizard-next" | "submit" | "link" | "chip" | "icon";
```

No crear componentes separados para variaciones visuales.

---

# Naming Convention

Los nombres deben:

- Estar en inglés.
- Ser descriptivos.
- Representar responsabilidad.

Correcto:

```text
HeroSection
ContactForm
ImageGallery
```

Incorrecto:

```text
MainThing
AwesomeBlock
CustomSection
```

---

# Componentes y Localización

Los componentes no deben manejar traducciones directamente.

Incorrecto:

```astro
<h1>
Bodas elegantes
</h1>
```

Correcto:

```astro
<h1>
{title}
</h1>
```

La localización debe resolverse fuera del componente.

---

# Componentes y SEO

Los componentes deben facilitar SEO.

Reglas:

- Utilizar HTML semántico.
- Permitir contenido indexable.
- Evitar generar contenido únicamente mediante JavaScript.
- Mantener estructura accesible.

---

# Componentes y Performance

Los componentes deben considerar rendimiento.

Reglas:

- Evitar hidratación innecesaria.
- Evitar JavaScript cliente.
- Optimizar imágenes.
- Reducir dependencias.

Un componente estático debe permanecer estático.

---

# Reutilización

Antes de crear un componente nuevo:

Validar:

1. ¿Existe un componente similar?
2. ¿Puede extenderse mediante props?
3. ¿Puede utilizarse una variante?
4. ¿La responsabilidad está correctamente definida?

---

# Validación de Componentes

Antes de aprobar un componente verificar:

- Sigue Atomic Design.
- Respeta SOLID.
- Tiene estructura correcta.
- Tiene `types.d.ts`.
- No mezcla lógica y UI.
- Usa Tailwind 4.
- Cumple accesibilidad.
- Está optimizado para SEO.
- No genera problemas de performance.

---

# Checklist de Nuevo Componente

```text
Crear componente

↓

Definir responsabilidad

↓

Asignar nivel Atomic Design

↓

Crear estructura de carpeta

↓

Crear types.d.ts

↓

Separar lógica

↓

Implementar UI

↓

Validar accesibilidad

↓

Validar performance

↓

Aprobar
```

---

# Regla Final

Los componentes son la base del producto.

Un componente bien diseñado debe poder evolucionar sin romper otras partes del sistema.

La arquitectura debe favorecer:

- Claridad.
- Reutilización.
- Bajo acoplamiento.
- Alta cohesión.
- Escalabilidad.
