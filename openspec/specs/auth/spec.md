# auth Specification

## Purpose

Cuentas y acceso de FlowSync: registro de personas, inicio y cierre de sesión, mantenimiento de la sesión entre visitas y consulta del perfil propio. Describe lo que el sistema hace hoy, tanto en la API HTTP como en lo que la persona ve y puede hacer en pantalla.

## Requirements

### Requirement: Registro de una cuenta nueva

El sistema SHALL permitir crear una cuenta con una petición de registro que incluya nombre completo (puede ser nulo), email, contraseña y confirmación de contraseña, y SHALL responder con los datos públicos de la persona y un token de acceso, de modo que quede con la sesión iniciada.

#### Scenario: Registro con datos válidos
- **WHEN** se envía un registro con un email no usado, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** la respuesta es correcta, con el usuario creado y un token de acceso dentro de la propiedad `data` de la respuesta

#### Scenario: Registro sin nombre
- **WHEN** se envía un registro válido con el nombre completo a nulo
- **THEN** la cuenta se crea igualmente y el usuario devuelto tiene el nombre a nulo

#### Scenario: Registro con el nombre vacío enviado directamente a la API
- **WHEN** se envía un registro válido con el nombre completo como cadena vacía
- **THEN** la cuenta se crea con el nombre vacío (no se convierte en nulo)

#### Scenario: Registro con el nombre omitido
- **WHEN** se envía un registro sin la clave del nombre completo
- **THEN** la respuesta es un error de validación (422) que señala ese campo como obligatorio

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar con un error de validación (422), indicando el campo afectado, los registros cuyo email no sea una dirección válida o supere los 254 caracteres, cuya contraseña o confirmación tengan menos de 8 o más de 32 caracteres, o cuya confirmación no coincida con la contraseña.

#### Scenario: Email ya registrado
- **WHEN** se envía un registro con un email que ya pertenece a otra cuenta
- **THEN** la respuesta es un error de validación (422) sobre el campo email y no se crea ninguna cuenta

#### Scenario: Email con formato inválido
- **WHEN** se envía un registro con un email que no es una dirección válida
- **THEN** la respuesta es un error de validación (422) sobre el campo email

#### Scenario: Contraseña demasiado corta
- **WHEN** se envía un registro con una contraseña de menos de 8 caracteres
- **THEN** la respuesta es un error de validación (422) sobre el campo contraseña

#### Scenario: Contraseña demasiado larga
- **WHEN** se envía un registro con una contraseña de más de 32 caracteres
- **THEN** la respuesta es un error de validación (422) sobre el campo contraseña

#### Scenario: Confirmación distinta
- **WHEN** se envía un registro cuya confirmación de contraseña no coincide con la contraseña
- **THEN** la respuesta es un error de validación (422) sobre el campo de confirmación

### Requirement: Inicio de sesión con credenciales

El sistema SHALL permitir iniciar sesión con email y contraseña y, si son correctos, SHALL responder con los datos públicos de la persona y un token de acceso nuevo.

#### Scenario: Credenciales correctas
- **WHEN** se envía un inicio de sesión con el email y la contraseña de una cuenta existente
- **THEN** la respuesta es correcta, con el usuario y un token de acceso dentro de la propiedad `data` de la respuesta

#### Scenario: Credenciales incorrectas
- **WHEN** se envía un inicio de sesión con una contraseña errónea o con un email que no corresponde a ninguna cuenta
- **THEN** la respuesta es un error 400 y no se entrega ningún token

#### Scenario: Datos de inicio de sesión mal formados
- **WHEN** se envía un inicio de sesión sin email, con un email que no es una dirección válida o sin contraseña
- **THEN** la respuesta es un error de validación (422) sobre el campo afectado

### Requirement: Datos públicos del usuario

El sistema SHALL devolver cada usuario, en registro, inicio de sesión y perfil, únicamente con su identificador, nombre completo, email, fechas de creación y de última actualización e iniciales, y SHALL NOT exponer nunca la contraseña.

