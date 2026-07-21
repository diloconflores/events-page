# Localization

## Objetivo

La localización es uno de los pilares arquitectónicos del proyecto.

No se limita únicamente a traducir textos, sino que define cómo el sistema adapta toda la experiencia al idioma seleccionado por el usuario.

La arquitectura deberá permitir soportar una cantidad ilimitada de idiomas sin modificar la implementación de los componentes, páginas o layouts existentes.

Toda la localización deberá centralizarse dentro del módulo `src/i18n`.

La solución deberá ser:

- Escalable.
- Tipada.
- Fácil de mantener.
- Compatible con SEO internacional.
- Preparada para automatización y validaciones.
- Independiente del contenido y de la interfaz de usuario.

La incorporación de un nuevo idioma deberá consistir únicamente en registrar el idioma, agregar sus recursos localizados y ejecutar las validaciones correspondientes.

No deberá ser necesario modificar componentes, layouts ni lógica de negocio.

## Principios

Toda la localización del proyecto deberá respetar los siguientes principios arquitectónicos.

### Single Source of Truth

Toda la información localizada deberá existir en un único lugar.

Está prohibido duplicar traducciones, rutas o metadata dentro del código fuente.

---

### Separation of Concerns

Cada responsabilidad deberá mantenerse completamente aislada.

Las traducciones, las rutas, la metadata y la configuración regional deberán almacenarse de forma independiente.

---

### Componentes Agnósticos al Idioma

Los componentes nunca deberán conocer el idioma activo.

Los componentes únicamente recibirán información mediante propiedades (`props`).

Incorrecto:

```ts
t.hero.title;
```

Correcto:

```astro
<Hero
    title={t.hero.title}
    subtitle={t.hero.subtitle}
/>
```

Esto garantiza que cualquier componente pueda reutilizarse en diferentes páginas sin depender de un namespace específico.

---

### Escalabilidad

La arquitectura deberá diseñarse pensando en una cantidad ilimitada de idiomas.

Español e inglés representan únicamente las primeras implementaciones.

---

### Localización Completa

Todo contenido público deberá poder localizarse.

Incluye, entre otros:

- Traducciones.
- Rutas.
- Metadata.
- Open Graph.
- Twitter Cards.
- Sitemap.
- Canonical.
- hreflang.
- Fechas.
- Horarios.
- Monedas.
- Formatos numéricos.

No deberán existir elementos visibles al usuario que permanezcan hardcodeados.

---

### Validación Automática

Toda modificación relacionada con localización deberá ser validada automáticamente antes de permitir un commit.

La integridad del sistema de localización no dependerá de revisiones manuales.

## Arquitectura

Toda la localización deberá vivir exclusivamente dentro de `src/i18n`.

La organización deberá realizarse por responsabilidad y no por idioma.

Estructura base:

```text
src/
└── i18n/
    ├── translations/
    ├── routes/
    ├── metadata/
    ├── config.ts
    ├── index.ts
    └── types.d.ts
```

Cada módulo tendrá una responsabilidad claramente definida.

| Módulo          | Responsabilidad                 |
| --------------- | ------------------------------- |
| `translations/` | Textos visibles para el usuario |
| `routes/`       | Slugs localizados               |
| `metadata/`     | Metadata SEO localizada         |
| `config.ts`     | Registro de idiomas soportados  |
| `index.ts`      | Fachada pública del sistema     |
| `types.d.ts`    | Tipado compartido               |

Los componentes nunca deberán acceder directamente a los archivos JSON.

Toda interacción con el sistema de localización deberá realizarse a través de la API pública definida por `index.ts`.

## Estructura de Carpetas

La estructura deberá organizarse por dominio funcional para evitar archivos excesivamente grandes y facilitar el mantenimiento.

Ejemplo:

```text
src/
└── i18n/
    ├── translations/
    │   ├── common/
    │   │   ├── es.json
    │   │   └── en.json
    │   │
    │   ├── navigation/
    │   │   ├── es.json
    │   │   └── en.json
    │   │
    │   ├── hero/
    │   │   ├── es.json
    │   │   └── en.json
    │   │
    │   ├── footer/
    │   │   ├── es.json
    │   │   └── en.json
    │   │
    │   └── contact/
    │       ├── es.json
    │       └── en.json
    │
    ├── routes/
    │   ├── es.json
    │   └── en.json
    │
    ├── metadata/
    │   ├── pages/
    │   │   ├── home/
    │   │   │   ├── es.json
    │   │   │   └── en.json
    │   │   ├── weddings/
    │   │   │   ├── es.json
    │   │   │   └── en.json
    │   │   └── contact/
    │   │       ├── es.json
    │   │       └── en.json
    │   │
    │   └── shared/
    │       ├── es.json
    │       └── en.json
    │
    ├── config.ts
    ├── index.ts
    └── types.d.ts
```

### Reglas

- Cada dominio funcional deberá mantener sus propias traducciones.
- No deberán existir archivos JSON gigantes con todo el contenido del proyecto.
- Cada idioma deberá tener exactamente la misma estructura de carpetas.
- La ausencia de un archivo localizado deberá provocar un error durante las validaciones.
- Toda la estructura de localización deberá ser verificable mediante:

```bash
pnpm validate:i18n
```

Este comando deberá ejecutarse automáticamente dentro del flujo general:

```bash
pnpm validate
```

El pre-commit deberá ejecutar el flujo general de validación, garantizando que pnpm validate:i18n sea ejecutado antes de permitir un commit.

## Idiomas

### Objetivo

El sistema de idiomas debe permitir administrar múltiples idiomas sin modificar la lógica existente del proyecto.

Los idiomas soportados por la aplicación deberán estar definidos mediante un **Language Registry**, el cual funcionará como la única fuente de verdad para cualquier operación relacionada con internacionalización.

El sistema deberá permitir:

- Registrar nuevos idiomas.
- Activar o desactivar idiomas.
- Definir configuraciones regionales.
- Gestionar formatos específicos por idioma.
- Resolver correctamente SEO multilenguaje.
- Preparar el proyecto para idiomas futuros.

Agregar un nuevo idioma no deberá requerir modificar componentes, layouts o lógica de negocio.

---

## Language Registry

El Language Registry deberá vivir en:

```text
src/i18n/config.ts
```

Este archivo será el punto central donde se registran todos los idiomas disponibles.

Ejemplo conceptual:

```ts
export const locales = {
  es: {
    code: "es",
    name: "Español",
    nativeName: "Español",
    enabled: true,
    default: true,
    direction: "ltr",
    dateLocale: "es",
  },

  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    enabled: true,
    default: false,
    direction: "ltr",
    dateLocale: "en",
  },
} as const;
```

---

### Propiedades del idioma

Cada idioma registrado deberá definir las siguientes propiedades.

---

#### code

Código identificador del idioma.

Debe seguir estándares internacionales ISO.

Ejemplos:

```text
es
en
fr
de
pt
```

Este valor será utilizado para:

- URLs.
- Hreflang.
- Resolución del idioma.
- Carga de recursos.

---

#### name

Nombre del idioma utilizado internamente.

Ejemplo:

```ts
name: "English";
```

Debe estar escrito en el idioma principal de administración del sistema.

---

#### nativeName

Nombre del idioma mostrado al usuario.

Ejemplo:

```ts
nativeName: "Español";
```

o:

```ts
nativeName: "Deutsch";
```

Debe respetar cómo cada idioma se identifica a sí mismo.

Este valor será utilizado principalmente en:

- Selector de idioma.
- Menús.
- Interfaces públicas.

---

#### enabled

Indica si el idioma está disponible públicamente.

Ejemplo:

```ts
enabled: true;
```

Un idioma puede existir dentro del proyecto pero permanecer desactivado.

Casos de uso:

- Traducciones en preparación.
- Lanzamiento gradual.
- Pruebas internas.

Un idioma con:

```ts
enabled: false;
```

no deberá:

- Aparecer en el selector de idioma.
- Generar rutas públicas.
- Aparecer en sitemap.
- Generar hreflang.

---

#### default

Define el idioma principal del proyecto.

Ejemplo:

```ts
default: true
```

Reglas:

- Solo puede existir un idioma principal.
- El idioma principal será la referencia para validaciones.
- Será la fuente original del contenido.

Actualmente:

```text
Español (es)
```

---

#### direction

Define la dirección de escritura del idioma.

Valores permitidos:

```ts
ltr;
rtl;
```

Ejemplos:

Idiomas occidentales:

```ts
direction: "ltr";
```

Idiomas como árabe o hebreo:

```ts
direction: "rtl";
```

