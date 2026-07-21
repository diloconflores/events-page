# Forms Strategy

## Objetivo

Este proyecto debe implementar una estrategia de formularios orientada a:

- Conversión.
- Experiencia de usuario.
- Seguridad.
- Accesibilidad.
- Medición.
- Mantenimiento.

Los formularios representan un punto crítico del negocio, por lo que deben diseñarse considerando:

- Usuarios reales.
- SEO.
- Analytics.
- Seguridad.
- Escalabilidad.

---

# Principios de Formularios

Reglas principales:

1. Los formularios deben ser simples y claros.
2. La información solicitada debe ser únicamente necesaria.
3. La lógica debe estar separada de la interfaz.
4. Los formularios deben ser accesibles.
5. Toda interacción importante debe medirse.
6. La validación no debe depender únicamente del cliente.
7. Los proveedores externos deben estar desacoplados.

---

# Arquitectura General

La arquitectura debe seguir separación de responsabilidades:

```text
User

↓

Form Component

↓

Form Logic

↓

Form Service

↓

Provider Adapter

↓

External Service
```

El componente visual nunca debe comunicarse directamente con servicios externos.

---

# Proveedor de Formularios

El proyecto utilizará:

```text
Formspree
```

como proveedor principal para recepción y procesamiento de formularios.

Responsabilidades de Formspree:

- Recepción de envíos.
- Manejo de notificaciones.
- Almacenamiento temporal según configuración.
- Integración con herramientas externas.

---

# Integración con Formspree

La integración debe estar abstraída.

No realizar llamadas directamente dentro de componentes.

Incorrecto:

```astro
<form action="https://formspree.io/f/example">
```

dentro de un componente complejo con lógica adicional.

Correcto:

```text
Form Component

↓

Form Service

↓

Formspree Integration
```

---

# Estructura Recomendada

Ejemplo:

```text
src/

├── components/
│   └── organisms/
│       └── ContactForm/
│
├── services/
│   └── forms/
│       ├── index.ts
│       ├── formspree.ts
│       ├── constants.ts
│       └── types.d.ts
```

---

# Form Service

Responsabilidad:

- Manejar envío de formularios.
- Normalizar respuestas.
- Manejar errores.
- Ocultar detalles del proveedor.

Ejemplo conceptual:

```ts
submitForm(data);
```

El resto de la aplicación no debe conocer que existe Formspree.

---

# Formspree Adapter

Responsabilidad:

- Comunicación específica con Formspree.
- Construcción del request.
- Manejo de respuesta.

Ejemplo:

```text
FormService

↓

FormspreeAdapter

↓

Formspree
```

Esto permite cambiar de proveedor en el futuro sin modificar componentes.

---

# Tipado

Todos los formularios deben estar tipados.

Los tipos deben vivir en:

```text
types.d.ts
```

Ejemplo:

```text
ContactForm/

├── index.astro
├── constants.ts
└── types.d.ts
```

No crear interfaces dispersas.

---

# Tipos de Formularios

Cada formulario debe definir su contrato.

Ejemplo:

```ts
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
}
```

---

# Validación

Todos los formularios deben validar información.

Validaciones mínimas:

- Campos requeridos.
- Formato de email.
- Longitud máxima.
- Formatos de fecha.
- Valores permitidos.

---

# Validación Cliente

Debe mejorar experiencia.

Ejemplos:

- Mostrar errores inmediatos.
- Evitar envíos incompletos.
- Ayudar al usuario.

No debe considerarse una medida de seguridad.

---

# Validación Servidor

Cuando aplique, validar nuevamente.

Nunca confiar únicamente en:

```text
JavaScript del navegador
```

---

# Campos del Formulario

Solicitar únicamente información necesaria.

Ejemplo:

Formulario de eventos:

```text
Nombre

Email

Teléfono

Tipo de evento

Fecha del evento

Número aproximado de invitados

Mensaje
```

Evitar:

- Campos irrelevantes.
- Formularios demasiado largos.
- Información que no será utilizada.

