
## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Lee los scenarios de la spec viva "lo que cada tarea muestra de su responsable"  y los tests existentes. 
Genera una tabla de trazabilidad: cada criterio de aceptación → qué prueba lo cubre → cubierto / NO cubierto.
No cambies nada. El formato de la tabla es el siguiente: 



una fila por scenario y cuatro columnas. Encima, dos números: cuántos scenarios tiene el requisito y cuántos resultaron cubiertos — el primero se anota al empezar, el segundo al terminar.

El scenario, en una línea. Qué se espera y en qué situación. Si no cabe en una línea, es que estás juntando dos.

Qué test lo cubre, con el nombre exacto que aparece en la suite. Sin el nombre concreto, la columna va vacía: "seguro que algo lo cubre" no es una fila.

Cubierto · No cubierto · No lo sé. Los tres estados son válidos, y el tercero no es un fallo: es el resultado más informativo de los tres.

Si pusiste "no lo sé", qué te faltó para decidirlo. Media línea. Suele ser una de dos: no encontraste dónde se comprueba, o encontraste algo que se le parece y no dice exactamente lo mismo.
```

**Qué salió:** Tabla correcta a la primera: 0/3 cubiertos.

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Vamos a arreglar los hallazgos uno a uno. Empezamos con el primer escenario. añade un test que cubra el primero.
```

**Qué salió:** Quedó en modo plan y no me dejó editar; hubo que insistir.

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Yes, ejecuta y  actualiza la tabla de trazabilidad y pasamos al siguiente escenario
```

**Qué salió:** Respuesta al rechazo del plan. Test hecho, commit y PR #2.

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Enséñame la tabla actualizada
```

**Qué salió:** Funcionó. La revisión adversarial señaló que el test era más débil que la spec.

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Añade un test que cubra el segundo scenario
```

**Qué salió:** El test falla a propósito: destapó un bug real (la lista filtra el email).

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Déjalo así tal y como está. Pasamos al siguiente scenario. Crea un test para cubrirlo
```

**Qué salió:** Test del scenario 3 escrito y pasando; el modo plan volvió a interponerse.

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Enséñame la tabla actualizada, te recuerdo el formato: una fila por scenario y cuatro columnas. Encima, dos números: cuántos scenarios tiene el requisito y cuántos resultaron cubiertos — el primero se anota al empezar, el segundo al terminar.El scenario, en una línea. Qué se espera y en qué situación. Si no cabe en una línea, es que estás juntando dos.Qué test lo cubre, con el nombre exacto que aparece en la suite. Sin el nombre concreto, la columna va vacía: "seguro que algo lo cubre" no es una fila.Cubierto · No cubierto · No lo sé. Los tres estados son válidos, y el tercero no es un fallo: es el resultado más informativo de los tres.Si pusiste "no lo sé", qué te faltó para decidirlo. Media línea. Suele ser una de dos: no encontraste dónde se comprueba, o encontraste algo que se le parece y no dice exactamente lo mismo.
```

**Qué salió:** Funcionó.

## Prompt 8

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
escribe la matriz de trazabilidad y las notas en docs/verificacion/CLA.md
```

**Qué salió:** No pude escribir: seguía en modo plan; di el texto en el chat.

## Prompt 9

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
mantén la tabla en el formato que te he escrito antes
```

**Qué salió:** Respuesta a otro rechazo; volví a dar el contenido en el formato pedido.

## Prompt 10

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
he salido del modo plan, escribe el texto
```

**Qué salió:** Funcionó: docs/verificacion/CLA.md escrito.

## Prompt 11

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
cambia el estado del scenario 3 por No lo sé. Porque, ¿qué pasa si falla el test?  Es tan importante ver el nombre en vez de las iniciales si está el mail?
```

**Qué salió:** Funcionó.

## Prompt 12

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
en la tabla sigo viendo Cubierto. Cámbialo a No lo sé en scenario 3
```

**Qué salió:** El fichero ya estaba cambiado; lo que veía era la tabla antigua del chat.

## Prompt 13

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
rellena prompts.md con todos los prompts del día de hoy, tal y como aparece en las instrucciones de prompts.md.
```

**Qué salió:** Este.
