# CI/CD Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia de **Continuous Integration / Continuous Deployment (CI/CD)**.

El objetivo es garantizar que cada cambio:

- Sea validado automáticamente.
- Mantenga la calidad del código.
- No rompa funcionalidades existentes.
- Cumpla estándares técnicos.
- Pueda desplegarse de forma segura.

El proceso de integración y despliegue debe reducir errores humanos y garantizar entregas confiables.

---

# Principios CI/CD

Reglas principales:

1. Ningún cambio debe llegar a producción sin validación automática.
2. Los commits deben pasar validaciones básicas.
3. Los Pull Requests deben validar calidad completa.
4. Los despliegues deben ser reproducibles.
5. Los ambientes deben estar separados.
6. Las variables sensibles nunca deben estar en código.
7. El pipeline debe fallar ante problemas críticos.

---

# Flujo General

El flujo recomendado:

```text id="flow01"
Developer

↓

Local Development

↓

Precommit Validation

↓

Pull Request

↓

CI Pipeline

↓

Build

↓

Deploy

↓

Production
```

---

# Control de Versiones

El proyecto debe utilizar Git como sistema de control de versiones.

Reglas:

- Todo cambio debe estar registrado.
- No realizar cambios directamente sobre producción.
- Utilizar ramas para nuevas funcionalidades.

---

# Branch Naming Convention

Las ramas deben utilizar nombres cortos y consistentes para identificar rápidamente el propósito del cambio.

Formato:

```text
type/short-description
```

Ejemplos:

```bash
feat/contact-form

config/tailwind-setup

core/project-architecture

docs/update-seo-strategy

fix/header-mobile

refactor/button-component

perf/image-optimization

test/localization-validation
```

---

# Tipos de Branches

Los prefijos permitidos son:

## feat

Nuevas funcionalidades.

Ejemplo:

```bash
feat/wedding-landing
```

---

## config

Cambios de configuración del proyecto.

Ejemplo:

```bash
config/astro-setup
```

---

## core

Cambios relacionados con arquitectura base o funcionalidades fundamentales.

Ejemplo:

```bash
core/i18n-system
```

---

## docs

Cambios únicamente de documentación.

Ejemplo:

```bash
docs/update-architecture
```

---

## fix

Corrección de errores.

Ejemplo:

```bash
fix/mobile-menu
```

---

## refactor

Mejoras internas sin cambiar comportamiento.

Ejemplo:

```bash
refactor/component-structure
```

---

## perf

Optimizaciones de rendimiento.

Ejemplo:

```bash
perf/image-loading
```

---

## test

Cambios relacionados con pruebas.

Ejemplo:

```bash
test/component-validation
```

---

# Reglas de Naming

Las ramas deben:

- Utilizar nombres en inglés.
- Utilizar `kebab-case`.
- Ser descriptivas pero cortas.
- Evitar nombres genéricos.

Correcto:

```bash
feat/contact-wizard
```

Incorrecto:

```bash
feature/new-stuff
```

---

# Regla Final

El nombre de una rama debe comunicar rápidamente:

- Qué tipo de cambio es.
- Qué área afecta.
- Cuál es su propósito.

Una convención consistente facilita revisión, seguimiento y mantenimiento del proyecto.

---

# Main Branch

Representa código estable listo para producción.

Reglas:

- Debe permanecer siempre desplegable.
- Requiere Pull Request.
- Requiere validaciones exitosas.

---

# Develop Branch

Representa integración de nuevas funcionalidades.

Uso:

- Integración continua.
- Validación previa a producción.

---

# Feature Branches

Cada funcionalidad debe desarrollarse en una rama independiente.

Ejemplo:

```bash id="branch02"
feature/add-contact-form

feature/update-localization

feature/new-gallery
```

---

# Pull Requests

Todo cambio debe pasar por Pull Request.

Debe validar:

- Código correcto.
- Tests exitosos.
- Revisión técnica.
- Cumplimiento de arquitectura.

---

# Commit Convention

Los commits deben seguir una convención clara.

Formato recomendado:

```text id="commit01"
type(scope): description
```

Ejemplos:

```bash
feat(localization): add english routes

fix(seo): update canonical generation

refactor(button): simplify variants

docs(architecture): update component rules
```

---

# Tipos permitidos

Ejemplos:

```text id="types01"
feat

fix

refactor

docs

test

chore

perf
```

---

# Precommit Hooks

Antes de crear un commit deben ejecutarse validaciones automáticas.

Objetivo:

Evitar enviar código incompleto al repositorio.

---

