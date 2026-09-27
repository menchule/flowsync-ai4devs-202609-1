# Alcance del MVP — FlowSync

## 1. Problema

FlowSync ya tiene el scaffolding de cuentas (signup, login, logout, perfil) construido, pero ningún dominio de producto todavía — no existe noción de tarea, equipo ni estado. El MVP a construir es el "gestor de estado del equipo sin ronda de daily": elimina la ronda de "¿en qué estás?" de la daily, que hoy se come la mitad de los 15 minutos. Quién cobra el valor son los pares, no un manager — no hay reporte hacia arriba y a un manager le daría igual. Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera; dos días perdidos.

## 2. Usuarios

Equipos remotos pequeños (3–10 personas), con roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.

Caso de estudio explícito: un equipo de producto SaaS de 6 personas, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un caso de estudio, no un cliente real.

## 3. Propuesta de valor

- **Qué resuelve y qué no:** la daily no desaparece entera. Desaparece la ronda de "¿en qué estás?"; la parte de bloqueos sigue existiendo, y este MVP no la resuelve.
- **"Tiempo real" es frescura, no presencia:** ver los cambios de estado de las tareas sin refrescar ni preguntar. El estado es de la tarea, no de la persona — nada de "quién está conectado ahora" ni indicadores de actividad.
- **Forma de la señal:** un resumen que espera, no un aviso que interrumpe. El caso de uso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido" — sin notificaciones push.
- **Decisión que habilita:** no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.
- **Por qué se sostiene:** son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va.
- **Riesgo #1:** que la información se quede vieja invalida el sentido del producto. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- **Criterio de éxito:** a una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Se documenta como el objetivo a validar — este ejercicio no incluye un piloto real ejecutado con un equipo.

## 4. Alcance (dentro del MVP)

- Crear una tarea con título, responsable, estado y fecha de vencimiento, en segundos y sin campos obligatorios extra.
- Cambiar el estado de una tarea.
- Ver la lista de tareas filtrable por estado, para centrarse en lo pendiente.
- El estado lo teclea la persona que hace la tarea — no se deriva de señales externas (Git/PRs, CI, calendario).
- FlowSync sustituye al gestor de tareas existente; no convive con él.
- Espacio único compartido para el equipo piloto, sin entidad "equipo".
- Alta abierta al espacio (reutiliza el signup ya construido).
- El tablero arranca vacío — sin importación de tareas existentes.

Propuestas de la IA para ampliar el alcance: 5. Quedaron dentro tras el recorte: 0.

## 5. NO-alcance (fuera del MVP, explícito como supuestos)

- Multi-equipo / múltiples espacios aislados.
- Sprints, estimaciones, épicas, backlog priorizado, informes.
- Integraciones externas (Git/PRs, CI, calendario) como fuente del estado.
- Notificaciones push.
- Integración con Slack.
- Roles/permisos avanzados, más allá de los roles planos ya descritos.
- Analítica/reporting.
- Comentarios en tareas.
- Indicadores de presencia/actividad ("quién está conectado ahora").
- Vista de historial/diff de cambios ("qué se ha movido desde tu última visita").
- Importación de tareas existentes desde el gestor pesado actual.
- Invitación/aprobación para el alta.
