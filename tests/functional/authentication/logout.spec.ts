import { UserFactoryWithStrongPassword } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Authentication logout', () => {
  test('visiting the logout page should redirect to the login page if the user is not authenticated', async ({
    client,
    route,
  }) => {
    const req = await client.get(route('logout.handle'))

    req.assertRedirectsTo(route('login.render'))
  })

  test('visiting the logout page should redirect to the login page if the user is authenticated', async ({
    client,
    route,
  }) => {
    const user = await UserFactoryWithStrongPassword.create()

    const req = await client.get(route('logout.handle')).loginAs(user)

    req.assertRedirectsTo(route('login.render'))
  })
})
