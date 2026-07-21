# Security Strategy

## Objetivo

Este proyecto debe desarrollarse bajo una estrategia de **Security First**.

El objetivo es construir una aplicación segura desde la arquitectura inicial, reduciendo riesgos relacionados con:

- Exposición de información sensible.
- Vulnerabilidades de dependencias.
- Ataques comunes.
- Uso incorrecto de servicios externos.
- Manejo inseguro de datos.

La seguridad no debe agregarse como una corrección posterior.

Debe formar parte del diseño técnico desde el inicio.

---

# Principios de Seguridad

Reglas principales:

1. Nunca almacenar información sensible dentro del código.
2. Aplicar el principio de mínimo privilegio.
3. Validar toda entrada externa.
4. Mantener dependencias actualizadas.
5. Reducir superficie de ataque.
6. Evitar exposición innecesaria de información.
7. Utilizar configuraciones seguras por defecto.

---

# Variables de Entorno

Toda información sensible debe manejarse mediante variables de entorno.

Nunca almacenar directamente:

- API Keys.
- Tokens.
- Secretos.
- Credenciales.
- URLs privadas.
- Configuraciones sensibles.

Incorrecto:

```ts
const API_KEY = "secret-value";
```

Correcto:

```env
API_KEY=secret-value
```

---

# Archivo de Variables

Las variables deben separarse por ambiente.

Ejemplo:

```text
.env.local

.env.development

.env.staging

.env.production
```

---

# Reglas para Variables

Las variables deben:

- Tener nombres descriptivos.
- Documentarse cuando sea necesario.
- Definir si son públicas o privadas.

Ejemplo:

Pública:

```env
PUBLIC_SITE_URL=https://example.com
```

Privada:

```env
DATABASE_TOKEN=value
```

---

# Seguridad en Astro

Astro genera contenido estático principalmente, lo cual reduce superficie de ataque.

Reglas:

- Preferir generación estática.
- Evitar lógica sensible en componentes cliente.
- No exponer secretos en código frontend.
- No enviar información privada al navegador.

---

# JavaScript Cliente

Todo código enviado al navegador debe considerarse público.

Nunca incluir:

- Tokens privados.
- Llaves administrativas.
- Credenciales.
- Lógica sensible.

Incorrecto:

```javascript
fetch("https://api.com", {
  headers: {
    token: "secret",
  },
});
```

---

# Validación de Inputs

Toda entrada proporcionada por usuarios debe validarse.

Ejemplos:

- Formularios.
- Parámetros URL.
- Campos de contacto.
- Datos externos.

Validar:

- Tipo.
- Longitud.
- Formato.
- Caracteres permitidos.

---

# Formularios

Los formularios deben considerar:

- Validación cliente.
- Validación servidor cuando aplique.
- Protección contra spam.
- Manejo seguro de errores.

Nunca confiar únicamente en validación frontend.

---

# Protección contra Spam

Los formularios públicos deben implementar medidas cuando sea necesario.

Opciones:

- Honeypot fields.
- Rate limiting.
- CAPTCHA.
- Servicios anti-spam.

La implementación debe equilibrar:

- Seguridad.
- Experiencia del usuario.
- Conversión.

---

# Manejo de Errores

Los mensajes de error no deben revelar información sensible.

Incorrecto:

```text
Database connection failed:
user=root password=123
```

Correcto:

```text
Ocurrió un error inesperado.
Intenta nuevamente.
```

---

# Dependencias

Todas las dependencias deben mantenerse actualizadas.

Reglas:

- Revisar vulnerabilidades conocidas.
- Evitar paquetes abandonados.
- Reducir dependencias innecesarias.

---

# Auditoría de Dependencias

El proyecto debe ejecutar revisiones periódicas.

Ejemplo:

```bash
pnpm audit
```

Las vulnerabilidades críticas deben resolverse antes de producción.

---

# TypeScript

TypeScript debe utilizarse para reducir errores.

Reglas:

- Evitar `any`.
- Mantener contratos claros.
- Validar datos externos.

Incorrecto:

```ts
const data: any;
```

Correcto:

```ts
interface Data {
  title: string;
}
```

---

# Content Security Policy (CSP)

El proyecto debe considerar headers de seguridad.

Cuando aplique implementar:

- Content-Security-Policy.
- X-Frame-Options.
- X-Content-Type-Options.
- Referrer-Policy.

---

# Headers de Seguridad

La aplicación debe utilizar headers seguros.

Recomendados:

```text
Content-Security-Policy

X-Content-Type-Options

X-Frame-Options

Referrer-Policy

Permissions-Policy
```

---

# HTTPS

Toda versión pública debe utilizar HTTPS.

Reglas:

- No permitir tráfico inseguro.
- Redireccionar HTTP a HTTPS.
- Utilizar certificados válidos.

---

# Cookies

Cuando existan cookies:

- Utilizar flags seguros.
- Evitar almacenar información sensible.
- Definir correctamente:

```text
Secure

HttpOnly

SameSite
```

---

# Analytics y Tracking

Los sistemas de analítica deben respetar privacidad.

Consideraciones:

- No enviar información personal innecesaria.
- No almacenar datos sensibles.
- Configurar correctamente consentimiento cuando aplique.

---

# SEO y Seguridad

Las configuraciones de seguridad no deben afectar indexación.

Validar:

- Googlebot puede acceder al contenido público.
- Robots configurado correctamente.
- No bloquear recursos necesarios.
- Headers compatibles con SEO.

---

# Imágenes y Assets

Los archivos públicos deben estar optimizados y controlados.

Evitar:

- Archivos innecesarios.
- Información sensible en metadata.
- Nombres con información privada.

---

# Seguridad en CI/CD

El pipeline debe considerar seguridad.

Validar:

- Dependencias vulnerables.
- Secretos expuestos.
- Permisos correctos.
- Variables protegidas.

---

# Secret Management

Los secretos deben administrarse mediante:

- Variables del proveedor de CI/CD.
- Secret managers.
- Configuración protegida.

Nunca mediante:

- Git.
- Archivos públicos.
- Código fuente.

---

# Git Security

Nunca subir:

```text
.env

.env.local

*.secret

credentials.json
```

El repositorio debe contener:

```text
.env.example
```

sin valores reales.

---

# Revisión de Código

Los cambios deben revisarse considerando:

- Manejo de datos.
- Exposición de información.
- Nuevas dependencias.
- Cambios de permisos.
- Configuración.

---

# Seguridad por Ambiente

Cada ambiente debe tener configuraciones independientes.

Ejemplo:

```text
Development

↓

Staging

↓

Production
```

Nunca reutilizar secretos de producción en desarrollo.

---

# Checklist de Seguridad

Antes de aprobar cambios:

```text
Nuevo cambio

↓

Revisar variables

↓

Validar inputs

↓

Revisar dependencias

↓

Ejecutar auditoría

↓

Validar configuración

↓

Aprobar
```

---

# Regla Final

La seguridad debe ser una característica inherente del sistema.

Un proyecto profesional no solamente debe funcionar correctamente.

Debe proteger:

- El código.
- Los usuarios.
- La información.
- La infraestructura.

Security First significa diseñar correctamente desde el inicio, no corregir problemas después.