---

# Experiencia de Usuario

Los formularios deben:

- Tener etiquetas claras.
- Mostrar estados.
- Indicar errores.
- Confirmar envío exitoso.

Estados mínimos:

```text
Idle

↓

Editing

↓

Submitting

↓

Success

↓

Error
```

---

# Accesibilidad

Los formularios deben cumplir:

- Labels asociados.
- Navegación por teclado.
- Mensajes de error accesibles.
- Contraste adecuado.

Ejemplo:

Correcto:

```html
<label for="email"> Email </label>

<input id="email" />
```

---

# Anti Spam

Los formularios públicos deben considerar protección contra spam.

Opciones:

- Honeypot.
- Rate limiting.
- CAPTCHA cuando sea necesario.
- Validaciones adicionales.

La protección no debe afectar negativamente la conversión.

---

# Seguridad

Nunca enviar:

- Tokens privados.
- Información sensible innecesaria.
- Secretos.

La integración con Formspree debe utilizar únicamente configuración pública necesaria.

---

# Analytics

Los formularios deben integrarse con Analytics.

Eventos recomendados:

```text
form_view

form_start

form_submit

form_success

form_error
```

---

# Parámetros Analytics

Registrar:

```text
form_name

page

language

source
```

No registrar:

```text
name

email

phone

message
```

---

# Conversión Principal

El envío exitoso debe considerarse una conversión.

Evento:

```text
form_success
```

Ejemplo:

```text
Formulario boda enviado correctamente
```

---

# SEO y Formularios

Los formularios no deben afectar indexación.

Reglas:

- El contenido importante debe existir fuera del formulario.
- No esconder contenido SEO dentro de campos dinámicos.
- Mantener HTML accesible.

---

# Formularios Multilenguaje

Los formularios deben soportar todos los idiomas disponibles.

Debe traducirse:

- Labels.
- Placeholders.
- Mensajes.
- Validaciones.
- Confirmaciones.

Ejemplo:

Español:

```text
Solicitar cotización
```

Inglés:

```text
Request a quote
```

---

# Manejo de Errores

Los errores deben ser claros.

Incorrecto:

```text
Formspree error 422
```

Correcto:

```text
No pudimos enviar tu solicitud.
Intenta nuevamente.
```

---

# Loading State

Durante envío:

Debe:

- Evitar múltiples envíos.
- Mostrar progreso.
- Bloquear acciones duplicadas.

---

# Success State

Después de enviar:

Mostrar:

- Confirmación clara.
- Próximo paso esperado.
- Alternativa de contacto.

Ejemplo:

```text
Gracias por contactarnos.

Nuestro equipo se comunicará contigo pronto.
```

---

# Estructura de Componentes

Ejemplo:

```text
ContactForm/

├── index.astro
├── constants.ts
├── types.d.ts
└── logic.ts
```

Responsabilidades:

## index.astro

UI.

---

## logic.ts

Comportamiento:

- Estado.
- Validación.
- Envío.

---

## constants.ts

Configuraciones:

- Campos.
- Mensajes.
- Reglas.

---

## types.d.ts

Contratos.

---

# Testing

Los formularios deben tener pruebas para:

- Renderizado.
- Validación.
- Estados.
- Envío exitoso.
- Manejo de errores.

---

# Checklist Nueva Forma

Antes de crear un formulario:

```text
Definir objetivo

↓

Definir campos necesarios

↓

Crear tipos

↓

Crear componente

↓

Separar lógica

↓

Integrar servicio

↓

Configurar Formspree

↓

Agregar Analytics

↓

Validar accesibilidad

↓

Crear tests
```

---

# Regla Final

Un formulario no es únicamente un conjunto de inputs.

Es un punto de conversión crítico que debe diseñarse considerando:

- Usuario.
- Negocio.
- Datos.
- Seguridad.
- Experiencia.

La implementación debe permitir evolucionar el sistema sin depender de un proveedor específico.