Esta propiedad permitirá preparar el proyecto para idiomas con diferente dirección visual sin modificar componentes.

---

#### dateLocale

Define el locale utilizado por Day.js.

Ejemplo:

```ts
dateLocale: "es";
```

Toda operación relacionada con fechas deberá utilizar esta configuración.

No deberá existir lógica como:

```ts
if(language === "es")
```

La resolución deberá depender del Language Registry.

---

### Tipado del Language Registry

El registro deberá estar completamente tipado.

Debe existir un tipo centralizado:

```text
src/i18n/types.d.ts
```

No se permitirá crear tipos duplicados relacionados con idiomas.

Ejemplo:

```ts
export type Locale = keyof typeof locales;
```

Todos los módulos que necesiten conocer un idioma deberán consumir este tipo.

---

## Resolución del idioma activo

La aplicación deberá contar con una única estrategia para determinar el idioma actual.

Los componentes no deberán:

- Leer directamente la URL.
- Detectar idioma manualmente.
- Comparar strings.

Incorrecto:

```ts
if(path.includes("/en"))
```

Correcto:

```ts
const locale = getCurrentLocale();
```

La resolución deberá estar centralizada dentro del módulo de internacionalización.

---

## Fallback de idioma

El sistema deberá definir un idioma fallback.

El fallback será siempre el idioma marcado como:

```ts
default: true
```

Actualmente:

```text
es
```

Reglas:

- Nunca mostrar claves internas al usuario.
- Nunca mostrar contenido vacío.
- Registrar advertencias durante desarrollo cuando falte una traducción.
- Utilizar fallback únicamente cuando sea necesario.

Ejemplo incorrecto:

```text
hero.title
```

Debe evitarse completamente.

---

## Agregar un nuevo idioma

Agregar un idioma deberá seguir este flujo:

### Paso 1

Registrar el idioma:

```ts
fr: {
  code: "fr",
  name: "Français",
  nativeName: "Français",
  enabled: false,
  default: false,
  direction: "ltr",
  dateLocale: "fr",
}
```

---

### Paso 2

Crear los recursos localizados:

```text
src/i18n/

translations/

routes/

metadata/
```

---

### Paso 3

Ejecutar validaciones:

```bash
pnpm validate:i18n
```

La validación deberá confirmar que el idioma está completo antes de habilitarlo.

---

## Reglas de Integridad

El sistema deberá validar:

- Solo existe un idioma default.
- Todos los idiomas tienen código válido.
- Todos los idiomas tienen archivos correspondientes.
- Todos los idiomas habilitados tienen traducciones completas.
- Todos los idiomas habilitados tienen rutas completas.
- Todos los idiomas habilitados tienen metadata completa.

---

## Filosofía

Los idiomas no son una configuración temporal.

Son una parte estructural del sistema.

El proyecto debe diseñarse pensando que:

- Español e inglés son solo los primeros idiomas.
- Nuevos mercados pueden agregarse posteriormente.
- La incorporación de idiomas no debe generar deuda técnica.
- La UI debe permanecer completamente independiente del idioma.

## Sistema de Traducciones

### Objetivo

El sistema de traducciones es responsable únicamente de administrar contenido textual localizado.

Su responsabilidad es proporcionar textos según el idioma activo, manteniendo completamente separadas:

- La interfaz de usuario.
- El contenido.
- La lógica de negocio.
- La estructura SEO.

Los componentes no deberán contener textos hardcodeados.

Todo texto visible para el usuario deberá provenir del sistema de traducciones.

---

### Organización

Las traducciones deberán organizarse por dominio funcional y no por idioma.

Estructura:

```text
src/
└── i18n/
    └── translations/

        ├── common/
        │   ├── es.json
        │   └── en.json
        │
        ├── navigation/
        │   ├── es.json
        │   └── en.json
        │
        ├── hero/
        │   ├── es.json
        │   └── en.json
        │
        ├── footer/
        │   ├── es.json
        │   └── en.json
        │
        ├── forms/
        │   ├── es.json
        │   └── en.json
        │
        └── faq/
            ├── es.json
            └── en.json
```

La organización por dominio permite:

- Evitar archivos excesivamente grandes.
- Cargar únicamente las traducciones necesarias.
- Mantener ownership por funcionalidad.
- Facilitar futuras traducciones.

---

### Separación de responsabilidades

Los archivos de traducción deberán contener únicamente contenido.

Permitido:

```json
{
  "title": "Diseño floral para eventos",
  "subtitle": "Creamos experiencias memorables"
}
```

No permitido:

```json
{
  "route": "/bodas",
  "title": "Bodas",
  "metadata": {
    "description": "..."
  }
}
```

Las rutas y metadata tienen módulos independientes.

---

### Namespaces

Todas las traducciones deberán utilizar namespaces.

Ejemplo:

```text
translations/
├── hero/
├── footer/
└── navigation/
```

El acceso deberá reflejar el contexto:

```ts
t.hero.title;

t.footer.copyright;

t.navigation.home;
```

No deberán existir claves globales ambiguas.

Incorrecto:

```ts
t.title;
```

Correcto:

```ts
t.hero.title;
```

---

### Convención de claves

Las claves deberán:

- Ser descriptivas.
- Utilizar camelCase.
- Evitar abreviaciones.
- Mantener contexto.

Correcto:

```json
{
  "primaryButtonLabel": "Solicitar cotización"
}
```

Incorrecto:

```json
{
  "btn1": "Solicitar cotización"
}
```

---

### Componentes y traducciones

Los componentes deberán ser independientes del sistema de traducción.

Un componente no debe conocer:

- El idioma actual.
- El namespace donde vive el contenido.
- La estructura de archivos JSON.

Incorrecto:

```astro
<h1>
  {t.hero.title}
</h1>
```

Correcto:

```astro
<Hero
  title={content.title}
  subtitle={content.subtitle}
/>
```

El componente únicamente recibe información mediante props.

---

### Carga de traducciones

El sistema deberá cargar únicamente las traducciones necesarias.

No deberá cargarse todo el árbol de traducciones cuando una página solo necesita una parte.

Ejemplo:

Una página de contacto deberá cargar:

```text
contact/
common/
navigation/
```

No:

```text
hero/
gallery/
services/
faq/
contact/
footer/
```

---

### Tipado

Toda traducción deberá estar completamente tipada.

Los tipos deberán vivir exclusivamente en:

```text
src/i18n/types.d.ts
```

No se permitirá crear interfaces o tipos duplicados dentro de componentes.

El sistema deberá detectar:

- Claves inexistentes.
- Acceso incorrecto.
- Traducciones incompletas.

---

### Traducciones faltantes

Durante desarrollo:

Una traducción faltante deberá generar error o warning visible.

Ejemplo:

```text
Missing translation:

hero.primaryButtonLabel

Language:

en
```

En producción:

Nunca deberá mostrarse la clave interna:

Incorrecto:

```text
hero.primaryButtonLabel
```

Debe utilizarse el fallback definido por el Language Registry.

---

### Variables dinámicas

Las traducciones podrán recibir parámetros.

Ejemplo:

```json
{
  "welcome": "Hola {{name}}"
}
```

Uso:

```ts
t.common.welcome({
  name: "Raymundo",
});
```

No deberá construirse texto mediante concatenaciones.

Incorrecto:

```ts
"Hola " + name;
```

---

### Validación

Toda modificación de traducciones deberá validarse mediante:

```bash
pnpm validate:i18n
```

La validación deberá comprobar:

- JSON válido.
- Claves faltantes.
- Claves adicionales.
- Estructuras inconsistentes.
- Idiomas incompletos.
- Archivos sin registrar.

Una falla deberá impedir el commit.

## Sistema de Rutas

### Objetivo

Las rutas forman parte de la estrategia de localización y SEO del proyecto.

Cada idioma deberá contar con URLs propias y optimizadas para su mercado.

Las rutas deberán ser consideradas contenido localizado, no únicamente configuración técnica.

---

### Principio principal

Toda URL pública deberá estar localizada.

Ejemplo:

Español:

```text
/es/bodas
```

Inglés:

```text
/en/weddings
```

No deberá utilizarse una ruta traducida parcialmente.

Incorrecto:

```text
/en/bodas
```

---

### Organización

Las rutas deberán vivir dentro de:

```text
src/i18n/routes/
```

Estructura:

```text
routes/

├── es.json
└── en.json
```

Ejemplo:

es.json

```json
{
  "home": "",
  "weddings": "bodas",
  "contact": "contacto",
  "gallery": "galeria"
}
```

en.json

