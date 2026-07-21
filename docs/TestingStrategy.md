# Testing Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia de **Quality First**.

El objetivo es garantizar estabilidad, confiabilidad y calidad durante todo el ciclo de vida del producto.

Las pruebas deben permitir:

- Detectar errores antes de producción.
- Evitar regresiones.
- Mantener contratos entre componentes.
- Validar comportamiento esperado.
- Proteger funcionalidades críticas.

Testing no debe ser una etapa posterior al desarrollo.

Debe formar parte del proceso desde la creación de nuevas funcionalidades.

---

# Principios de Testing

Reglas principales:

1. Probar comportamiento, no implementación interna.
2. Mantener pruebas simples y mantenibles.
3. Priorizar escenarios críticos.
4. Automatizar validaciones repetitivas.
5. Ejecutar pruebas antes de integrar cambios.
6. Mantener pruebas cercanas al código relacionado.
7. Evitar pruebas frágiles.

---

# Pirámide de Testing

El proyecto debe seguir una estrategia basada en niveles.

```text
              E2E Tests

          Integration Tests

        Component Tests

       Unit Tests
```

Cada nivel tiene una responsabilidad diferente.

---

# Unit Testing

## Objetivo

Validar funciones individuales y lógica aislada.

Debe aplicarse principalmente a:

- Utilidades.
- Helpers.
- Transformaciones de datos.
- Validaciones.
- Funciones puras.

Ejemplo:

```text
formatCurrency()

↓

Input:
1500

↓

Output:
$1,500.00
```

---

# Reglas Unit Testing

Las pruebas unitarias deben:

- Ser rápidas.
- No depender de red.
- No depender de base de datos.
- Tener entradas y salidas claras.

Evitar:

- Probar detalles internos.
- Acoplar pruebas a implementación.

---

# Component Testing

## Objetivo

Validar que los componentes renderizan correctamente.

Aplicar principalmente a:

- Componentes reutilizables.
- Componentes con variantes.
- Componentes interactivos.

Ejemplos:

- Button.
- FormField.
- Modal.
- Gallery.
- Navigation.

---

# Componentes que requieren pruebas

Prioridad alta:

- Formularios.
- Navegación.
- Componentes con estados.
- Componentes reutilizados en múltiples páginas.
- Componentes con lógica condicional.

Prioridad baja:

- Componentes puramente visuales sin lógica.

---

# Validación de Props

Los componentes deben validar contratos esperados.

Ejemplo:

```ts
ButtonProps;

variant: "primary" | "secondary";

size: "small" | "large";
```

Debe verificarse:

- Valores permitidos.
- Valores por defecto.
- Comportamiento esperado.

---

# Integration Testing

## Objetivo

Validar interacción entre múltiples piezas del sistema.

Ejemplos:

```text
Form

+

Validation

+

Submit Action
```

o:

```text
Localization

+

Routing

+

Metadata
```

---

# Escenarios de integración

Validar especialmente:

- Formularios completos.
- Cambio de idioma.
- Navegación.
- Carga de contenido dinámico.
- Componentes compuestos.

---

# End-to-End Testing

## Objetivo

Validar flujos completos desde la perspectiva del usuario.

Los tests E2E deben representar acciones reales.

Ejemplo:

```text
Usuario entra a landing

↓

Selecciona idioma

↓

Completa formulario

↓

Envía solicitud

↓

Visualiza confirmación
```

---

# Flujos críticos E2E

Deben cubrirse:

## Navegación

Validar:

- Rutas existentes.
- Cambios de idioma.
- Links internos.

---

## Formularios

Validar:

- Campos obligatorios.
- Validaciones.
- Mensajes de error.
- Envío exitoso.

---

## Conversión

Para landing pages:

- CTA principales.
- Formularios de contacto.
- WhatsApp.
- Solicitud de cotización.

---

# Testing de Componentes Astro

Los componentes Astro deben priorizar renderizado estático.

Validar:

- HTML generado correctamente.
- Metadata generada.
- Estructura semántica.
- Props recibidas.

---

# Testing SEO

Debe existir validación automática para aspectos SEO.

Validar:

- Existe H1.
- Metadata completa.
- Canonical correcto.
- Hreflang válido.
- Sitemap generado.
- Robots configurado.
- Links internos válidos.

---

# Testing de Accesibilidad

Toda nueva funcionalidad debe validar accesibilidad.

Validar:

- HTML semántico.
- Labels.
- Navegación teclado.
- Contraste.
- Roles ARIA.
- Estados visibles.

---

# Testing de Performance

Las pruebas deben proteger rendimiento.

Validar:

- Tamaño de bundles.
- Imágenes optimizadas.
- JavaScript innecesario.
- Lighthouse score.
- Core Web Vitals.

---

# Testing de Localización

Todo contenido multilenguaje debe validarse.

Validar:

- Traducciones existentes.
- Keys faltantes.
- Rutas traducidas.
- Metadata localizada.
- Fallback correcto.

Comando:

```bash
pnpm validate:i18n
```

Debe ejecutarse:

- Manualmente.
- En precommit.
- Dentro de `pnpm validate`.

---

# Mocking

Los mocks deben utilizarse únicamente cuando aporten valor.

Utilizar para:

- APIs externas.
- Servicios terceros.
- Datos dinámicos.

Evitar:

- Mockear lógica propia innecesariamente.

---

# Organización de Tests

Los tests deben mantenerse organizados.

Ejemplo:

```text
src/

components/

Button/

├── index.astro
├── types.d.ts
├── constants.ts
└── Button.test.ts
```

o:

```text
tests/

├── unit/
├── integration/
└── e2e/
```

---

# Convención de nombres

Los tests deben describir comportamiento.

Correcto:

```text
Button renders disabled state
```

Incorrecto:

```text
Button test 1
```

---

# Pull Requests

Antes de aprobar un cambio validar:

- Tests existentes pasan.
- Nuevas funcionalidades tienen pruebas cuando aplica.
- No existen regresiones.
- Performance no empeora.
- SEO no se degrada.

---

# Precommit

Antes de crear un commit deben ejecutarse validaciones automáticas.

Ejemplo:

```bash
pnpm validate
```

Debe incluir:

```text
- Type checking
- Lint
- Formatting
- i18n validation
- SEO validation
- Tests
```

---

# CI/CD

El pipeline debe ejecutar validaciones antes de desplegar.

Flujo:

```text
Commit

↓

Precommit

↓

Pull Request

↓

CI Validation

↓

Build

↓

Deploy
```

---

# Regla para Nuevas Funcionalidades

Toda nueva funcionalidad debe considerar:

- Código.
- Componentes.
- Tests.
- SEO.
- Performance.
- Accesibilidad.
- Localización.

Una funcionalidad incompleta no debe considerarse terminada si no está validada.

---

# Checklist de Testing

```text
Nueva funcionalidad

↓

Definir comportamiento esperado

↓

Crear implementación

↓

Agregar tests necesarios

↓

Ejecutar validaciones

↓

Revisar performance

↓

Revisar accesibilidad

↓

Aprobar cambio
```

---

# Regla Final

El testing no existe únicamente para encontrar errores.

Existe para permitir que el producto evolucione con confianza.

Un sistema profesional debe poder cambiar, crecer y mantenerse sin perder calidad.
