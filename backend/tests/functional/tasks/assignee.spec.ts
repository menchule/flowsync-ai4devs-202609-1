import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre el scenario «Responsable
 * identificable» del requisito «Lo que cada tarea muestra de su responsable»
 * de `openspec/specs/tasks/spec.md`.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('el responsable de una tarea llega con su nombre y sus iniciales', async ({
    client,
    assert,
  }) => {
    const ada = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const tarea = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: ada.id,
    })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'ada@example.com', password: 'secreto123' })
    const token = login.body().data.token as string

    // Tarea suelta: la lectura que trae al responsable junto a todo lo demás.
    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: '2026-10-08' })
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    assert.equal(suelta.body().data.assignee.fullName, 'Ada Lovelace')
    assert.equal(suelta.body().data.assignee.initials, 'AL')

    // La misma tarea dentro de la lista.
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    const tareas = lista.body().data as Array<{ id: number; assignee: Record<string, unknown> }>
    const enLista = tareas.find((t) => t.id === tarea.id)
    if (!enLista) return assert.fail('la tarea no aparece en la lista')
    assert.equal(enLista.assignee.fullName, 'Ada Lovelace')
    assert.equal(enLista.assignee.initials, 'AL')
  })
})
