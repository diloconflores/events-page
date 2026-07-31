# Wizard Architecture

## Objetivo

Este documento describe cómo se construye actualmente el wizard del formulario de propuesta.

La intención es dejar clara la separación entre:

- Construcción del schema.
- Renderizado visual.
- Lógica de interacción.
- Traducciones y contenido.

El wizard debe mantenerse como una pieza declarativa, tipada y fácil de extender.

---

## Arquitectura General

El wizard se compone de dos capas principales:

```text
ProposalWizard

↓

Wizard
```

### `ProposalWizard`

Responsable de:

- Traducir el contenido del landing al schema del formulario.
- Definir qué campos existen.
- Definir pasos, etiquetas, opciones y dependencias.
- Resolver valores específicos por locale.

### `Wizard`

Responsable de:

- Renderizar la interfaz.
- Pintar pasos, campos, botones y estados.
- Exponer atributos `data-*` para comportamiento.
- Mantener la presentación separada de la lógica.

---

## Flujo de Construcción

El flujo actual es:

```text
Landing content

↓

ProposalWizard/logic.ts

↓

WizardSchema

↓

ProposalWizard/index.astro

↓

Wizard/index.astro

↓

Wizard/scripts.ts
```

---

## Archivos Involucrados

### `src/components/organisms/ProposalWizard/logic.ts`

Construye el `WizardSchema`.

Aquí se define:

- `steps`
- `fields`
- `controls`
- `messages`
- `analytics`
- `hiddenFields`

También resuelve valores dependientes del idioma, por ejemplo:

- `Sí` / `Yes`
- `Decoración integral` / `Full decoration`
- `Otro` / `Other`

### `src/components/organisms/ProposalWizard/index.astro`

Se limita a:

- Recibir `content`, `locale` y `action`.
- Construir el schema con `getProposalWizardSchema`.
- Pasar el schema al componente `Wizard`.

### `src/components/organisms/Wizard/index.astro`

Renderiza el formulario y sus estados.

Incluye:

- Mini timelines por fase.
- Título activo de la fase.
- Fieldsets por step.
- Botones de avance/retroceso.
- Botón de submit.
- Estados de error y éxito.

### `src/components/organisms/Wizard/scripts.ts`

Gestiona el comportamiento del wizard en cliente:

- Cambiar de paso.
- Actualizar mini timelines por fase.
- Actualizar el título de la fase activa.
- Validar campos visibles.
- Resolver dependencias condicionales.
- Manejar submit.
- Manejar estado de éxito y error.
- Enviar eventos de analytics.

### `src/i18n/translations/landing/{es,en}.json`

Fuente de verdad para:

- Copys del wizard.
- Labels.
- Placeholders.
- Opciones.
- Mensajes de error.

---

## Estructura Del Schema

El schema del wizard vive en `WizardSchema` y contiene:

- `formId`
- `progress`
- `steps`
- `fields`
- `controls`
- `messages`
- `analytics`
- `hiddenFields`

### `progress`

Son las fases visibles del wizard:

- `Celebración`
- `Diseño`
- `Propuesta`
- `Contacto`

### `steps`

Definen la estructura visual del wizard.

Actualmente hay 6 pasos renderizados, que agrupan los campos por bloques de formulario.

Cada step incluye `phaseIndex` para agrupar el avance visual por fase.

### `fields`

Cada campo define:

- `kind`
- `name`
- `label`
- `text`
- `placeholder`
- `errorText`
- `required`
- `step`
- `order`
- `showWhen`
- `validation`
- `options`

### `text`

El schema puede incluir campos informativos de tipo `text`.

Estos campos:

- No se envían al proveedor.
- No participan en la validación.
- Se usan para avisos o textos auxiliares dentro del flujo.

---

## Mapeo De Fases Y Pasos

Las fases visibles no son 1:1 con los pasos internos.

### Fases visibles

1. `Celebración`
2. `Diseño`
3. `Propuesta`
4. `Contacto`

### Pasos internos

1. Comencemos por tu celebración
2. Conozcamos tu evento
3. Empecemos a diseñar
4. La celebración que imaginas
5. Personalicemos tu propuesta
6. Ya casi terminamos

---

## Dependencias Condicionales

Algunos campos solo se muestran cuando otro campo cumple cierta condición.

### Dependencias actuales

| Campo | Depende de | Condición |
|---|---|---|
| `municipalityOther` | `municipality` | `municipality = Otro` / `Other` |
| `venueName` | `venue` | `venue = Sí` / `Yes` |
| `integralSpaces` | `spaces` | `spaces` incluye `Decoración integral` / `Full decoration` |
| `style` | `ideaState` | `ideaState != sin_idea` |
| `styleOther` | `style` | `style = Otro` / `Other` |

Estas dependencias se definen en el schema y se resuelven en cliente por `Wizard/scripts.ts`.

---

## Validación

La validación está dividida en dos niveles:

### 1. Validación de UI

Se hace en el navegador para evitar avanzar si un paso visible no es válido.

Incluye:

- Required.
- `minLength`.
- `pattern`.
- `email`.
- `tel`.
- `url`.
- `date`.
- grupos de checkbox.

### 2. Validación de submit

Antes de enviar:

- Se valida que todos los pasos sean consistentes.
- Se validan campos visibles y grupos condicionales.
- Se envía el formulario solo si todo es válido.

---

## Envío Del Formulario

El formulario usa:

- `action` inyectado desde el componente padre.
- `method="POST"`.
- `novalidate` para controlar la validación desde la propia lógica del wizard.

Además, el schema agrega campos ocultos:

- `_subject`
- `_language`

---

## Analytics

El wizard reporta eventos de interacción, entre ellos:

- Vista de paso.
- Avance entre pasos.
- Abandono.
- Submit exitoso.

La configuración de analytics vive en el schema para mantener la lógica centralizada.

---

## Responsabilidades Que No Deben Mezclarse

### `ProposalWizard/logic.ts`

No debe renderizar UI.

### `Wizard/index.astro`

No debe construir reglas de negocio.

### `Wizard/scripts.ts`

No debe contener contenido de negocio.

Debe operar sobre `data-*`, schema y estado de la interfaz.

---

## Observación De Implementación

El wrapper `ProposalWizard` actualmente solo actúa como raíz funcional con `data-proposal-wizard`.

No debe recuperar una segunda card visual si el diseño del wizard ya está resuelto dentro de `Wizard`.

---

## Resumen

En la implementación actual:

- El contenido del wizard se define en el schema.
- El schema se construye en `ProposalWizard/logic.ts`.
- El render visual lo hace `Wizard/index.astro`.
- La interacción la controla `Wizard/scripts.ts`.
- Las traducciones viven en `src/i18n/translations/landing/{es,en}.json`.

La estructura está diseñada para que el wizard sea:

- Tipado.
- Localizable.
- Condicional.
- Reutilizable.
- Fácil de mantener.
