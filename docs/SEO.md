# SEO Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia **SEO First**.

El objetivo es construir una plataforma preparada para posicionamiento orgánico, donde cada decisión técnica favorezca:

- Indexación correcta.
- Comprensión del contenido por buscadores.
- Velocidad.
- Experiencia del usuario.
- Autoridad del dominio.

SEO no debe ser agregado al final del desarrollo.

Debe formar parte de la arquitectura desde el inicio.

---

# Principios SEO

Reglas principales:

1. Todo contenido importante debe existir en HTML generado.
2. Evitar depender de JavaScript para mostrar contenido indexable.
3. Priorizar páginas rápidas.
4. Mantener una estructura semántica clara.
5. Crear URLs limpias y descriptivas.
6. Evitar contenido duplicado.
7. Cada página debe tener un propósito SEO definido.

---

# Renderizado

El contenido debe generarse preferentemente mediante:

- Static Site Generation (SSG).
- HTML generado en build.

Evitar:

- Contenido cargado únicamente mediante JavaScript.
- Renderizado exclusivamente del lado cliente.
- Información importante oculta detrás de interacciones.

Google debe poder interpretar la página directamente desde el HTML.

---

# Estructura HTML

Todas las páginas deben utilizar HTML semántico.

Utilizar correctamente:

```html
<header>
  <nav>
    <main>
      <section>
        <article>
          <footer></footer>
        </article>
      </section>
    </main>
  </nav>
</header>
```

Reglas:

- Solo debe existir un H1 por página.
- Los encabezados deben respetar jerarquía.
- No utilizar encabezados únicamente por estilos visuales.

Ejemplo correcto:

```text
H1

 ├── H2
 │    └── H3
 │
 └── H2
      └── H3
```

---

# Metadata

Cada página debe definir:

- title
- meta description
- canonical
- robots
- Open Graph
- Twitter Cards

Ejemplo conceptual:

```text
Title:
Debe ser único y orientado a intención de búsqueda.

Description:
Debe explicar claramente el valor de la página.
```

No utilizar metadata genérica repetida.

---

# Title

Reglas:

- Único por página.
- Máximo enfoque en intención de búsqueda.
- Incluir palabras clave cuando sea natural.
- Evitar keyword stuffing.

---

# Meta Description

Debe:

- Ser única.
- Describir el beneficio principal.
- Incentivar el click.
- Mantener lenguaje natural.

No debe ser una lista de keywords.

---

# URLs

Las URLs deben ser:

- Cortas.
- Descriptivas.
- Permanentes.
- Amigables para usuarios y buscadores.

Correcto:

```text
/eventos-boda
/arreglos-florales
```

Incorrecto:

```text
/page?id=123
/category/product?id=45
```

---

# Arquitectura Multilenguaje SEO

El sitio debe utilizar URLs independientes por idioma.

Ejemplo:

Español:

```text
/es/
/es/eventos
/es/bodas
```

Inglés:

```text
/en/
/en/events
/en/weddings
```

Cada idioma debe ser una página indexable independiente.

---

# Hreflang

Todas las páginas multilenguaje deben implementar:

- hreflang es.
- hreflang en.
- x-default cuando corresponda.

Ejemplo conceptual:

```html
<link rel="alternate" hreflang="es" />

<link rel="alternate" hreflang="en" />
```

---

# Canonical

Cada página debe tener un canonical correcto.

Reglas:

- Una página debe apuntar a sí misma.
- Evitar contenido duplicado.
- Cada idioma debe tener su propio canonical.

---

# Sitemap

Debe generarse automáticamente.

Debe incluir:

- Todas las páginas indexables.
- Todas las versiones de idioma.
- URLs limpias.

Excluir:

- páginas internas.
- páginas temporales.
- contenido duplicado.

---

# Robots.txt

Debe configurarse correctamente.

Debe:

- Permitir rastreo del contenido público.
- Bloquear rutas internas cuando sea necesario.
- Apuntar al sitemap.

---

# Datos Estructurados (Schema.org)

Implementar JSON-LD cuando aplique.

Tipos recomendados:

## Organization

Para información general de la empresa.

---

## LocalBusiness

Para negocios con ubicación física.

Debe incluir cuando aplique:

- nombre.
- dirección.
- teléfono.
- horarios.
- área de servicio.
- redes sociales.

---

## Service

Para servicios ofrecidos.

Ejemplos:

- decoración floral.
- eventos.
- bodas.

---

## FAQ

Cuando exista una sección de preguntas frecuentes.

---