```json
{
  "home": "",
  "weddings": "weddings",
  "contact": "contact",
  "gallery": "gallery"
}
```

---

### Route Registry

Las rutas deberán identificarse mediante una clave común.

Ejemplo:

```ts
weddings;
```

No mediante el slug.

Incorrecto:

```ts
"/bodas";
```

Correcto:

```ts
routes.weddings;
```

La clave representa la página.

El slug depende del idioma.

---

### Single Source of Truth

Está prohibido escribir URLs manualmente dentro del proyecto.

Incorrecto:

```astro
<a href="/bodas">
```

Correcto:

```astro
<a href={getLocalizedRoute("weddings")}>
```

Todas las URLs deberán generarse mediante el sistema de rutas.

---

### Relación entre idiomas

Cada página deberá mantener una relación uno a uno entre idiomas.

Ejemplo:

```text
es:

/bodas


en:

/weddings
```

La página representa el mismo recurso localizado.

Esta relación será utilizada para generar:

- Selector de idioma.
- hreflang.
- Canonical.
- Sitemap.

---

### Slugs SEO

Todos los slugs deberán cumplir:

- Minúsculas.
- Sin acentos.
- Sin caracteres especiales.
- Separados por guiones.
- Descriptivos.
- Cortos.

Correcto:

```text
corporate-events
```

Incorrecto:

```text
CorporateEvents2026
```

---

### Cambio de idioma

Cuando un usuario cambie de idioma:

Debe navegar hacia la página equivalente.

Ejemplo:

```text
/es/bodas

↓

/en/weddings
```

Si la página equivalente no existe:

El sistema deberá aplicar el comportamiento definido por la estrategia SEO.

Nunca deberá enviar siempre al home.

---

### Validación

Las rutas deberán validarse mediante:

```bash
pnpm validate:i18n
```

El validador deberá comprobar:

- Todas las páginas tienen ruta en todos los idiomas habilitados.
- No existen slugs duplicados.
- No existen rutas inválidas.
- No existen rutas sin traducción.
- No existen idiomas habilitados sin rutas completas.

---

### SEO

El sistema de rutas deberá permitir generar automáticamente:

- Canonical.
- hreflang.
- Sitemap.
- Breadcrumbs.
- Navegación localizada.

Las URLs serán parte fundamental del SEO internacional.

---

### Agregar una nueva página

Agregar una nueva página deberá requerir:

1. Crear la página.
2. Registrar su clave.
3. Agregar sus slugs localizados.
4. Agregar metadata.
5. Ejecutar:

```bash
pnpm validate:i18n
```

No deberá ser necesario modificar múltiples componentes para registrar una nueva ruta.

## Metadata Localizada

### Objetivo

La metadata forma parte de la estrategia de localización y SEO internacional.

Cada idioma deberá contar con metadata propia y nunca deberá reutilizar contenido de otro idioma.

La metadata localizada deberá permitir que cada versión del sitio tenga:

- Título optimizado para buscadores.
- Descripción localizada.
- Open Graph localizado.
- Twitter Cards localizadas.
- Información estructurada localizada cuando aplique.
- Canonical correcto.
- Hreflang correcto.

La metadata deberá tratarse como contenido localizado, no como configuración técnica.

---

### Organización

La metadata deberá vivir dentro de:

```text
src/i18n/metadata/
```

La estructura deberá organizarse por página o dominio funcional.

Ejemplo:

```text
metadata/

├── pages/
│
│   ├── home/
│   │   ├── es.json
│   │   └── en.json
│   │
│   ├── weddings/
│   │   ├── es.json
│   │   └── en.json
│   │
│   └── contact/
│       ├── es.json
│       └── en.json
│
└── shared/
    ├── es.json
    └── en.json
```

---

### Separación entre contenido y metadata

La metadata no deberá mezclarse con las traducciones generales.

Incorrecto:

```json
{
  "title": "Bodas elegantes",
  "description": "..."
}
```

dentro de:

```text
translations/
```

Correcto:

```text
metadata/pages/weddings/es.json
```

---

### Estructura de Metadata

Cada página deberá definir como mínimo:

```json
{
  "title": "Decoración floral para bodas",
  "description": "Diseñamos experiencias florales para bodas inolvidables."
}
```

Cuando aplique podrá incluir:

```json
{
  "title": "",
  "description": "",
  "openGraph": {
    "title": "",
    "description": "",
    "image": ""
  },
  "twitter": {
    "title": "",
    "description": "",
    "image": ""
  }
}
```

---

### Relación con Routes

Cada ruta pública deberá tener una metadata equivalente.

Ejemplo:

```text
routes/es.json

weddings: bodas
```

Debe existir:

```text
metadata/pages/weddings/es.json
```

La clave de página será la relación entre:

- Ruta.
- Metadata.
- Traducciones.
- Sitemap.
- SEO.

---

### Idiomas

Cada idioma deberá tener metadata independiente.

Ejemplo:

Español:

```json
{
  "title": "Bodas elegantes en Monterrey"
}
```

Inglés:

```json
{
  "title": "Elegant wedding floral design in Monterrey"
}
```

No se permite traducir automáticamente en tiempo de ejecución.

---

### Canonical y Hreflang

La metadata localizada deberá permitir generar correctamente:

- Canonical.
- Alternate URLs.
- Hreflang.

Ejemplo:

```html
<link rel="alternate" hreflang="es" href="/es/bodas" />

<link rel="alternate" hreflang="en" href="/en/weddings" />
```

---

### Validación

La metadata deberá validarse mediante:

```bash
pnpm validate:i18n
```

El validador deberá comprobar:

- Toda página tiene metadata.
- Todos los idiomas habilitados tienen metadata.
- No existen páginas sin título.
- No existen páginas sin descripción.
- Las estructuras coinciden entre idiomas.

---

## Configuración de Idiomas

### Objetivo

La configuración de idiomas define cómo el sistema carga, administra y expone los idiomas disponibles.

Esta configuración deberá centralizar toda la lógica relacionada con:

- Idiomas soportados.
- Idioma principal.
- Recursos disponibles.
- Configuración regional.
- Estado de publicación.

---

### Fuente de configuración

Toda la configuración deberá provenir del:

```text
src/i18n/config.ts
```

No deberán existir listas de idiomas duplicadas en diferentes partes del proyecto.

Incorrecto:

```ts
const languages = ["es", "en"];
```

dentro de un componente.

Correcto:

```ts
import { locales } from "@/i18n/config";
```

---

### Idiomas disponibles

La configuración deberá diferenciar entre:

- Idiomas registrados.
- Idiomas habilitados.
- Idiomas visibles públicamente.

Un idioma puede existir en el sistema sin estar publicado.

Ejemplo:

```ts
fr: {
  enabled: false;
}
```

---

### Carga de recursos

Los recursos deberán cargarse según el idioma activo.

No deberá cargarse contenido innecesario.

Ejemplo:

```text
Usuario visita:

/en/weddings


Carga:

translations/weddings/en.json

metadata/weddings/en.json

routes/en.json
```

No deberá cargar:

```text
es.json
fr.json
de.json
```

---

### Configuración Regional

Cada idioma deberá definir sus configuraciones regionales.

Incluye:

- Locale de fechas.
- Formato numérico.
- Moneda.
- Dirección del texto.

Estas configuraciones deberán consumirse desde el Language Registry.

---

### Extensibilidad

Agregar un idioma nuevo no deberá requerir modificar la configuración existente.

El flujo esperado:

1. Registrar idioma.
2. Crear recursos.
3. Validar.
4. Habilitar.

---

### Validación

La configuración deberá validarse mediante:

```bash
pnpm validate:i18n
```

Debe comprobar:

- Idiomas correctamente registrados.
- Un único idioma default.
- Recursos existentes.
- Configuración válida.

---

## Resolución del Idioma

### Objetivo

La resolución del idioma determina qué idioma utilizará la aplicación para mostrar contenido localizado.

Esta lógica deberá estar completamente centralizada.

Los componentes y páginas no deberán resolver idiomas manualmente.

---

### Fuente principal

El idioma deberá resolverse principalmente mediante la URL.

Ejemplo:

```text
/es/bodas

locale = es
```

```text
/en/weddings

locale = en
```

La URL será la fuente principal porque garantiza:

- Indexación correcta.
- Compartibilidad.
- SEO internacional.
- Consistencia.

---

### No utilizar detección automática como fuente principal

No deberá utilizarse:

- Idioma del navegador.
- Ubicación del usuario.
- Cookies.

como mecanismo principal de resolución.

Ejemplo incorrecto:

Usuario visita:

```text
/es/bodas
```

