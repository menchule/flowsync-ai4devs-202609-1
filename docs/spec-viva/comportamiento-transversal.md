## Purpose

Describe lo que cualquier cliente de la API y cualquier persona ante la pantalla observa de FlowSync con independencia de las cuentas y el acceso: cómo responde el servidor y qué ocurre al llegar a una dirección que no existe.

## Requirements

### Requirement: La raíz del servidor responde con un saludo fijo

El sistema SHALL responder a `GET /`, hecho al servidor de la API, con estado 200 y un cuerpo JSON `{"hello":"world"}`.

#### Scenario: Se consulta la raíz

- **WHEN** un cliente hace `GET /` al servidor de la API sin credenciales
- **THEN** recibe estado 200 con el cuerpo `{"hello":"world"}`

### Requirement: El servidor responde siempre en JSON

El sistema SHALL devolver cuerpos JSON con tipo de contenido JSON, aunque el cliente declare que prefiere otro formato.

#### Scenario: El cliente pide HTML

- **WHEN** un cliente hace `GET /` con la cabecera `Accept: text/html`
- **THEN** la respuesta tiene tipo de contenido JSON y su cuerpo es JSON válido

### Requirement: Una ruta de la API inexistente responde 404

El sistema SHALL responder con estado 404 y un campo `message` en el cuerpo cuando la combinación de método y ruta pedida no existe.

#### Scenario: Ruta que no existe

- **WHEN** un cliente hace `GET /api/v1/nada`
- **THEN** recibe estado 404 y un `message` con el valor `Cannot GET:/api/v1/nada`

#### Scenario: Método no admitido en una ruta existente

- **WHEN** un cliente hace `DELETE /`, siendo `/` una ruta que solo admite `GET`
- **THEN** recibe estado 404 y un `message` con el valor `Cannot DELETE:/`

### Requirement: Una dirección desconocida de la pantalla no muestra página de error

El sistema SHALL redirigir a la pantalla de inicio de la aplicación a quien navegue a una dirección que no corresponde a ninguna pantalla, sustituyendo la dirección en la barra del navegador y sin mostrar un mensaje de error.

#### Scenario: Se escribe una dirección inexistente

- **WHEN** una persona abre en el navegador una dirección de la aplicación que no corresponde a ninguna pantalla, como `/no-existe`
- **THEN** la aplicación la lleva a su pantalla de inicio, la dirección `/no-existe` no queda en el historial de navegación y no ve ninguna página de «no encontrado»
