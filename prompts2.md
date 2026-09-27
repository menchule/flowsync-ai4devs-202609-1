# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git fetch upstream
```

**Qué salió:** sin salida — ya estaba al día con upstream.

---

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git checkout -b s2/start upgstream/s2/start
```

**Qué salió:** falló — la rama `s2/start` ya existía localmente (y hay un typo, "upgstream").

---

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git reset --hard upstream/s2/start
```

**Qué salió:** no-op — el árbol de trabajo ya estaba limpio y al día.

---

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
make start
```

**Qué salió:** el frontend falló al arrancar — faltaba `@tailwindcss/vite` en `node_modules` (stale desde antes del reset de rama).

---

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
pwd
```

**Qué salió:** confirmó el directorio de trabajo tras el `cd` a `frontend/`.

---

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
make start
```

**Qué salió:** arrancó bien tras el `npm install`; el log del backend mostró un puerto interno distinto al esperado (canal de control de HMR, no un problema real).

---

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
The task today is to write an MVP of FlowSync in docs/prd/alcance-mvp-CLA.md. To honor what already exists and to avoid specifying twice, return which capabilities are already build and how is the current data model in 3-5 lines.
```

**Qué salió:** resumen de capacidades ya construidas (auth/perfil) y del modelo de datos actual (`users`, `auth_access_tokens`), vía dos agentes Explore en paralelo.

---

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Before that, ask me 5 questions that would best reduce uncertainty about the problem, users and reach. Make each question 1 round only. You cannot lower down the data model or go to the end points. I am giving you some more context before you begin with the questions:

- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
```

**Qué salió:** 5 preguntas de una ronda cada una vía `AskUserQuestion`; las 5 se resolvieron eligiendo la opción recomendada/más recortada.

---

## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas. Add this in the updated plan
```

**Qué salió:** se añadió a la sección "fuera de alcance" del plan.

---

## Prompt 10

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Restructure the plan in 5 sections: Problema, usuarios, propuesta de valor, alcence, NO-alcance. and include the following (you did not include it last time) "- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas. Add this in the updated plan"
```

**Qué salió:** reestructuración completa del plan en las 5 secciones pedidas.

---

## Prompt 11

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Delete the contexto section, it is not needed. compact the content of the Contexto section and add it in the Problema in 2-3 sentences
```

**Qué salió:** se eliminó la sección "Contexto" y su contenido se comprimió dentro de "Problema".

---

## Prompt 12

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
use the branch s2/start. Then write the md
```

**Qué salió:** se escribió `docs/prd/alcance-mvp-CLA.md` directamente en `s2/start`, sin crear rama nueva.

---

## Prompt 13

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
add in the 4.Alcance section Two numbers: Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.
```

**Qué salió:** se añadió "Propuestas de la IA para ampliar el alcance: 5. Quedaron dentro tras el recorte: 0." al final de la sección 4.

---

## Prompt 14

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
why don't I see it in the md?
```

**Qué salió:** el archivo en disco sí tenía la línea; era un problema de refresco del editor, no del contenido.

---

## Prompt 15

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
reload the file
```

**Qué salió:** re-lectura del archivo confirmó que el contenido en disco era correcto.

---

## Prompt 16

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Cuáles han sido las 5 propuestas para ampliar el alcance?
```

**Qué salió:** se listaron las 5 propuestas recortadas (historial de cambios, multi-equipo, validación real con equipo, alta con invitación, importación de tareas).

---

## Prompt 17

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Generate a prompts2.md file with all my prompts from today. Use the same structure as prompts.md
```

**Qué salió:** (este mismo archivo).