y el sistema cambia automáticamente a:

```text
/en/weddings
```

porque su navegador está en inglés.

---

### API de Resolución

La aplicación deberá contar con una única API para obtener el idioma actual.

Ejemplo conceptual:

```ts
const locale = getCurrentLocale();
```

Los componentes no deberán leer:

- pathname.
- headers.
- cookies.

directamente.

---

### Fallback

Si no es posible determinar el idioma:

Se utilizará el idioma definido como:

```ts
default: true
```

Actualmente:

```text
es
```

---

### Idiomas inválidos

Si un usuario accede a:

```text
/xx/bodas
```

donde `xx` no existe:

El sistema deberá aplicar la estrategia definida por routing.

No deberá renderizar contenido sin idioma definido.

---

### Persistencia del idioma

El sistema podrá almacenar preferencias del usuario únicamente como ayuda adicional.

La URL siempre tendrá prioridad.

---

### Validación

La resolución del idioma deberá garantizar:

- Solo idiomas registrados pueden ser utilizados.
- Solo idiomas habilitados pueden ser públicos.
- Todas las rutas tienen un idioma válido.
- Los componentes reciben siempre un idioma válido.

## Consumo desde Componentes

### Objetivo

Los componentes deberán consumir contenido localizado sin conocer la implementación interna del sistema de internacionalización.

La localización deberá ser una dependencia externa del componente.

Los componentes deberán ser:

- Reutilizables.
- Independientes del idioma.
- Independientes de la estructura de archivos.
- Fáciles de probar.
- Compatibles con cualquier idioma soportado.

---

### Principio de separación

Los componentes no deberán encargarse de:

- Resolver el idioma actual.
- Leer la URL.
- Cargar archivos JSON.
- Seleccionar traducciones.
- Construir rutas localizadas.

Estas responsabilidades pertenecen exclusivamente a la capa de localización.

---

### Flujo correcto

El flujo esperado será:

```text id="l4d6m5"
Página/Layout

        ↓

Localization Layer

        ↓

Contenido localizado

        ↓

Component

        ↓

Render UI
```

El componente únicamente recibe información preparada.

---

### Componentes agnósticos

Los componentes no deberán acceder directamente al sistema i18n.

Incorrecto:

```astro id="8d4ph6"
---
import { t } from "@/i18n";

const title = t.hero.title;
---

<h1>
  {title}
</h1>
```

Este componente queda acoplado:

- Al idioma.
- Al namespace.
- A la estructura de traducciones.

---

Correcto:

```astro id="9gq0k5"
---
interface Props {
  title: string;
  subtitle: string;
}

const {
  title,
  subtitle
} = Astro.props;
---

<h1>
  {title}
</h1>

<p>
  {subtitle}
</p>
```

El componente solamente conoce sus datos de entrada.

---

# Responsabilidad de páginas y layouts

Las páginas y layouts serán responsables de obtener contenido localizado.

Ejemplo conceptual:

```astro id="h29qwj"
---
const content = await getTranslations({
  locale,
  namespace: "hero"
});
---

<Hero
  title={content.title}
  subtitle={content.subtitle}
/>
```

La página actúa como capa de composición.

---

# Props localizadas

Las props deberán recibir contenido ya localizado.

Ejemplo:

```astro id="4c9tq2"
<Navigation
  items={navigationItems}
/>
```

No:

```astro id="m5o5u7"
<Navigation
  locale="es"
/>
```

Los componentes no deben resolver localización internamente.

---

# Componentes reutilizables

Un mismo componente deberá poder utilizarse con diferentes idiomas.

Ejemplo:

```astro id="6x5rkl"
<Hero
  title="Decoración floral para bodas"
/>
```

o:

```astro id="qf7s1t"
<Hero
  title="Wedding floral decoration"
/>
```

El componente no debe cambiar.

---

# Datos localizados externos

Cuando un componente requiera información dinámica localizada, deberá recibirla mediante tipos definidos.

Ejemplo:

```ts id="t0qxpy"
interface HeroContent {
  title: string;
  subtitle: string;
  buttonLabel: string;
}
```

Todos los tipos deberán vivir en:

```text id="8rqk8p"
types.d.ts
```

No crear interfaces aisladas dentro de componentes.

---

# Rutas dentro de componentes

Los componentes tampoco deberán construir URLs manualmente.

Incorrecto:

```astro id="34l4kx"
<a href="/bodas">
```

Correcto:

```astro id="7v3p7p"
<a href={routes.weddings}>
```

Las rutas deberán resolverse mediante el sistema definido en:

```text id="bj80o1"
src/i18n/routes
```

---

# Selector de idioma

El selector de idioma será un componente de infraestructura.

Su responsabilidad será:

- Mostrar idiomas disponibles.
- Obtener idiomas desde Language Registry.
- Cambiar hacia la ruta equivalente.

No deberá contener idiomas hardcodeados.

Incorrecto:

```ts id="q9v8bx"
["Español", "English"];
```

Correcto:

```ts id="7x2sde"
getAvailableLocales();
```

---

# Traducciones dentro de componentes atómicos

Los componentes atómicos no deberán consumir traducciones.

Ejemplo:

Botón:

```text id="43m6j0"
Button
```

No debe saber:

```text id="qu8m3h"
Solicitar cotización
```

Debe recibir:

```astro id="cg6ntq"
<Button>
  {label}
</Button>
```

La traducción pertenece al nivel superior.

---

# Componentes de dominio

Los componentes de dominio pueden recibir estructuras completas localizadas.

Ejemplo:

```astro id="a9z4px"
<TestimonialCard
  testimonial={testimonial}
/>
```

Donde:

```ts id="l1h7k8"
testimonial = {
  author,
  role,
  message,
};
```

Todos los valores ya deben estar localizados.

---

# Validación

El sistema deberá validar que:

- No existen textos hardcodeados visibles.
- Los componentes no importan directamente JSON de traducciones.
- Las rutas no están escritas manualmente.
- Los tipos de contenido localizado están centralizados.

La validación deberá ejecutarse mediante:

```bash id="6b3w7f"
pnpm validate:i18n
```

---

# Regla final

Los componentes representan la interfaz.

La capa de localización representa el contenido.

Ambas responsabilidades deben permanecer separadas.

Un componente correctamente diseñado debería poder utilizarse en cualquier idioma sin modificación alguna.

## SEO Multilenguaje

### Objetivo

El sistema de localización deberá estar diseñado para generar una experiencia SEO correcta para cada idioma soportado.

Cada idioma deberá considerarse una versión independiente del sitio, con:

- URL propia.
- Metadata propia.
- Contenido localizado.
- Canonical propio.
- Hreflang correcto.
- Sitemap independiente.

La internacionalización no deberá depender únicamente de traducciones visibles; deberá contemplar todos los elementos necesarios para que los motores de búsqueda entiendan la relación entre versiones lingüísticas.

---

# URLs localizadas

Cada idioma deberá utilizar URLs propias.

Ejemplo:

Español:

```text
/es/bodas
```

Inglés:

```text
/en/weddings
```

No se deberán utilizar parámetros para identificar idiomas.

Incorrecto:

```text
/bodas?lang=en
```

Correcto:

```text
/en/weddings
```

Las URLs deberán ser:

- Permanentes.
- Indexables.
- Amigables para buscadores.
- Traducidas al idioma correspondiente.

---

# Canonical

Cada página deberá definir un canonical apuntando a su propia versión localizada.

Ejemplo:

Página:

```text
/en/weddings
```

Debe generar:

```html
<link rel="canonical" href="https://example.com/en/weddings" />
```

No deberá apuntar al idioma principal.

Incorrecto:

```html
<link rel="canonical" href="https://example.com/es/bodas" />
```

Cada idioma representa una página independiente.

---

# Hreflang

Cada página localizada deberá declarar sus equivalentes en otros idiomas.

Ejemplo:

Página:

```text
/es/bodas
```

Debe generar:

```html
<link rel="alternate" hreflang="es" href="https://example.com/es/bodas" />

<link rel="alternate" hreflang="en" href="https://example.com/en/weddings" />
```

---

# Reglas de Hreflang

El sistema deberá garantizar:

- Cada idioma habilitado tiene una referencia válida.
- Las URLs apuntan a páginas existentes.
- No existen referencias rotas.
- La relación es bidireccional.

Ejemplo incorrecto:

Español apunta a inglés:

```text
/es/bodas → /en/weddings
```

pero inglés no apunta a español.

Esto genera una implementación incompleta.

---

# x-default