## Breadcrumb

Para mejorar comprensión de estructura.

---

# Imágenes SEO

Todas las imágenes deben:

- Tener alt descriptivo.
- Ser relevantes al contenido.
- Evitar nombres genéricos.

Incorrecto:

```text
IMG_1234.webp
```

Correcto:

```text
decoracion-floral-boda-monterrey.webp
```

---

# Core Web Vitals

SEO depende directamente del rendimiento.

Optimizar:

## Largest Contentful Paint (LCP)

Especialmente:

- Hero.
- Imagen principal.
- Fuentes.

---

## Cumulative Layout Shift (CLS)

Evitar:

- imágenes sin dimensiones.
- contenido que aparece después.
- fuentes que cambian layout.

---

## Interaction to Next Paint (INP)

Reducir:

- JavaScript.
- listeners innecesarios.
- componentes hidratados.

---

# JavaScript

Reglas:

- No utilizar JavaScript para contenido estático.
- Evitar hidratación innecesaria.
- Preferir HTML generado por Astro.

Utilizar:

```text
client:load

client:idle

client:visible
```

únicamente cuando sea necesario.

---

# Enlaces

Los enlaces deben:

- Tener texto descriptivo.
- Ser accesibles.
- Evitar "click aquí".

Correcto:

```text
Ver decoración floral para bodas
```

Incorrecto:

```text
Más información
```

---

# Contenido SEO

Cada página debe responder una intención de búsqueda.

Antes de crear una página definir:

- Keyword principal.
- Keywords secundarias.
- Intención del usuario.
- Objetivo de conversión.

---

# SEO Local

Cuando aplique, optimizar para búsquedas locales.

Ejemplos:

- Ciudad.
- Zona de servicio.
- Área geográfica.

No crear contenido artificial únicamente para incluir ubicaciones.

# Arquitectura SEO de páginas

Cada página pública debe tener una responsabilidad SEO definida.

Antes de crear una nueva página se debe definir:

- Objetivo de búsqueda.
- Keyword principal.
- Keywords secundarias.
- Intención del usuario.
- Tipo de página.
- Objetivo de conversión.

Ejemplo:

```text
Landing comercial:

Objetivo:
Capturar solicitudes de cotización.

Keyword principal:
decoración floral para bodas Monterrey.

Conversión:
Formulario / WhatsApp.
```

```text
Página informativa:

Objetivo:
Responder una intención de búsqueda.

Keyword principal:
tipos de arreglos florales para bodas.
```

No deben crearse páginas únicamente para aumentar la cantidad de URLs indexadas.

Cada página debe aportar valor real al usuario y responder una necesidad específica.

---

# Indexabilidad

Una página solamente debe ser indexable cuando cumple los requisitos mínimos:

- Tiene contenido suficiente.
- Tiene una intención SEO definida.
- Tiene metadata completa.
- No genera contenido duplicado.
- Es accesible mediante navegación interna.
- Está preparada para usuarios reales.

No deben indexarse:

- Páginas internas.
- Resultados de búsqueda.
- Filtros.
- Páginas temporales.
- Páginas incompletas.
- Entornos de prueba.

Cuando una página no deba aparecer en buscadores deberá utilizar:

```html
<meta name="robots" content="noindex" />
```

No se debe depender únicamente de `robots.txt` para evitar indexación.

---

# Enlazado Interno

La arquitectura de enlaces internos debe ayudar a usuarios y buscadores a comprender la importancia y relación entre páginas.

Reglas:

- Toda página importante debe recibir enlaces internos.
- Utilizar textos descriptivos en los enlaces.
- Evitar páginas importantes sin referencias internas.
- Mantener una jerarquía clara.

Ejemplo:

```text
Home

 ├── Bodas
 │
 ├── Eventos sociales
 │
 └── Eventos corporativos
```

Correcto:

```text
Conoce nuestra decoración floral para bodas
```

Incorrecto:

```text
Da click aquí
```

Las páginas huérfanas tienen menor probabilidad de ser descubiertas y posicionadas correctamente.

---

# Optimización SEO específica para Astro

El proyecto deberá aprovechar las capacidades nativas de Astro:

- Static Site Generation (SSG).
- HTML generado durante build.
- Islands Architecture.
- Hidratación parcial.

Reglas:

- Componentes estáticos no deben hidratarse.
- JavaScript debe utilizarse únicamente cuando agregue interacción real.
- Evitar enviar código innecesario al navegador.

Ejemplo correcto:

```astro
<Gallery />
```

