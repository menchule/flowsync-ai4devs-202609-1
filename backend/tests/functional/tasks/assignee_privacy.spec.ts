import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre el scenario «La tarea no
 * filtra datos de cuenta» del requisito «Lo que cada tarea muestra de su
 * responsable» de `openspec/specs/tasks/spec.md`.
 */
test.group('Tasks | el responsable no filtra datos de cuenta', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  // Lo único del responsable que puede viajar junto a la tarea. El resto de la
  // cuenta —email, fechas, lo que sea— no.
  const PERMITIDO = ['id', 'fullName', 'initials']

  test('el responsable de una tarea, suelta o en lista, no trae su email ni otros datos de cuenta', async ({
    client,
    assert,
  }) => {
    const responsable = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    await User.create({
      fullName: 'Alan Turing',
      email: 'alan@example.com',
      password: 'secreto123',
    })
    const tarea = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })

    // Mira otra cuenta, no la responsable: lo que se comprueba es lo que ve el
    // equipo de Ada, no lo que ve Ada de sí misma.
    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'alan@example.com', password: 'secreto123' })
    const token = login.body().data.token as string

    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: '2026-10-08' })
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    const asignadoSuelta = suelta.body().data.assignee as Record<string, unknown>
    assert.equal(asignadoSuelta.id, responsable.id)
    assert.notProperty(asignadoSuelta, 'email')
    assert.sameMembers(
      Object.keys(asignadoSuelta).filter((k) => !PERMITIDO.includes(k)),
      []
    )
    assert.notInclude(suelta.text(), 'ada@example.com')

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    const tareas = lista.body().data as Array<{ id: number; assignee: Record<string, unknown> }>
    const enLista = tareas.find((t) => t.id === tarea.id)
    if (!enLista) return assert.fail('la tarea no aparece en la lista')
    assert.equal(enLista.assignee.id, responsable.id)
    assert.notProperty(enLista.assignee, 'email')
    assert.sameMembers(
      Object.keys(enLista.assignee).filter((k) => !PERMITIDO.includes(k)),
      []
    )
    assert.notInclude(lista.text(), 'ada@example.com')
  })
})