Cuando aplique, deberá generarse:

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/es" />
```

El idioma marcado como `default` dentro del Language Registry será utilizado como referencia.

---

# Metadata localizada

Cada idioma deberá tener metadata independiente.

Incluye:

- Title.
- Description.
- Open Graph.
- Twitter Cards.
- Structured Data cuando aplique.

Ejemplo:

Español:

```text
Decoración floral para bodas en Monterrey
```

Inglés:

```text
Wedding floral decoration in Monterrey
```

No se deberá traducir metadata dinámicamente en runtime.

---

# Open Graph localizado

Los elementos sociales deberán respetar el idioma actual.

Ejemplo:

```html
<meta property="og:title" />
<meta property="og:description" />
<meta property="og:image" />
```

Cada versión deberá mostrar información correspondiente al idioma compartido.

---

# Sitemap Multilenguaje

El sitemap deberá generarse considerando únicamente idiomas habilitados.

Debe incluir:

- Todas las rutas públicas.
- Todas las versiones lingüísticas.
- Relaciones entre páginas.

Ejemplo conceptual:

```xml
<url>
  <loc>
    https://example.com/es/bodas
  </loc>

  <xhtml:link
    hreflang="en"
    href="https://example.com/en/weddings"
  />
</url>
```

---

# Indexación de idiomas

Un idioma solamente deberá ser indexable cuando:

- Está habilitado.
- Tiene traducciones completas.
- Tiene rutas completas.
- Tiene metadata completa.
- Tiene contenido publicado.

Un idioma incompleto no deberá exponerse a buscadores.

---

# Redirecciones

Las redirecciones deberán respetar la estrategia de localización.

No se deberá redirigir automáticamente usuarios entre idiomas basándose únicamente en:

- IP.
- Ubicación.
- Idioma del navegador.

Esto puede afectar SEO y experiencia del usuario.

---

# Selector de idioma

El selector deberá:

- Mostrar únicamente idiomas habilitados.
- Llevar al equivalente localizado.
- Mantener la intención de navegación.

Ejemplo:

Usuario en:

```text
/es/bodas
```

Selecciona inglés:

```text
/en/weddings
```

No:

```text
/en
```

salvo que la página equivalente no exista.

---

# Datos estructurados

Cuando existan datos estructurados (`JSON-LD`), deberán localizarse.

Incluye:

- Nombre.
- Descripción.
- URLs.
- Información del negocio.
- Breadcrumbs.

Las URLs generadas deberán corresponder al idioma actual.

---

# Validación SEO

Las validaciones deberán ejecutarse mediante:

```bash
pnpm validate:i18n
```

El validador deberá comprobar:

- Todas las páginas tienen equivalentes lingüísticos.
- Todas las rutas existen.
- Metadata completa.
- Hreflang válido.
- Canonical correcto.
- Idiomas habilitados correctamente configurados.

---

# Regla final

Cada idioma debe considerarse una experiencia independiente para usuarios y buscadores.

La localización correcta no consiste únicamente en traducir contenido; consiste en crear una arquitectura donde cada mercado pueda ser descubierto, indexado y comprendido correctamente por los motores de búsqueda.

## Formatos Regionales

### Objetivo

El sistema deberá manejar formatos regionales de manera centralizada utilizando la configuración definida en el **Language Registry**.

Los formatos regionales deberán adaptarse automáticamente al idioma activo.

No deberá existir lógica específica por idioma dentro de componentes o páginas.

Ejemplo incorrecto:

```ts
if (locale === "es") {
  formatDate(date, "DD/MM/YYYY");
}

if (locale === "en") {
  formatDate(date, "MM/DD/YYYY");
}
```

La aplicación deberá resolver esta configuración mediante la capa de internacionalización.

---

# Day.js

El proyecto deberá utilizar `day.js` como librería principal para manejo y formateo de fechas.

No deberá utilizarse:

- `Date.toLocaleDateString()` directamente.
- Formateos manuales.
- Librerías adicionales de fechas sin justificación.

---

# Configuración de Locale

Cada idioma deberá definir su locale correspondiente dentro del Language Registry.

Ejemplo:

```ts
es: {
  code: "es",
  dateLocale: "es"
}

en: {
  code: "en",
  dateLocale: "en"
}
```

La aplicación deberá cargar dinámicamente el locale requerido.

---

# Inicialización

La configuración de Day.js deberá realizarse dentro de la capa de internacionalización.

No deberá inicializarse dentro de componentes.

Incorrecto:

```astro
---
import dayjs from "dayjs";

dayjs.locale("es");
---
```

Correcto:

```ts
initializeDateLocale(locale);
```

---

# Fechas

Todas las fechas mostradas al usuario deberán utilizar el idioma activo.

Ejemplo:

Español:

```text
19 de julio de 2026
```

Inglés:

```text
July 19, 2026
```

El componente no deberá conocer el formato.

Incorrecto:

```ts
date.format("DD/MM/YYYY");
```

Correcto:

```ts
formatLocalizedDate(date, locale);
```

---

# Horarios

Los horarios deberán respetar la configuración regional.

Ejemplo:

Español:

```text
18:30
```

Inglés:

```text
6:30 PM
```

La aplicación deberá definir si utiliza:

- Formato 12 horas.
- Formato 24 horas.

mediante configuración.

---

# Zona horaria

Las fechas deberán manejar una zona horaria definida.

No deberá depender únicamente del navegador del usuario.

La aplicación deberá definir una estrategia consistente para:

- Eventos.
- Fechas de publicación.
- Reservaciones.
- Disponibilidad.

Ejemplo:

```text
America/Monterrey
```

deberá mantenerse consistente independientemente de la ubicación del visitante.

---

# Números

Los números deberán formatearse según el idioma activo.

Ejemplo:

Español:

```text
1,500
```

Inglés:

```text
1,500
```

o cuando aplique:

```text
1.500
```

La lógica deberá utilizar la configuración regional.

No deberá construirse manualmente.

Incorrecto:

```ts
number.toString();
```

---

# Monedas

Los valores monetarios deberán utilizar formato localizado.

Ejemplo:

Español:

```text
$1,500 MXN
```

Inglés:

```text
MXN $1,500
```

La moneda base del negocio deberá definirse mediante configuración.

No deberá existir lógica como:

```ts
if(locale === "es")
```

---

# Pluralización

Cuando existan textos dependientes de cantidades, el sistema deberá considerar reglas de pluralización.

Ejemplo:

Español:

```text
1 evento
5 eventos
```

Inglés:

```text
1 event
5 events
```

No deberá resolverse mediante concatenación manual.

Incorrecto:

```ts
count + " eventos";
```

---

# Separación de contenido

Los formatos regionales no deberán mezclarse con traducciones.

Incorrecto:

```json
{
  "price": "$1,500 MXN"
}
```

Correcto:

```json
{
  "price": {
    "value": 1500,
    "currency": "MXN"
  }
}
```

El formato será responsabilidad de la capa regional.

---

# API de formatos

La aplicación deberá exponer funciones centralizadas.

Ejemplo conceptual:

```ts
formatDate();

formatCurrency();

formatNumber();

formatTime();
```

Estas funciones deberán:

- Recibir el locale actual.
- Aplicar configuración regional.
- Mantener consistencia en toda la aplicación.

---

# Validación

La configuración regional deberá validarse mediante:

```bash
pnpm validate:i18n
```

Debe comprobar:

- Todos los idiomas tienen `dateLocale`.
- Todos los idiomas tienen configuración válida.
- No existen formatos definidos manualmente dentro de componentes.
- Los locales utilizados existen.

---

# Regla final

Los componentes nunca deberán decidir cómo mostrar fechas, números o monedas.

Los componentes únicamente reciben datos.

La capa de localización decide cómo presentar esos datos según el idioma y configuración regional activa.

## Agregar un Nuevo Idioma

### Objetivo

El sistema de localización deberá permitir agregar nuevos idiomas sin modificar la arquitectura existente.

Agregar un nuevo idioma deberá ser un proceso controlado y predecible.

La incorporación de un idioma deberá limitarse a:

- Registrar el idioma.
- Crear los recursos localizados.
- Validar integridad.
- Habilitar publicación.

No deberá requerir modificaciones en:

- Componentes.
- Layouts.
- Lógica de negocio.
- Servicios.
- Integraciones externas.

---

# Requisitos previos

Antes de habilitar un nuevo idioma, deberá existir:

- Configuración dentro del Language Registry.
- Traducciones completas.
- Rutas localizadas.
- Metadata localizada.
- Configuración regional.
- Validaciones exitosas.

Un idioma incompleto no deberá exponerse públicamente.

---

# Flujo para agregar un idioma

## Paso 1: Registrar el idioma

El primer paso será agregar el idioma dentro de:

```text
src/i18n/config.ts
```

Ejemplo:

```ts id="r3f8g0"
fr: {
  code: "fr",
  name: "French",
  nativeName: "Français",
  enabled: false,
  default: false,
  direction: "ltr",
  dateLocale: "fr",
}
```

---

# Paso 2: Crear recursos de traducción

Deberán crearse todos los archivos correspondientes.

Ejemplo:

```text id="7g6u1a"
src/i18n/translations/

