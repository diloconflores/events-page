# Accessibility Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia **Accessibility First**.

El objetivo es construir una plataforma usable por la mayor cantidad posible de personas, independientemente de sus capacidades, dispositivos o formas de interacción.

Cada decisión técnica debe favorecer:

- Experiencia inclusiva.
- Navegación clara.
- Compatibilidad con tecnologías asistivas.
- Mejor comprensión del contenido.
- Cumplimiento de estándares web.

La accesibilidad no debe agregarse al final del desarrollo.

Debe formar parte de la arquitectura desde el inicio.

---

# Principios de Accesibilidad

Reglas principales:

1. Todo contenido debe ser comprensible sin depender únicamente de elementos visuales.
2. Toda interacción debe ser accesible mediante teclado.
3. Utilizar HTML semántico antes que soluciones personalizadas.
4. Los componentes deben comunicar correctamente su propósito.
5. Los estados de interfaz deben ser perceptibles.
6. Evitar barreras innecesarias para usuarios.
7. La accesibilidad debe validarse continuamente.

---

# Estándar objetivo

El proyecto debe seguir las recomendaciones:

```text
WCAG 2.2
```

Nivel objetivo:

```text
AA
```

La implementación debe buscar cumplir los criterios aplicables de este nivel.

---

# HTML Semántico

Debe utilizarse HTML nativo siempre que sea posible.

Preferir:

```html
<button>
  <a>
    <nav>
      <header>
        <main>
          <section>
            <article>
              <footer>
                <form>
                  <label></label>
                </form>
              </footer>
            </article>
          </section>
        </main>
      </header></nav
  ></a>
</button>
```

Evitar reemplazar elementos nativos con:

```html
<div>
  <span></span>
</div>
```

cuando exista una etiqueta semántica adecuada.

Ejemplo incorrecto:

```html
<div onclick="submit()">Enviar</div>
```

Ejemplo correcto:

```html
<button>Enviar</button>
```

---

# Estructura de Encabezados

Los encabezados deben mantener una jerarquía lógica.

Reglas:

- Un solo H1 por página.
- No saltar niveles sin motivo.
- Los encabezados deben describir estructura del contenido.

Correcto:

```text
H1
 |
 ├── H2
 │    └── H3
 │
 └── H2
```

Incorrecto:

```text
H1
 |
 ├── H4
 |
 └── H2
```

Los encabezados no deben utilizarse únicamente para estilos visuales.

---

# Navegación por Teclado

Toda funcionalidad debe poder utilizarse sin mouse.

Debe funcionar correctamente con:

- Tab.
- Enter.
- Space.
- Escape.
- Flechas cuando aplique.

Validar:

- Orden lógico de navegación.
- Elementos interactivos accesibles.
- Estados visibles de foco.

---

# Focus States

Todos los elementos interactivos deben tener un estado visible de foco.

Aplicar especialmente en:

- Botones.
- Links.
- Inputs.
- Menús.
- Modales.

Nunca eliminar completamente:

```css
outline
```

sin proporcionar una alternativa accesible.

---

# Links Accesibles

Los enlaces deben describir claramente su destino.

Correcto:

```text
Ver decoración floral para bodas
```

Incorrecto:

```text
Click aquí
```

Reglas:

- Evitar textos genéricos.
- Mantener contexto fuera del enlace.
- Diferenciar visualmente enlaces.

---

# Botones

Los botones deben representar acciones.

Correcto:

```html
<button>Solicitar cotización</button>
```

Incorrecto:

```html
<a href="#"> Solicitar cotización </a>
```

cuando no existe navegación.

---

# Formularios

Todos los formularios deben ser accesibles.

Reglas:

Cada input debe tener:

- Label asociado.
- Nombre descriptivo.
- Mensajes de error claros.
- Estados visibles.

Ejemplo:

```html
<label for="email"> Correo electrónico </label>

<input id="email" type="email" />
```

Evitar:

- Inputs sin label.
- Errores únicamente por color.
- Mensajes ambiguos.

---

# Imágenes

Todas las imágenes deben considerar accesibilidad.

Reglas:

Imágenes informativas:

```html
<img alt="Decoración floral para boda en salón" />
```

Imágenes decorativas:

```html
<img alt="" />
```

Nunca utilizar:

```text
imagen1.webp
photo.webp
IMG_1234.webp
```

como texto alternativo.

---

# Color y Contraste

La información no debe depender únicamente del color.

Incorrecto:

```text
Campo rojo = error
```

Correcto:

```text
Campo rojo + mensaje de error visible
```

Mantener contraste adecuado entre:

- Texto.
- Fondo.
- Botones.
- Elementos interactivos.

---

# Animaciones y Movimiento

Las animaciones deben respetar preferencias del usuario.

Considerar:

```css
prefers-reduced-motion
```

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
  animation: none;
}
```

Evitar:

- Animaciones excesivas.
- Movimiento continuo innecesario.
- Efectos que dificulten lectura.

---

# Componentes Accesibles

Todo componente nuevo debe considerar accesibilidad desde su creación.

Antes de crear un componente validar:

- ¿Tiene etiqueta semántica correcta?
- ¿Funciona con teclado?
- ¿Tiene estados visibles?
- ¿Tiene textos accesibles?
- ¿Funciona con lectores de pantalla?

---

# Componentes Interactivos

Componentes como:

- Menús.
- Modales.
- Tabs.
- Carruseles.
- Dropdowns.

deben manejar correctamente:

- Focus.
- Estados.
- Navegación teclado.
- Lectores de pantalla.

---

# ARIA

ARIA debe utilizarse únicamente cuando HTML semántico no sea suficiente.

Regla:

Primero:

```html
<button></button>
```

Después:

```html
<div role="button"></div>
```

No agregar atributos ARIA innecesarios.

Incorrecto:

```html
<div role="button" aria-label="botón"></div>
```

cuando puede utilizarse un botón nativo.

---

# Lectores de Pantalla

La aplicación debe funcionar correctamente con tecnologías asistivas.

Validar:

- Orden de lectura.
- Etiquetas.
- Estados.
- Navegación.

Herramientas:

- VoiceOver.
- NVDA.
- ChromeVox.

---

# Responsividad

La accesibilidad también incluye diferentes dispositivos.

Debe garantizarse:

- Zoom del navegador.
- Diferentes tamaños de pantalla.
- Orientación horizontal y vertical.
- Interfaces táctiles.

No bloquear:

- Zoom.
- Ajustes del navegador.

---

# Validación de Accesibilidad

La accesibilidad debe validarse continuamente.

Herramientas recomendadas:

- Lighthouse Accessibility.
- axe DevTools.
- WAVE.
- Lectores de pantalla.

Validar:

- Contraste.
- Navegación teclado.
- Labels.
- ARIA.
- Semántica HTML.

---

# Validación Automática

La validación de accesibilidad debe formar parte de:

```bash
pnpm validate
```

Validaciones recomendadas:

- HTML válido.
- Reglas ARIA.
- Contraste.
- Componentes accesibles.

---

# Checklist de Nuevo Componente

Antes de aprobar un componente:

```text
Crear componente

↓

Definir HTML semántico

↓

Validar teclado

↓

Validar foco

↓

Validar textos accesibles

↓

Validar lector de pantalla

↓

Validar responsive

↓

Aprobar
```

---

# Regla Final

Una interfaz no es completamente funcional si solamente funciona para algunos usuarios.

La accesibilidad debe considerarse una propiedad fundamental del producto.

Un buen sistema debe ser:

- Rápido.
- Encontrable.
- Comprensible.
- Usable.
- Accesible.
