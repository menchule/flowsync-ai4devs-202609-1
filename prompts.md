
---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
La tarea de hoy es crear un documento en docs/spec-viva que tenga las specs solamente de (1) lo que pasa por la API y (2) lo que se ve en pantalla. No se incluirá nada de cuentas y acceso. El formato no negociable es el siguiente: 

El formato lo fija esta lección, y no es negociable:

Arriba, un ## Purpose de una o dos frases: para qué existe esta capability.

Debajo, ## Requirements, y colgando de él ### Requirement: en los que el sistema SHALL hacer algo.

Bajo cada requisito, al menos un #### Scenario: de cuatro almohadillas, con dos viñetas: **WHEN** y **THEN**. No hay casilla para el GIVEN: la precondición se mete dentro del WHEN.

En castellano, salvo las mayúsculas de la RFC.

Y tres reglas duras, que son las que separan este ejercicio de escribir documentación:

Nada de ADDED, MODIFIED ni REMOVED. Eso es el vocabulario de un delta, y esto no es un delta: es la verdad actual del sistema. Si tu archivo tiene una de esas secciones, has escrito otra cosa.

Solo comportamiento observable desde fuera. Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer.
```

**Qué salió:** Exploró el repo, vio que fuera de cuentas y acceso casi no hay nada observable y me preguntó por el alcance antes de escribir.

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
vamos a comprobar que cada requisito esté bien y buscar posibles incoherencias en cada requisito. Vamos con el primero
```

**Qué salió:** Respondió con un plan de revisión del requisito 1 (6 hallazgos) en modo plan, sin editar.

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
1.Implementa el cambio que sugieres
2. No quites el título. Sustitúyelo por otro más apropiado 
3. Implementa la mejora que sugieres
4. No entiendo. Explícate mejor
5. Qué implicaciones tiene dejarlo o quitarlo? No sería mejor quitarlo para que quede especificado solo en un requisito y no se solapen? 
6. di mejor "JSON"
```

**Qué salió:** Aplicó los cambios al requisito 1 y explicó los puntos 4 y 5.

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Respecto al punto 4, déjalo así porque ya sale escrito en el when que es para casos sin credenciales. Vamos al siguiente requisito
```

**Qué salió:** Revisó el requisito 2 y propuso texto nuevo sin editar.

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
1. Implementa el cambio 
2. Implementa el cambio 
3. Implementa el cambio 
4. Implementa el cambio 
5. Implementa el cambio 
6. ok
Aplica los cambios tal cual y revisa otra vez
```

**Qué salió:** Aplicó los cambios (también al requisito 3) y en la segunda revisión pidió comprobar el preflight de CORS.

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
1. Compruébalo 
2. ok
```

**Qué salió:** El preflight devolvió 204 sin cuerpo: el «siempre» era falso y se acotó el requisito 2.

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
vamos con el requisito 3
```

**Qué salió:** Revisó el requisito 3 con 6 hallazgos.

## Prompt 8

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
1. Ok
2. pruébalo antes de sugerir nada respecto a esto
3. ok
4. ok
5. ok
6. ok
```

**Qué salió:** Mi primera prueba en producción no valía (respondió el servidor de desarrollo); la segunda confirmó que el requisito ya era correcto.

## Prompt 9

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Ya no vamos a analizar más los requisitos. Ahora vamos a analizar qué incoherencias ha habido hasta aghora. Comprueba lo que había escrito como requisitos inicialmente, lo que me has sugerido tú, y lo que he propuesto yo. Haz una línea de cada una, explicando dónde se ve.
```

**Qué salió:** Listó incoherencias en tres bloques (mías, sugeridas por Claude, tuyas).

## Prompt 10

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
archiva todos los prompts que he escrito hoy en prompts.md. Sigue primero las instrucciones que hay en prompts.md y después archiva los prompts que he escrito hoy.
```

**Qué salió:** Este archivo.