# Validaciones Precommit

Debe ejecutarse:

```bash id="pre01"
pnpm validate
```

Debe incluir:

```text id="pre02"
✓ Type checking

✓ Lint

✓ Formatting

✓ i18n validation

✓ SEO validation

✓ Tests
```

---

# Validación de Localización

La validación específica de idiomas debe mantenerse independiente.

Comando:

```bash id="i18n01"
pnpm validate:i18n
```

Debe ejecutarse:

- Manualmente cuando se trabajen traducciones.
- Dentro de `pnpm validate`.
- En CI/CD.

---

# CI Pipeline

Cada Pull Request debe ejecutar un pipeline automático.

Flujo:

```text id="ci01"
Install dependencies

↓

Validate code

↓

Run tests

↓

Build project

↓

Generate artifacts

↓

Report result
```

---

# Instalación de Dependencias

Las dependencias deben instalarse de forma reproducible.

Utilizar:

```bash id="dep01"
pnpm install --frozen-lockfile
```

Reglas:

- No modificar lockfile automáticamente.
- Mantener versiones controladas.

---

# Validación de Código

El pipeline debe ejecutar:

```bash id="code01"
pnpm validate
```

Debe validar:

- TypeScript.
- Lint.
- Formatting.
- Tests.
- SEO.
- Localization.

---

# Build Validation

El proyecto debe validar que puede construirse correctamente.

Ejemplo:

```bash id="build01"
pnpm build
```

El build debe fallar si existen:

- Errores TypeScript.
- Rutas inválidas.
- Problemas de generación estática.
- Errores críticos.

---

# Performance Validation

El pipeline debe proteger rendimiento.

Validar:

- Tamaño del bundle.
- Assets.
- Imágenes.
- Lighthouse cuando aplique.

Evitar introducir:

- JavaScript innecesario.
- Dependencias pesadas.
- Assets excesivos.

---

# SEO Validation

Antes del deploy validar:

- Sitemap.
- Robots.
- Metadata.
- Canonicals.
- Hreflang.
- URLs.

---

# Environments

El proyecto debe manejar ambientes separados.

Mínimo:

```text id="env01"
Development

↓

Staging

↓

Production
```

---

# Development

Uso:

- Desarrollo local.
- Nuevas funcionalidades.
- Pruebas rápidas.

---

# Staging

Uso:

- Validación previa.
- Revisión funcional.
- QA.

Debe ser lo más cercano posible a producción.

---

# Production

Uso:

- Usuarios finales.
- Código estable.

Debe recibir únicamente cambios aprobados.

---

# Variables de Entorno

Las variables sensibles deben manejarse mediante environment variables.

Nunca almacenar:

- API keys.
- Tokens.
- Secretos.
- Credenciales.

Incorrecto:

```ts id="secret01"
const API_KEY = "123456";
```

Correcto:

```env id="secret02"
API_KEY=value
```

---

# Seguridad del Pipeline

El pipeline debe proteger información sensible.

Reglas:

- No imprimir secretos en logs.
- Limitar permisos.
- Revisar dependencias.
- Mantener herramientas actualizadas.

---

# Deployment

Los despliegues deben ser automatizados.

Flujo:

```text id="deploy01"
Merge

↓

CI Validation

↓

Build

↓

Deploy

↓

Health Check

↓

Success
```

---

# Rollback

Debe existir una estrategia para regresar a una versión estable.

Casos:

- Error crítico.
- Degradación de rendimiento.
- Problemas SEO.
- Fallos funcionales.

---

# Artifacts

Los builds generados deben poder identificarse.

Registrar:

- Commit.
- Fecha.
- Versión.
- Ambiente.

---

# Monitoreo Post Deploy

Después de desplegar validar:

- Disponibilidad.
- Errores.
- Performance.
- Indexación.
- Formularios.
- Integraciones.

---

# Checklist Antes de Merge

```text id="merge01"
Código terminado

↓

Tests creados

↓

pnpm validate exitoso

↓

Build exitoso

↓

Revisión aprobada

↓

Merge
```

---

# Checklist Antes de Producción

```text id="prod01"
CI exitoso

↓

Build generado

↓

Variables configuradas

↓

SEO validado

↓

Performance validada

↓

Deploy

↓

Verificación final
```

---

# Regla Final

Un pipeline profesional no debe limitarse a desplegar código.

Debe garantizar que únicamente llegue a producción código:

- Correcto.
- Seguro.
- Optimizado.
- Probado.
- Mantenible.

CI/CD es una garantía de calidad, no únicamente una herramienta de automatización.
