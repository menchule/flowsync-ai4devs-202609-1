import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre el scenario «Responsable
 * sin nombre» del requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 */
test.group('Tasks | responsable sin nombre', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('el responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const responsable = await User.create({
      fullName: null,
      email: 'sin-nombre@example.com',
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
    assert.isNull(asignadoSuelta.fullName)
    assert.isString(asignadoSuelta.initials)
    assert.isNotEmpty(asignadoSuelta.initials)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    const tareas = lista.body().data as Array<{ id: number; assignee: Record<string, unknown> }>
    const enLista = tareas.find((t) => t.id === tarea.id)
    if (!enLista) return assert.fail('la tarea no aparece en la lista')
    assert.equal(enLista.assignee.id, responsable.id)
    assert.isNull(enLista.assignee.fullName)
    assert.isString(enLista.assignee.initials)
    assert.isNotEmpty(enLista.assignee.initials)
  })
})
