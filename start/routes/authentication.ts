import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogoutController = () => import('#authentication/controllers/logout_controller')
const RegisterController = () => import('#authentication/controllers/register_controller')

router
  .group(() => {
    router.get('', [RegisterController, 'render']).as('register.render')
    router.post('', [RegisterController, 'handle']).as('register.handle')
  })
  .use([middleware.guest()])
  .prefix('/register')

router.get('/logout', [LogoutController, 'handle']).use([middleware.auth()]).as('logout.handle')
