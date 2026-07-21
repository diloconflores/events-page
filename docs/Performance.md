# Performance Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia **Performance First**.

El objetivo es construir una plataforma rápida, eficiente y escalable donde cada decisión técnica favorezca:

- Tiempo de carga reducido.
- Excelente experiencia de usuario.
- Core Web Vitals óptimos.
- Bajo consumo de recursos.
- Menor cantidad de JavaScript enviado al navegador.
- Escalabilidad sin degradación del rendimiento.

La optimización de rendimiento no debe realizarse al final del desarrollo.

Debe formar parte de la arquitectura desde el inicio.

---

# Principios de Performance

Reglas principales:

1. Enviar únicamente el código necesario.
2. Priorizar HTML y CSS generado en build.
3. Minimizar JavaScript en cliente.
4. Optimizar imágenes antes de producción.
5. Evitar cargas innecesarias.
6. Medir rendimiento continuamente.
7. Mantener componentes eficientes.
8. Evitar soluciones que aumenten complejidad sin beneficio real.

---

# Core Web Vitals

El proyecto debe mantener excelentes métricas de experiencia.

Los principales indicadores son:

---

## Largest Contentful Paint (LCP)

Mide el tiempo necesario para mostrar el elemento principal visible.

Objetivo:

```text
< 2.5 segundos
```

Optimizar especialmente:

- Imagen principal.
- Hero section.
- Fuentes.
- Contenido inicial.
- Renderizado del servidor.

Evitar:

- Imágenes pesadas.
- Bloqueos de renderizado.
- Cargas innecesarias antes del contenido principal.

---

## Cumulative Layout Shift (CLS)

Mide cambios inesperados en la posición de elementos.

Objetivo:

```text
< 0.1
```

Evitar:

- Imágenes sin dimensiones.
- Fuentes que cambian tamaño después de cargar.
- Componentes que aparecen después del render inicial.
- Animaciones que modifican layout.

Siempre definir:

```html
width height
```

en imágenes.

---

## Interaction to Next Paint (INP)

Mide la capacidad de respuesta de la interfaz.

Objetivo:

```text
< 200ms
```

Optimizar:

- JavaScript ejecutado en navegador.
- Eventos.
- Componentes interactivos.
- Cálculos pesados.

---

# Arquitectura Astro

El proyecto debe aprovechar las capacidades nativas de Astro.

Priorizar:

- Static Site Generation.
- Server Rendering cuando sea necesario.
- Islands Architecture.
- Hidratación parcial.

---

# Hidratación

La hidratación debe utilizarse únicamente cuando exista interacción.

Regla:

Un componente estático nunca debe hidratarse.

Incorrecto:

```astro
<Component client:load />
```

si únicamente muestra contenido.

Correcto:

```astro
<Component />
```

---

# Estrategia de hidratación

Cuando sea necesario hidratar componentes utilizar la menor prioridad posible.

Orden recomendado:

```text
client:visible

>

client:idle

>

client:load
```

---

## client:visible

Preferido para:

- Carruseles.
- Galerías.
- Elementos debajo del primer viewport.

Ejemplo:

```astro
<Gallery client:visible />
```

---

## client:idle

Utilizar para:

- Componentes secundarios.
- Funcionalidades no críticas.

Ejemplo:

```astro
<ChatWidget client:idle />
```

---

## client:load

Utilizar únicamente para:

- Elementos críticos.
- Interacciones necesarias inmediatamente.

Debe ser la excepción.

---

# JavaScript

El JavaScript enviado al navegador debe minimizarse.

Reglas:

- No utilizar JavaScript para contenido estático.
- Evitar librerías pesadas sin necesidad.
- Evitar duplicación de lógica.
- Preferir soluciones nativas del navegador.

Evitar:

```text
Importar una librería completa
para resolver una función pequeña.
```

---

# Bundle Size

El tamaño del bundle debe mantenerse controlado.

Reglas:

- Revisar dependencias antes de agregarlas.
- Evitar paquetes abandonados.
- Evitar dependencias duplicadas.
- Preferir librerías pequeñas.

Antes de agregar una dependencia evaluar:

- Peso.
- Mantenimiento.
- Necesidad real.
- Impacto en performance.