#### Scenario: Iniciales de una persona con nombre y apellido
- **WHEN** se devuelve un usuario cuyo nombre completo tiene al menos dos palabras
- **THEN** sus iniciales son la primera letra de la primera y de la segunda palabra, en mayúsculas

#### Scenario: Iniciales de una persona con una sola palabra en el nombre
- **WHEN** se devuelve un usuario cuyo nombre completo es una única palabra, o tiene dos espacios seguidos entre palabras
- **THEN** sus iniciales son las dos primeras letras de la primera palabra, en mayúsculas

#### Scenario: Iniciales de una persona sin nombre
- **WHEN** se devuelve un usuario con el nombre completo nulo o vacío
- **THEN** sus iniciales son las dos primeras letras de su email, en mayúsculas

#### Scenario: La contraseña no se expone
- **WHEN** se registra una persona, inicia sesión o consulta su perfil
- **THEN** la respuesta no contiene la contraseña ni ningún derivado de ella

### Requirement: Consulta del perfil propio

El sistema SHALL devolver los datos públicos de la persona autenticada (los tokens no caducan por tiempo: solo dejan de valer al revocarse) cuando se consulta su perfil con un token de acceso válido.

#### Scenario: Perfil con token válido
- **WHEN** se consulta el perfil con un token de acceso en la cabecera de autorización con el esquema Bearer (`Authorization: Bearer <token>`)
- **THEN** la respuesta es correcta y contiene los datos públicos de la persona dueña del token

#### Scenario: Perfil sin token
- **WHEN** se consulta el perfil sin cabecera de autorización
- **THEN** la respuesta es un error 401

#### Scenario: Perfil con token inválido
- **WHEN** se consulta el perfil con un token inexistente, manipulado o ya revocado
- **THEN** la respuesta es un error 401

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar sesión a la persona autenticada revocando el token con el que se hace la petición, sin afectar a los demás tokens de su cuenta.

#### Scenario: Cierre de sesión correcto
- **WHEN** se solicita el cierre de sesión con un token vigente
- **THEN** la respuesta es correcta con un mensaje de confirmación (hoy en inglés, «Logged out successfully») y ese token deja de ser aceptado

#### Scenario: Otras sesiones siguen activas
- **WHEN** una persona tiene dos tokens vigentes y cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo aceptado

#### Scenario: Cierre de sesión sin token
- **WHEN** se solicita el cierre de sesión sin token de acceso válido
- **THEN** la respuesta es un error 401

### Requirement: Formato uniforme de las respuestas de la API

El sistema SHALL responder siempre en JSON, con los datos útiles de las respuestas correctas dentro de una propiedad de datos y los fallos de validación (422) como una lista de errores con su mensaje, regla y campo. Los errores de credenciales (400) y de acceso no autorizado (401) también son JSON, pero no tienen por qué incluir regla ni campo.

#### Scenario: Respuesta correcta envuelta
- **WHEN** una petición de registro, inicio de sesión o perfil tiene éxito
- **THEN** el cuerpo es un objeto JSON cuya propiedad de datos contiene el resultado

#### Scenario: Cliente que no pide JSON
- **WHEN** se hace una petición a la API con una cabecera de aceptación distinta de JSON
- **THEN** la respuesta, correcta o de error, sigue siendo JSON

### Requirement: Pantalla de registro

El sistema SHALL ofrecer una pantalla de registro con los campos nombre completo (marcado como opcional), email, contraseña (con la indicación «Entre 8 y 32 caracteres») y repetición de la contraseña, un botón para crear la cuenta y un enlace a la pantalla de inicio de sesión.

#### Scenario: Registro correcto desde la pantalla
- **WHEN** la persona rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** el botón muestra «Creando cuenta…» mientras se procesa y después la persona queda con la sesión iniciada y ve su perfil

#### Scenario: Nombre vacío
- **WHEN** la persona deja el nombre en blanco o solo con espacios y envía el formulario
- **THEN** la cuenta se crea sin nombre