hero/

├── es.json
├── en.json
└── fr.json


navigation/

├── es.json
├── en.json
└── fr.json
```

La estructura deberá ser exactamente igual a los idiomas existentes.

---

# Paso 3: Crear rutas localizadas

Todas las páginas públicas deberán tener un slug equivalente.

Ejemplo:

```json id="b2b1s0"
{
  "weddings": "mariages",
  "contact": "contact"
}
```

La ruta deberá representar la intención del contenido en el nuevo idioma.

No deberá utilizarse una traducción literal cuando afecte SEO.

Ejemplo incorrecto:

```text id="p8g6qm"
/fr/weddings
```

Ejemplo correcto:

```text id="3y9c8n"
/fr/mariages
```

---

# Paso 4: Crear metadata localizada

Cada página deberá contar con metadata propia.

Ejemplo:

```text id="4a8s3d"
metadata/pages/weddings/

├── es.json
├── en.json
└── fr.json
```

Debe incluir como mínimo:

- Title.
- Description.

Cuando aplique:

- Open Graph.
- Twitter Cards.
- Datos estructurados.

---

# Paso 5: Configurar formatos regionales

El idioma deberá definir:

- Locale de fechas.
- Formato numérico.
- Moneda.
- Dirección del texto.

Ejemplo:

```ts id="9f7x2q"
dateLocale: "fr";
```

Toda configuración deberá depender del Language Registry.

---

# Paso 6: Validar recursos

Antes de habilitar el idioma deberá ejecutarse:

```bash id="71zq2p"
pnpm validate:i18n
```

La validación deberá comprobar:

- Traducciones completas.
- Rutas completas.
- Metadata completa.
- Configuración correcta.
- Ausencia de claves faltantes.
- Ausencia de archivos no registrados.

---

# Paso 7: Habilitar el idioma

Después de que todas las validaciones sean exitosas:

Cambiar:

```ts id="8zv1ap"
enabled: false;
```

a:

```ts id="4m1j6h"
enabled: true;
```

A partir de ese momento el idioma podrá:

- Aparecer en el selector de idioma.
- Generar rutas públicas.
- Ser incluido en sitemap.
- Generar hreflang.
- Ser indexado por buscadores.

---

# Automatización recomendada

El proyecto podrá incluir un comando auxiliar para preparar nuevos idiomas.

Ejemplo:

```bash id="t7o3b4"
pnpm i18n:add fr
```

Este comando podrá generar automáticamente:

```text id="v1x8h4"
translations/*/fr.json

routes/fr.json

metadata/**/fr.json
```

Además de registrar el idioma dentro del Language Registry.

---

# Idiomas en desarrollo

Un idioma podrá existir en estado de desarrollo.

Ejemplo:

```ts id="2j4g8m"
enabled: false;
```

Durante esta etapa:

Permitido:

- Crear traducciones.
- Revisar contenido.
- Ejecutar validaciones.
- Probar localmente.

No permitido:

- Publicar rutas.
- Indexar en buscadores.
- Mostrar en selector público.

---

# Eliminación de idiomas

Eliminar un idioma deberá realizarse cuidadosamente.

No deberá eliminarse únicamente la configuración.

El proceso deberá considerar:

- Remover recursos.
- Remover rutas.
- Actualizar metadata.
- Actualizar sitemap.
- Revisar enlaces internos.

---

# Validación continua

Cada incorporación o modificación de idiomas deberá pasar por:

```bash id="8pkx4m"
pnpm validate:i18n
```

Este comando deberá formar parte del flujo general:

```bash id="d7p2x8"
pnpm validate
```

y ejecutarse automáticamente mediante el proceso de pre-commit.

---

# Regla final

Agregar un idioma debe ser una operación de configuración y contenido, nunca una modificación arquitectónica.

La arquitectura debe permitir crecer de:

```text
es + en
```

a:

```text
es + en + fr + de + pt + cualquier idioma futuro
```

sin incrementar la complejidad del código.

## Sistema de Validación

### Objetivo

El sistema de validación de internacionalización tiene como objetivo garantizar la integridad, consistencia y completitud de todos los recursos localizados del proyecto.

La localización no deberá depender únicamente de revisiones manuales.

Toda modificación relacionada con:

- Idiomas.
- Traducciones.
- Rutas.
- Metadata.
- Configuración regional.

deberá ser validada automáticamente.

---

# Comando principal

El sistema deberá exponer el siguiente comando:

```bash
pnpm validate:i18n
```

Este comando será responsable exclusivamente de validar la capa de internacionalización.

Dentro del flujo general del proyecto existirá:

```bash
pnpm validate
```

El cual deberá ejecutar internamente:

```bash
pnpm validate:i18n
```

La responsabilidad de este documento se limita a definir el comportamiento de:

```bash
pnpm validate:i18n
```

---

# Objetivos de validación

El validador deberá garantizar:

- Integridad del Language Registry.
- Consistencia entre idiomas.
- Traducciones completas.
- Rutas completas.
- Metadata completa.
- Configuración regional correcta.
- Compatibilidad SEO.

---

# Validación del Language Registry

El sistema deberá validar:

## Idiomas registrados

Cada idioma deberá contener:

- Código válido.
- Nombre.
- Nombre nativo.
- Estado.
- Dirección.
- Locale de fechas.

---

## Idioma default

Debe existir exactamente un idioma con:

```ts
default: true
```

Incorrecto:

```ts
es: {
  default: true
}

en: {
  default: true
}
```

---

## Idiomas habilitados

Todo idioma con:

```ts
enabled: true;
```

deberá contar con todos sus recursos.

---

# Validación de Traducciones

El validador deberá comparar la estructura de traducciones contra el idioma principal.

Ejemplo:

Idioma principal:

```json
{
  "hero": {
    "title": "",
    "subtitle": "",
    "button": ""
  }
}
```

Idioma inglés:

```json
{
  "hero": {
    "title": "",
    "subtitle": ""
  }
}
```

Resultado:

```text
❌ Missing translation

Language:
en

Missing key:
hero.button
```

---

# Reglas de traducciones

El sistema deberá detectar:

## Claves faltantes

Error bloqueante.

---

## Claves adicionales

Cuando un idioma tenga contenido inexistente en el idioma principal.

Ejemplo:

```json
{
  "newKey": ""
}
```

Resultado:

```text
❌ Unknown translation key
```

---

## JSON inválido

Cualquier archivo JSON inválido deberá bloquear validación.

---

## Estructura inconsistente

Ejemplo:

Español:

```json
{
  "hero": {
    "button": ""
  }
}
```

Inglés:

```json
{
  "heroButton": ""
}
```

Resultado:

```text
❌ Invalid translation structure
```

---

# Validación de rutas

El sistema deberá validar:

- Todas las páginas tienen rutas en todos los idiomas habilitados.
- Los slugs son únicos.
- Los slugs cumplen reglas SEO.
- No existen rutas duplicadas.

---

## Reglas SEO para slugs

Los slugs deberán:

- Estar en minúsculas.
- No contener espacios.
- No contener caracteres especiales.
- Utilizar guiones como separadores.

Correcto:

```text
corporate-events
```

Incorrecto:

```text
Corporate Events
```

---

# Validación de Metadata

El sistema deberá comprobar:

Cada página deberá tener:

```text
title
description
```

para cada idioma habilitado.

Ejemplo:

```text
metadata/pages/contact/

es.json
en.json
```

---

Debe detectar:

- Metadata faltante.
- Metadata incompleta.
- Idiomas sin descripción.
- Páginas sin configuración SEO.

---

# Validación de relación entre recursos

El sistema deberá asegurar que exista relación entre:

```text
Routes
    ↓
Translations
    ↓
Metadata
```

Ejemplo:

Existe:

```text
routes/weddings
```

Debe existir:

```text
translations/weddings
```

y:

```text
metadata/weddings
```

---

# Validación de idiomas incompletos

Un idioma habilitado no podrá tener recursos incompletos.

Ejemplo:

```ts
en: {
  enabled: true;
}
```

pero falta:

```text
routes/en.json
```

Resultado:

```text
❌ Enabled locale is incomplete
```

---

# Reporte de errores

Los errores deberán ser descriptivos.

Incorrecto:

```text
Validation failed
```

Correcto:

```text
❌ Missing translation