---

# CSS y Tailwind

El proyecto utiliza:

```text
Tailwind CSS 4
```

Reglas:

- Utilizar únicamente clases necesarias.
- Evitar CSS duplicado.
- Evitar estilos globales innecesarios.
- Mantener componentes aislados.

Tailwind debe generar únicamente CSS utilizado.

No deben agregarse estilos que nunca serán utilizados.

---

# Componentes

Los componentes deben diseñarse pensando en rendimiento.

Reglas:

- Componentes pequeños.
- Responsabilidad única.
- Evitar componentes monolíticos.
- Evitar lógica innecesaria en UI.

Un componente debe:

- Recibir datos.
- Renderizar contenido.
- Delegar lógica externa.

---

# Imágenes

Todas las imágenes deben optimizarse antes de producción.

Reglas:

- Preferentemente WebP.
- Peso recomendado menor a 200 KB cuando sea posible.
- Dimensiones correctas.
- Lazy loading cuando aplique.
- Evitar imágenes mayores al tamaño necesario.

---

## Imágenes críticas

Ejemplos:

- Hero.
- Imagen principal.
- Above the fold.

Utilizar:

```html
loading="eager"
```

cuando sea necesario.

---

## Imágenes secundarias

Ejemplos:

- Galerías.
- Secciones inferiores.
- Testimonios.

Utilizar:

```html
loading="lazy"
```

---

# Fuentes

Las fuentes deben optimizarse.

Reglas:

- Utilizar formatos modernos como WOFF2.
- Cargar únicamente pesos necesarios.
- Evitar múltiples familias.
- Preferir self-hosting cuando sea posible.

Utilizar:

```css
font-display: swap;
```

para evitar bloqueo de renderizado.

---

# Animaciones

Las animaciones deben priorizar experiencia sin afectar rendimiento.

Reglas:

Preferir:

```css
transform
opacity
```

Evitar animar:

- width.
- height.
- top.
- left.
- propiedades que provoquen layout recalculation.

---

# Lazy Loading

Utilizar carga diferida para recursos no críticos.

Aplicar en:

- Imágenes.
- Componentes secundarios.
- Widgets externos.

No aplicar lazy loading a:

- Hero principal.
- Contenido crítico inicial.

---

# Caching

Los recursos estáticos deben aprovechar cache.

Considerar:

- Assets con hash.
- Cache headers adecuados.
- CDN cuando aplique.

Los archivos estáticos deben poder almacenarse durante largos periodos.

---

# Compresión

La aplicación debe utilizar compresión adecuada.

Considerar:

- Brotli.
- Gzip.
- Minificación de assets.

Los archivos enviados al navegador deben estar optimizados.

---

# Dependencias externas

Las integraciones externas deben evaluarse cuidadosamente.

Ejemplos:

- Chat.
- Analytics.
- Widgets.
- Fuentes externas.

Reglas:

- Cargar únicamente cuando sea necesario.
- Evitar bloquear renderizado.
- Preferir carga diferida.

---

# Performance Budget

El proyecto debe establecer límites máximos.

Ejemplo:

JavaScript inicial:

```text
< 100 KB comprimido
```

Imágenes críticas:

```text
< 200 KB
```

Lighthouse Performance:

```text
>= 90
```

Los límites pueden ajustarse según evolución del proyecto.

---

# Monitoreo

El rendimiento debe medirse continuamente.

Validar:

- Lighthouse.
- PageSpeed Insights.
- Chrome DevTools.
- Core Web Vitals.

Las mediciones deben realizarse:

- Desarrollo.
- Pull Requests.
- Producción.

---

# Validación Automática

El proyecto debe incluir validaciones relacionadas con performance.

Debe formar parte de:

```bash
pnpm validate
```

Validaciones recomendadas:

- Tamaño de bundles.
- Imágenes optimizadas.
- Dependencias.
- Código muerto.
- Configuración Astro.

---

# Regla Final

Un sitio rápido no se consigue agregando optimizaciones al final.

La performance debe ser una consecuencia directa de una buena arquitectura.

Cada componente, dependencia y decisión técnica debe evaluarse considerando:

- Usuario.
- Navegador.
- Buscador.
- Escalabilidad futura.