Cuando el componente únicamente renderiza contenido estático.

Ejemplo incorrecto:

```astro
<Gallery client:load />
```

Cuando no existe interacción necesaria.

---

# Optimización de imágenes

Todas las imágenes deben optimizarse antes de producción.

Reglas:

- Utilizar preferentemente formato WebP.
- Mantener peso reducido.
- Evitar imágenes superiores a 200 KB cuando sea posible.
- Utilizar dimensiones correctas.
- Definir `width` y `height` para evitar CLS.
- Utilizar lazy loading cuando no sea contenido crítico.

Ejemplo:

Imagen principal:

```html
<img src="hero.webp" width="1920" height="1080" loading="eager" />
```

Imagen secundaria:

```html
<img src="gallery.webp" width="800" height="600" loading="lazy" />
```

El atributo `alt` debe describir el contenido real de la imagen.

Incorrecto:

```text
imagen1.webp
```

Correcto:

```text
decoracion-floral-boda-monterrey.webp
```

---

# Validación SEO

El proyecto debe contar con validaciones automáticas para mantener la calidad SEO.

Las validaciones deben considerar:

- Metadata completa.
- Canonical correcto.
- Hreflang válido.
- Sitemap generado.
- URLs válidas.
- Links internos correctos.
- Imágenes optimizadas.
- Ausencia de contenido duplicado.

La validación SEO deberá formar parte de:

```bash
pnpm validate
```

y ejecutarse automáticamente dentro del flujo de desarrollo y CI/CD.

---

# Validaciones Antes de Producción

Antes de publicar verificar:

- Google Search Console.
- Sitemap correcto.
- Robots correcto.
- Rich Results Test.
- Lighthouse SEO.
- PageSpeed Insights.
- Links rotos.
- Metadata.
- Canonicals.
- Hreflang.

---

# Regla Final

Una página visualmente atractiva pero invisible para buscadores no cumple el objetivo.

El diseño debe construirse sobre una base técnicamente optimizada para que usuarios y buscadores puedan entender, acceder y valorar el contenido.

# Robots.txt

Debe configurarse correctamente.

Debe:

- Permitir rastreo del contenido público.
- Bloquear rutas internas cuando sea necesario.
- Apuntar al sitemap.

No debe utilizarse `robots.txt` como único mecanismo para evitar indexación.

Para contenido que no debe aparecer en buscadores se debe utilizar:

```html id="rbt01"
<meta name="robots" content="noindex" />
```

---

# Indexabilidad

Una página solamente debe ser indexable cuando cumple los requisitos mínimos:

- Tiene contenido suficiente.
- Tiene una intención SEO definida.
- Tiene metadata completa.
- No genera contenido duplicado.
- Es accesible mediante navegación interna.
- Está preparada para usuarios reales.

No deben indexarse:

- Páginas internas.
- Resultados de búsqueda.
- Filtros.
- Páginas temporales.
- Páginas incompletas.
- Entornos de prueba.

---

# Estados SEO de páginas

Cada página deberá tener definido su estado SEO.

## Indexable

Página pública lista para buscadores.

Debe contar con:

- Contenido completo.
- Metadata.
- Canonical.
- Enlaces internos.
- Hreflang cuando aplique.

---

## No Indexable

Contenido que existe dentro del sistema pero no debe aparecer en buscadores.

Ejemplos:

- Confirmaciones.
- Páginas privadas.
- Páginas temporales.
- Flujos internos.

Debe utilizar:

```html id="rbt02"
<meta name="robots" content="noindex" />
```

---

## Redireccionada

Cuando una URL deje de existir debe manejarse mediante una redirección permanente.

Ejemplo:

```text id="rbt03"
301 Redirect
```

Nunca eliminar una URL posicionada sin estrategia de migración.

---

# Datos Estructurados (Schema.org)

Implementar JSON-LD cuando aplique.

Los datos estructurados ayudan a los buscadores a comprender mejor el contenido.

Tipos recomendados:

---

## Organization

Para información general de la empresa.

Puede incluir:

- Nombre.
- Logo.
- URL.
- Redes sociales.
- Información de contacto.

---

## LocalBusiness

Para negocios con ubicación física o área de servicio.

Debe incluir cuando aplique:

- Nombre.
- Dirección.
- Teléfono.
- Horarios.
- Área de servicio.
- Redes sociales.

---

## Service

Para servicios ofrecidos.

Ejemplos:

- Decoración floral.
- Eventos.
- Bodas.
- Diseño floral.

---

## WebSite

Para representar el sitio web principal.