File:
src/i18n/translations/navigation/en.json

Missing:
navigation.contact
```

---

# Severidad de errores

El sistema deberá manejar diferentes niveles.

## Error

Bloquea commit.

Ejemplos:

- Traducción faltante.
- Ruta inexistente.
- Metadata incompleta.
- JSON inválido.

---

## Warning

No bloquea commit.

Ejemplos:

- Traducción posiblemente obsoleta.
- Recurso no utilizado.

---

# Integración con Git

El comando deberá ejecutarse automáticamente dentro del flujo de pre-commit.

Ejemplo:

```bash
pnpm validate
```

deberá ejecutar:

```bash
pnpm validate:i18n
```

Antes de permitir:

```bash
git commit
```

---

# Filosofía

La validación existe para evitar que la deuda técnica de internacionalización crezca.

Un proyecto con múltiples idiomas debe garantizar que:

- Todos los idiomas tienen la misma estructura.
- Ninguna página queda incompleta.
- Ninguna traducción queda rota.
- Ningún idioma rompe SEO.

La localización debe mantenerse como una parte confiable de la arquitectura.

## Sistema de Validación

### Objetivo

El sistema de validación de internacionalización tiene como objetivo garantizar la integridad, consistencia y completitud de todos los recursos localizados del proyecto.

La localización no deberá depender únicamente de revisiones manuales.

Toda modificación relacionada con:

- Idiomas.
- Traducciones.
- Rutas.
- Metadata.
- Configuración regional.

deberá ser validada automáticamente.

---

# Comando principal

El sistema deberá exponer el siguiente comando:

```bash
pnpm validate:i18n
```

Este comando será responsable exclusivamente de validar la capa de internacionalización.

Dentro del flujo general del proyecto existirá:

```bash
pnpm validate
```

El cual deberá ejecutar internamente:

```bash
pnpm validate:i18n
```

La responsabilidad de este documento se limita a definir el comportamiento de:

```bash
pnpm validate:i18n
```

---

# Objetivos de validación

El validador deberá garantizar:

- Integridad del Language Registry.
- Consistencia entre idiomas.
- Traducciones completas.
- Rutas completas.
- Metadata completa.
- Configuración regional correcta.
- Compatibilidad SEO.

---

# Validación del Language Registry

El sistema deberá validar:

## Idiomas registrados

Cada idioma deberá contener:

- Código válido.
- Nombre.
- Nombre nativo.
- Estado.
- Dirección.
- Locale de fechas.

---

## Idioma default

Debe existir exactamente un idioma con:

```ts
default: true
```

Incorrecto:

```ts
es: {
  default: true
}

en: {
  default: true
}
```

---

## Idiomas habilitados

Todo idioma con:

```ts
enabled: true;
```

deberá contar con todos sus recursos.

---

# Validación de Traducciones

El validador deberá comparar la estructura de traducciones contra el idioma principal.

Ejemplo:

Idioma principal:

```json
{
  "hero": {
    "title": "",
    "subtitle": "",
    "button": ""
  }
}
```

Idioma inglés:

```json
{
  "hero": {
    "title": "",
    "subtitle": ""
  }
}
```

Resultado:

```text
❌ Missing translation

Language:
en

Missing key:
hero.button
```

---

# Reglas de traducciones

El sistema deberá detectar:

## Claves faltantes

Error bloqueante.

---

## Claves adicionales

Cuando un idioma tenga contenido inexistente en el idioma principal.

Ejemplo:

```json
{
  "newKey": ""
}
```

Resultado:

```text
❌ Unknown translation key
```

---

## JSON inválido

Cualquier archivo JSON inválido deberá bloquear validación.

---

## Estructura inconsistente

Ejemplo:

Español:

```json
{
  "hero": {
    "button": ""
  }
}
```

Inglés:

```json
{
  "heroButton": ""
}
```

Resultado:

```text
❌ Invalid translation structure
```

---

# Validación de rutas

El sistema deberá validar:

- Todas las páginas tienen rutas en todos los idiomas habilitados.
- Los slugs son únicos.
- Los slugs cumplen reglas SEO.
- No existen rutas duplicadas.

---

## Reglas SEO para slugs

Los slugs deberán:

- Estar en minúsculas.
- No contener espacios.
- No contener caracteres especiales.
- Utilizar guiones como separadores.

Correcto:

```text
corporate-events
```

Incorrecto:

```text
Corporate Events
```

---

# Validación de Metadata

El sistema deberá comprobar:

Cada página deberá tener:

```text
title
description
```

para cada idioma habilitado.

Ejemplo:

```text
metadata/pages/contact/

es.json
en.json
```

---

Debe detectar:

- Metadata faltante.
- Metadata incompleta.
- Idiomas sin descripción.
- Páginas sin configuración SEO.

---

# Validación de relación entre recursos

El sistema deberá asegurar que exista relación entre:

```text
Routes
    ↓
Translations
    ↓
Metadata
```

Ejemplo:

Existe:

```text
routes/weddings
```

Debe existir:

```text
translations/weddings
```

y:

```text
metadata/weddings
```

---

# Validación de idiomas incompletos

Un idioma habilitado no podrá tener recursos incompletos.

Ejemplo:

```ts
en: {
  enabled: true;
}
```

pero falta:

```text
routes/en.json
```

Resultado:

```text
❌ Enabled locale is incomplete
```

---

# Reporte de errores

Los errores deberán ser descriptivos.

Incorrecto:

```text
Validation failed
```

Correcto:

```text
❌ Missing translation

File:
src/i18n/translations/navigation/en.json

Missing:
navigation.contact
```

---

# Severidad de errores

El sistema deberá manejar diferentes niveles.

## Error

Bloquea commit.

Ejemplos:

- Traducción faltante.
- Ruta inexistente.
- Metadata incompleta.
- JSON inválido.

---

## Warning

No bloquea commit.

Ejemplos:

- Traducción posiblemente obsoleta.
- Recurso no utilizado.

---

# Integración con Git

El comando deberá ejecutarse automáticamente dentro del flujo de pre-commit.

Ejemplo:

```bash
pnpm validate
```

deberá ejecutar:

```bash
pnpm validate:i18n
```

Antes de permitir:

```bash
git commit
```

---

# Filosofía

La validación existe para evitar que la deuda técnica de internacionalización crezca.

Un proyecto con múltiples idiomas debe garantizar que:

- Todos los idiomas tienen la misma estructura.
- Ninguna página queda incompleta.
- Ninguna traducción queda rota.
- Ningún idioma rompe SEO.

La localización debe mantenerse como una parte confiable de la arquitectura.

## Checklist de Publicación

### Objetivo

Antes de publicar un nuevo idioma, una nueva página localizada o habilitar contenido existente para un mercado adicional, deberá completarse un proceso de validación.

El objetivo es garantizar que la experiencia localizada sea correcta para:

- Usuarios.
- Motores de búsqueda.
- Sistemas internos.
- Equipos de desarrollo.

Un idioma no deberá considerarse listo para producción hasta cumplir todos los puntos del checklist.

---

# Configuración del idioma

Antes de publicar un idioma deberá verificarse:

- [ ] El idioma está registrado dentro del Language Registry.
- [ ] El código del idioma cumple con el estándar definido.
- [ ] El idioma tiene nombre interno.
- [ ] El idioma tiene nombre nativo.
- [ ] El idioma tiene configuración regional.
- [ ] El idioma tiene locale configurado para fechas.
- [ ] El idioma tiene dirección de texto definida (`ltr` o `rtl`).
- [ ] El idioma está marcado correctamente como habilitado.

---

# Traducciones

Debe verificarse:

- [ ] Todas las traducciones requeridas existen.
- [ ] No existen claves faltantes.
- [ ] No existen claves adicionales no utilizadas.
- [ ] Todos los namespaces tienen estructura equivalente.
- [ ] Los textos fueron revisados por una persona con dominio del idioma.
- [ ] No existen textos visibles hardcodeados.
- [ ] Los botones y llamados a la acción tienen traducción correcta.
- [ ] Los mensajes de formularios están localizados.
- [ ] Los mensajes de error están localizados.

Validación requerida:

```bash id="8n5w2k"
pnpm validate:i18n
```

---

# Rutas

Debe verificarse:

- [ ] Todas las páginas tienen slug localizado.
- [ ] Las rutas respetan la estrategia SEO.
- [ ] Los slugs no contienen caracteres inválidos.
- [ ] Las rutas no están duplicadas.
- [ ] Las rutas mantienen relación entre idiomas.

Ejemplo esperado:

```text id="4j8k0v"
/es/bodas

