import User from '#authentication/models/user'
import { UserFactoryWithNoPassword } from '#database/factories/user_factory'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

test.group('creating user', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  group.each.teardown(async () => {
    await User.query().delete()
  })

  test('hashes user password', async ({ assert }) => {
    const user = await UserFactoryWithNoPassword.make()
    user.password = 'password'

    await user.save()

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'password'))
  })
})