Puede incluir:

- Nombre.
- URL.
- SearchAction cuando aplique.

---

## FAQ

Cuando exista una sección de preguntas frecuentes.

---

## Breadcrumb

Para mejorar la comprensión de estructura del sitio.

---

# SEO Local

Cuando aplique, optimizar para búsquedas locales.

Considerar:

- Ciudad.
- Zona de servicio.
- Área geográfica.
- Intención local del usuario.

Ejemplo:

```text id="loc01"
decoración floral bodas Monterrey
```

No crear contenido artificial únicamente para incluir ubicaciones.

Las ubicaciones deben aportar valor real al usuario.

---

# Contenido SEO

Cada página debe responder una intención de búsqueda.

Antes de crear contenido definir:

- Keyword principal.
- Keywords secundarias.
- Intención del usuario.
- Objetivo de conversión.
- Etapa del usuario dentro del proceso de compra.

El contenido debe estar creado para usuarios primero.

Las keywords deben integrarse naturalmente.

---

# Enlazado Interno

La arquitectura de enlaces internos debe ayudar a usuarios y buscadores a comprender la importancia y relación entre páginas.

Reglas:

- Toda página importante debe recibir enlaces internos.
- Utilizar textos descriptivos en los enlaces.
- Evitar páginas importantes sin referencias internas.
- Mantener una jerarquía clara.

Ejemplo:

```text id="int01"
Home

 ├── Bodas
 │
 ├── Eventos sociales
 │
 └── Eventos corporativos
```

Correcto:

```text id="int02"
Conoce nuestra decoración floral para bodas
```

Incorrecto:

```text id="int03"
Da click aquí
```

Las páginas huérfanas tienen menor probabilidad de ser descubiertas y posicionadas correctamente.

---

# Core Web Vitals

SEO depende directamente del rendimiento.

Optimizar:

---

## Largest Contentful Paint (LCP)

Especialmente:

- Hero.
- Imagen principal.
- Fuentes.
- Elementos visibles inicialmente.

---

## Cumulative Layout Shift (CLS)

Evitar:

- Imágenes sin dimensiones.
- Contenido que aparece después.
- Fuentes que cambian layout.
- Componentes que modifican posición después del render inicial.

---

## Interaction to Next Paint (INP)

Reducir:

- JavaScript.
- Listeners innecesarios.
- Componentes hidratados.
- Procesamiento en cliente.

---

# JavaScript

Reglas:

- No utilizar JavaScript para contenido estático.
- Evitar hidratación innecesaria.
- Preferir HTML generado por Astro.

Utilizar:

```text id="js01"
client:load

client:idle

client:visible
```

únicamente cuando sea necesario.

Preferencia de hidratación:

```text id="js02"
client:visible

>

client:idle

>

client:load
```

Siempre utilizar la menor cantidad de JavaScript posible.

---

# Optimización SEO específica para Astro

El proyecto deberá aprovechar las capacidades nativas de Astro:

- Static Site Generation (SSG).
- HTML generado durante build.
- Islands Architecture.
- Hidratación parcial.

Reglas:

- Componentes estáticos no deben hidratarse.
- JavaScript debe utilizarse únicamente cuando agregue interacción real.
- Evitar enviar código innecesario al navegador.

Ejemplo correcto:

```astro id="ast01"
<Gallery />
```

Cuando el componente únicamente renderiza contenido estático.

Ejemplo incorrecto:

```astro id="ast02"
<Gallery client:load />
```

Cuando no existe interacción necesaria.

---

# Imágenes SEO y Optimización

Todas las imágenes deben optimizarse antes de producción.

## SEO

Las imágenes deben:

- Tener `alt` descriptivo.
- Ser relevantes al contenido.
- Utilizar nombres descriptivos.
- Evitar nombres genéricos.

Incorrecto:

```text id="img01"
IMG_1234.webp
```

Correcto:

```text id="img02"
decoracion-floral-boda-monterrey.webp
```

---

## Performance

Reglas:

- Utilizar preferentemente formato WebP.
- Mantener peso reducido.
- Evitar imágenes superiores a 200 KB cuando sea posible.
- Utilizar dimensiones correctas.
- Definir `width` y `height`.
- Utilizar lazy loading cuando no sea contenido crítico.

Imagen principal:

```html id="img03"
<img src="hero.webp" width="1920" height="1080" loading="eager" />
```

Imagen secundaria:

```html id="img04"
<img src="gallery.webp" width="800" height="600" loading="lazy" />
```

# Fuentes Web