/en/weddings
```

---

# Metadata SEO

Debe verificarse:

- [ ] Cada página tiene metadata localizada.
- [ ] Cada página tiene title.
- [ ] Cada página tiene description.
- [ ] Open Graph está configurado.
- [ ] Twitter Cards están configuradas cuando aplique.
- [ ] No existen traducciones automáticas sin revisión.
- [ ] La metadata representa correctamente la intención de búsqueda del idioma.

---

# SEO Multilenguaje

Debe verificarse:

- [ ] Canonical apunta a la URL correcta.
- [ ] Hreflang está generado correctamente.
- [ ] Las relaciones entre idiomas son bidireccionales.
- [ ] El sitemap incluye las nuevas URLs.
- [ ] No existen URLs duplicadas entre idiomas.
- [ ] El idioma publicado es indexable.

---

# Contenido visual

Debe verificarse:

- [ ] Las imágenes tienen contenido adecuado para el idioma.
- [ ] Los textos dentro de imágenes están localizados cuando aplique.
- [ ] Los atributos `alt` están traducidos.
- [ ] Las imágenes cumplen las reglas del proyecto.

Reglas generales:

- Formato preferido:

```text id="9j2w8x"
WebP
```

- Peso recomendado:

```text id="7d3m4p"
≤ 200 KB
```

- Utilizar lazy loading cuando sea posible.

---

# Formatos regionales

Debe verificarse:

- [ ] Las fechas utilizan el locale correcto.
- [ ] Los números utilizan formato correcto.
- [ ] Las monedas utilizan configuración correcta.
- [ ] Los horarios respetan la estrategia definida.
- [ ] No existen formatos manuales dentro de componentes.

---

# Experiencia de usuario

Debe verificarse:

- [ ] El selector de idioma muestra únicamente idiomas habilitados.
- [ ] El cambio de idioma dirige a la página equivalente.
- [ ] No existen páginas mezclando idiomas.
- [ ] Los formularios funcionan correctamente.
- [ ] Los mensajes de confirmación están localizados.
- [ ] La navegación mantiene consistencia.

---

# Validación técnica final

Antes de publicar deberá ejecutarse:

```bash id="1w6x3r"
pnpm validate:i18n
```

El resultado esperado:

```text id="7m9q1a"
✓ Language Registry valid

✓ Translations valid

✓ Routes valid

✓ Metadata valid

✓ SEO localization valid
```

---

# Publicación

Después de completar el checklist:

1. Habilitar idioma en Language Registry.
2. Ejecutar build de producción.
3. Validar generación de rutas.
4. Validar sitemap.
5. Revisar páginas publicadas.
6. Monitorear indexación.

---

# Después del lanzamiento

Después de publicar un idioma deberán monitorearse:

- Indexación en buscadores.
- Errores de rastreo.
- URLs no encontradas.
- Problemas de hreflang.
- Rendimiento SEO.
- Comportamiento de usuarios.

---

# Regla final

Un idioma no está terminado cuando los textos están traducidos.

Un idioma está terminado cuando:

- El contenido es correcto.
- La experiencia es consistente.
- El SEO funciona.
- La arquitectura permanece limpia.
- Las validaciones pasan correctamente.

## Checklist de Publicación

### Objetivo

Antes de publicar un nuevo idioma, una nueva página localizada o habilitar contenido existente para un mercado adicional, deberá completarse un proceso de validación.

El objetivo es garantizar que la experiencia localizada sea correcta para:

- Usuarios.
- Motores de búsqueda.
- Sistemas internos.
- Equipos de desarrollo.

Un idioma no deberá considerarse listo para producción hasta cumplir todos los puntos del checklist.

---

# Configuración del idioma

Antes de publicar un idioma deberá verificarse:

- [ ] El idioma está registrado dentro del Language Registry.
- [ ] El código del idioma cumple con el estándar definido.
- [ ] El idioma tiene nombre interno.
- [ ] El idioma tiene nombre nativo.
- [ ] El idioma tiene configuración regional.
- [ ] El idioma tiene locale configurado para fechas.
- [ ] El idioma tiene dirección de texto definida (`ltr` o `rtl`).
- [ ] El idioma está marcado correctamente como habilitado.

---

# Traducciones

Debe verificarse:

- [ ] Todas las traducciones requeridas existen.
- [ ] No existen claves faltantes.
- [ ] No existen claves adicionales no utilizadas.
- [ ] Todos los namespaces tienen estructura equivalente.
- [ ] Los textos fueron revisados por una persona con dominio del idioma.
- [ ] No existen textos visibles hardcodeados.
- [ ] Los botones y llamados a la acción tienen traducción correcta.
- [ ] Los mensajes de formularios están localizados.
- [ ] Los mensajes de error están localizados.

Validación requerida:

```bash id="8n5w2k"
pnpm validate:i18n
```

---

# Rutas

Debe verificarse:

- [ ] Todas las páginas tienen slug localizado.
- [ ] Las rutas respetan la estrategia SEO.
- [ ] Los slugs no contienen caracteres inválidos.
- [ ] Las rutas no están duplicadas.
- [ ] Las rutas mantienen relación entre idiomas.

Ejemplo esperado:

```text id="4j8k0v"
/es/bodas

/en/weddings
```

---

# Metadata SEO

Debe verificarse:

- [ ] Cada página tiene metadata localizada.
- [ ] Cada página tiene title.
- [ ] Cada página tiene description.
- [ ] Open Graph está configurado.
- [ ] Twitter Cards están configuradas cuando aplique.
- [ ] No existen traducciones automáticas sin revisión.
- [ ] La metadata representa correctamente la intención de búsqueda del idioma.

---

# SEO Multilenguaje

Debe verificarse:

- [ ] Canonical apunta a la URL correcta.
- [ ] Hreflang está generado correctamente.
- [ ] Las relaciones entre idiomas son bidireccionales.
- [ ] El sitemap incluye las nuevas URLs.
- [ ] No existen URLs duplicadas entre idiomas.
- [ ] El idioma publicado es indexable.

---

# Contenido visual

Debe verificarse:

- [ ] Las imágenes tienen contenido adecuado para el idioma.
- [ ] Los textos dentro de imágenes están localizados cuando aplique.
- [ ] Los atributos `alt` están traducidos.
- [ ] Las imágenes cumplen las reglas del proyecto.

Reglas generales:

- Formato preferido:

```text id="9j2w8x"
WebP
```

- Peso recomendado:

```text id="7d3m4p"
≤ 200 KB
```

- Utilizar lazy loading cuando sea posible.

---

# Formatos regionales

Debe verificarse:

- [ ] Las fechas utilizan el locale correcto.
- [ ] Los números utilizan formato correcto.
- [ ] Las monedas utilizan configuración correcta.
- [ ] Los horarios respetan la estrategia definida.
- [ ] No existen formatos manuales dentro de componentes.

---

# Experiencia de usuario

Debe verificarse:

- [ ] El selector de idioma muestra únicamente idiomas habilitados.
- [ ] El cambio de idioma dirige a la página equivalente.
- [ ] No existen páginas mezclando idiomas.
- [ ] Los formularios funcionan correctamente.
- [ ] Los mensajes de confirmación están localizados.
- [ ] La navegación mantiene consistencia.

---

# Validación técnica final

Antes de publicar deberá ejecutarse:

```bash id="1w6x3r"
pnpm validate:i18n
```

El resultado esperado:

```text id="7m9q1a"
✓ Language Registry valid

✓ Translations valid

✓ Routes valid

✓ Metadata valid

✓ SEO localization valid
```

---

# Publicación

Después de completar el checklist:

1. Habilitar idioma en Language Registry.
2. Ejecutar build de producción.
3. Validar generación de rutas.
4. Validar sitemap.
5. Revisar páginas publicadas.
6. Monitorear indexación.

---

# Después del lanzamiento

Después de publicar un idioma deberán monitorearse:

- Indexación en buscadores.
- Errores de rastreo.
- URLs no encontradas.
- Problemas de hreflang.
- Rendimiento SEO.
- Comportamiento de usuarios.

---

# Regla final

Un idioma no está terminado cuando los textos están traducidos.

Un idioma está terminado cuando:

- El contenido es correcto.
- La experiencia es consistente.
- El SEO funciona.
- La arquitectura permanece limpia.
- Las validaciones pasan correctamente.
