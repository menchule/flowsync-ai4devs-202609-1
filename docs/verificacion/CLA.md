# Trazabilidad: «Lo que cada tarea muestra de su responsable»

Scenarios del requisito: 3 · Cubiertos: 2

| Scenario | Test que lo cubre | Estado | Qué faltó para decidirlo |
|---|---|---|---|
| Un responsable "Ada Lovelace" llega en `assignee` con su nombre y sus iniciales | `el responsable de una tarea llega con su nombre y sus iniciales` | Cubierto | — |
| El `assignee` de una tarea, suelta o en lista, no incluye el email ni otros datos de cuenta | `el responsable de una tarea, suelta o en lista, no trae su email ni otros datos de cuenta` (falla) | No cubierto | — |
| Un responsable sin nombre llega con nombre nulo e iniciales presentes | `el responsable sin nombre llega con el nombre nulo y con iniciales` | No lo sé | — |

## Notas

- **Fila 1:** el test está en el PR #2 (base `s4/start`) y no en `s4/start`. Quien consulta y el responsable son la misma cuenta, así que el test no distinguiría un `assignee = auth.user`. Pendiente de endurecer.
- **Fila 2:** el test existe en `backend/tests/functional/tasks/assignee_privacy.spec.ts` (rama `feat/test-assignee-sin-datos-de-cuenta`, sin commitear). Falla porque `GET /tasks` serializa el `assignee` con `UserTransformer` (`task_transformer.ts`) y filtra email y fechas. Un test que falla no cuenta como cobertura. La parte de la tarea suelta sí pasa.
- **Fila 3:** el test está en `backend/tests/functional/tasks/assignee_unnamed.spec.ts` (rama `feat/test-assignee-sin-nombre`, sin commitear). Pasa. Falta la comprobación de mutación.
- **`id` en `assignee`:** los tests de la fila 2 permiten `id`, `fullName` e `initials`. La spec dice «ningún otro dato de esa cuenta», y no aclara si un `id` interno cuenta.

## Parte B
1. Antes de empezar: alguno al menos. Al mirarlo: ninguno de 3. 
2. El scenario 2: porque para que se aceptara el test había que cambiar los requisitos, invita a una reunión con producto ;)  
3. En el scenario 3: ¿qué pasa si falla el test? Es tan importante ver el nombre en vez de las iniciales si está el mail? 