Las fuentes deben optimizarse para evitar impactos negativos en rendimiento y experiencia del usuario.

Las fuentes afectan directamente:

- Largest Contentful Paint (LCP).
- Cumulative Layout Shift (CLS).
- Tiempo de renderizado inicial.

Reglas:

- Utilizar únicamente pesos necesarios.
- Evitar cargar variantes no utilizadas.
- Preferir formatos modernos como WOFF2.
- Evitar proveedores externos innecesarios.
- Definir estrategia de carga.

Cuando sea posible:

- Utilizar fuentes auto-hospedadas.
- Utilizar `font-display: swap`.

Ejemplo:

```css
font-display: swap;
```

Evitar:

- Bloqueos de renderizado.
- Múltiples familias tipográficas innecesarias.
- Cargas externas que afecten rendimiento.

---

# Accesibilidad SEO

La accesibilidad forma parte de la optimización SEO.

Un sitio accesible facilita que usuarios y buscadores comprendan correctamente el contenido.

Reglas:

- Utilizar HTML semántico.
- Mantener jerarquía correcta de encabezados.
- Todas las imágenes deben tener `alt`.
- Formularios deben tener labels asociados.
- Los elementos interactivos deben ser accesibles mediante teclado.
- Mantener contraste adecuado.
- Evitar depender únicamente de color para transmitir información.

La accesibilidad debe considerarse desde el diseño inicial.

---

# Validación SEO

El proyecto debe contar con validaciones automáticas para mantener la calidad SEO.

Las validaciones deben considerar:

- Metadata completa.
- Canonical correcto.
- Hreflang válido.
- Sitemap generado.
- Robots correcto.
- URLs válidas.
- Links internos correctos.
- Imágenes optimizadas.
- Ausencia de contenido duplicado.

La validación SEO deberá formar parte de:

```bash id="seo-val01"
pnpm validate
```

y ejecutarse automáticamente dentro del flujo de desarrollo y CI/CD.

---

# Validaciones Antes de Producción

Antes de publicar cualquier página o versión del sitio se debe verificar:

## Indexación

- Google Search Console configurado.
- Sitemap enviado correctamente.
- Robots.txt validado.
- No existen páginas bloqueadas accidentalmente.
- No existen páginas importantes con `noindex`.

---

## SEO Técnico

Validar:

- Metadata.
- Canonicals.
- Hreflang.
- URLs.
- Redirecciones.
- Datos estructurados.

Herramientas recomendadas:

- Rich Results Test.
- Lighthouse SEO.
- PageSpeed Insights.

---

## Contenido

Validar:

- Intención de búsqueda.
- Keywords objetivo.
- Calidad del contenido.
- Enlaces internos.
- Ausencia de contenido duplicado.

---

## Performance

Validar:

- Core Web Vitals.
- Tiempo de carga.
- Tamaño de JavaScript.
- Optimización de imágenes.
- Carga de fuentes.

---

# Monitoreo posterior al lanzamiento

Después de publicar cambios SEO importantes se debe monitorear:

- Indexación.
- Errores de rastreo.
- URLs no encontradas.
- Problemas de canonical.
- Problemas de hreflang.
- Cambios de posicionamiento.
- Rendimiento.

Herramientas recomendadas:

- Google Search Console.
- Analytics.
- PageSpeed Insights.

---

# Reglas de mantenimiento SEO

El SEO debe mantenerse durante todo el ciclo de vida del proyecto.

Nuevas funcionalidades deberán considerar:

- Impacto SEO.
- Nuevas URLs.
- Metadata.
- Indexabilidad.
- Rendimiento.
- Experiencia del usuario.

No debe agregarse contenido o funcionalidades públicas sin revisar su impacto SEO.

---

# Checklist para nuevas páginas

Toda nueva página pública debe cumplir:

```text
Crear página

↓

Definir intención SEO

↓

Definir keywords

↓

Crear contenido

↓

Crear metadata

↓

Crear URL

↓

Agregar enlaces internos

↓

Agregar datos estructurados cuando aplique

↓

Validar SEO

↓

Publicar
```

---

# Regla Final

Una página visualmente atractiva pero invisible para buscadores no cumple el objetivo.

El diseño debe construirse sobre una base técnicamente optimizada para que:

- Los usuarios puedan encontrarla.
- Los buscadores puedan comprenderla.
- El contenido pueda posicionarse.
- La experiencia sea rápida y accesible.

SEO no es una etapa posterior al desarrollo.

SEO es una propiedad fundamental de la arquitectura del producto.