#### Scenario: Contraseñas que no coinciden
- **WHEN** la persona envía el formulario con la repetición distinta de la contraseña
- **THEN** ve bajo el campo de repetición el mensaje «Las contraseñas no coinciden.» sin que se produzca ninguna petición al servidor

#### Scenario: Email ya registrado
- **WHEN** la persona envía un email que ya tiene cuenta
- **THEN** ve bajo el campo de email el mensaje «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: Error de validación del servidor sobre otro campo
- **WHEN** el servidor rechaza el formulario por un campo, por ejemplo una contraseña demasiado corta
- **THEN** la persona ve un mensaje en castellano bajo ese campo y el formulario conserva lo que había escrito

#### Scenario: Indicación de longitud de la contraseña
- **WHEN** el campo de contraseña no tiene error
- **THEN** se ve la indicación «Entre 8 y 32 caracteres.», que se sustituye por el mensaje de error cuando ese campo falla

#### Scenario: Servidor inaccesible al registrarse
- **WHEN** la persona envía el formulario y no hay conexión con el servidor
- **THEN** ve un aviso que indica que no se pudo conectar con el servidor

#### Scenario: Ir a iniciar sesión
- **WHEN** la persona pulsa «Inicia sesión» en el pie de la pantalla de registro
- **THEN** pasa a la pantalla de inicio de sesión

### Requirement: Pantalla de inicio de sesión

El sistema SHALL ofrecer una pantalla de inicio de sesión con los campos email y contraseña, un botón «Entrar» y un enlace a la pantalla de registro.

#### Scenario: Inicio de sesión correcto desde la pantalla
- **WHEN** la persona introduce credenciales válidas y pulsa «Entrar»
- **THEN** el botón muestra «Entrando…» mientras se procesa y después la persona ve su perfil

#### Scenario: Credenciales incorrectas
- **WHEN** la persona introduce un email o una contraseña erróneos
- **THEN** ve un aviso de error con el texto «El email o la contraseña no son correctos.» y permanece en la pantalla de inicio de sesión

#### Scenario: Datos de inicio de sesión inválidos
- **WHEN** la persona envía el formulario con la contraseña vacía o con un email que no es una dirección válida
- **THEN** ve el mensaje correspondiente en castellano bajo ese campo, tras la respuesta del servidor

#### Scenario: Servidor inaccesible
- **WHEN** la persona envía el formulario y no hay conexión con el servidor
- **THEN** ve un aviso que indica que no se pudo conectar con el servidor

#### Scenario: Error inesperado del servidor
- **WHEN** el servidor responde con un fallo distinto de validación y de credenciales
- **THEN** ve un aviso de que algo ha ido mal en el servidor y puede volver a intentarlo

#### Scenario: Ir a crear cuenta
- **WHEN** la persona pulsa «Crea una» en el pie de la pantalla de inicio de sesión
- **THEN** pasa a la pantalla de registro

### Requirement: Mensajes de error comprensibles en los formularios

El sistema SHALL mostrar los errores de los formularios de acceso en castellano, junto al campo afectado cuando éste está en pantalla, y en un aviso general en caso contrario.

#### Scenario: Error en un campo visible
- **WHEN** el servidor rechaza únicamente campos que están en el formulario
- **THEN** cada mensaje aparece bajo su campo y no se muestra aviso general

#### Scenario: Error en un campo no visible
- **WHEN** el servidor rechaza un campo que el formulario no muestra
- **THEN** el mensaje aparece en el aviso general de la parte superior del formulario

#### Scenario: Campo con varios errores
- **WHEN** un mismo campo incumple varias reglas a la vez
- **THEN** la persona ve solo el primer mensaje de ese campo

#### Scenario: Error en campos visibles y no visibles a la vez
- **WHEN** el servidor rechaza a la vez campos visibles y no visibles
- **THEN** los mensajes de los campos visibles aparecen bajo cada campo y además se muestra el aviso general

#### Scenario: Nuevo envío
- **WHEN** la persona vuelve a enviar el formulario tras un error de ese intento
- **THEN** los errores del intento anterior desaparecen mientras se procesa el nuevo

#### Scenario: Aviso de sesión perdida al reenviar el login
- **WHEN** la pantalla de inicio de sesión muestra el aviso de sesión perdida y la persona reenvía el formulario
- **THEN** el aviso sigue visible mientras se procesa y solo desaparece si el inicio de sesión tiene éxito; si falla, lo sustituye el error del nuevo intento

### Requirement: Persistencia de la sesión entre visitas

El sistema SHALL conservar la sesión iniciada en el navegador de la persona para que siga autenticada al recargar la página o volver más tarde, y SHALL validar esa sesión contra el servidor antes de darla por buena.

#### Scenario: Recarga con sesión válida
- **WHEN** la persona recarga la página con una sesión guardada que el servidor aún reconoce
- **THEN** ve un indicador de carga mientras se comprueba y a continuación su perfil, sin pasar por la pantalla de inicio de sesión

#### Scenario: Sesión caducada o revocada
- **WHEN** la persona abre la aplicación con una sesión guardada que el servidor rechaza como no autorizada (401)
- **THEN** pasa a la pantalla de inicio de sesión, que le muestra el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.», y la sesión guardada se descarta

#### Scenario: Servidor caído al restaurar la sesión
- **WHEN** la persona abre la aplicación con una sesión guardada y el servidor no responde o falla
- **THEN** pasa a la pantalla de inicio de sesión con un aviso que explica el fallo, y la sesión guardada se conserva para poder recuperarla al recargar cuando el servidor vuelva

#### Scenario: Aviso que se limpia
- **WHEN** la persona inicia sesión con éxito tras haber visto el aviso de sesión perdida
- **THEN** el aviso deja de mostrarse

### Requirement: Protección de las pantallas según el estado de sesión

El sistema SHALL permitir ver el perfil solo con sesión iniciada, y SHALL impedir ver las pantallas de registro y de inicio de sesión a quien ya la tiene, sin redirigir mientras se está comprobando la sesión guardada.

#### Scenario: Perfil sin sesión
- **WHEN** una persona sin sesión intenta abrir la pantalla de perfil
- **THEN** es llevada a la pantalla de inicio de sesión

#### Scenario: Login o registro con sesión
- **WHEN** una persona con sesión iniciada intenta abrir la pantalla de inicio de sesión o de registro
- **THEN** es llevada a su perfil

#### Scenario: Comprobación en curso
- **WHEN** la aplicación está validando una sesión guardada
- **THEN** la persona ve un indicador de carga y no es redirigida hasta que se resuelva

#### Scenario: Dirección desconocida
- **WHEN** una persona abre una dirección que no corresponde a ninguna pantalla
- **THEN** es llevada al perfil, y desde ahí a inicio de sesión si no tiene sesión

### Requirement: Pantalla de perfil

El sistema SHALL mostrar a la persona con sesión iniciada sus iniciales, su nombre completo, su email y la fecha desde la que es miembro, y un botón para cerrar sesión.

#### Scenario: Perfil con nombre
- **WHEN** una persona con nombre completo abre su perfil
- **THEN** ve sus iniciales, su nombre, su email y «Miembro desde» con la fecha de alta en formato largo en castellano

#### Scenario: Perfil sin nombre
- **WHEN** una persona registrada con el nombre nulo abre su perfil
- **THEN** ve «Sin nombre» donde iría su nombre

### Requirement: Cierre de sesión desde la pantalla

El sistema SHALL permitir cerrar sesión desde el perfil y SHALL dejar a la persona sin sesión aunque la petición al servidor falle.

#### Scenario: Cierre correcto
- **WHEN** la persona pulsa «Cerrar sesión»
- **THEN** la sesión guardada se elimina y la persona es llevada a la pantalla de inicio de sesión

#### Scenario: Cierre con el servidor inaccesible
- **WHEN** la persona pulsa «Cerrar sesión» y el servidor no responde o rechaza el token
- **THEN** la persona igualmente queda sin sesión, sin ver ningún error, y es llevada a la pantalla de inicio de sesión
