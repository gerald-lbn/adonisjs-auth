import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RegisterController = () => import('#authentication/controllers/register_controller')

router
  .group(() => {
    router.get('', [RegisterController, 'render']).as('register.render')
    router.post('', [RegisterController, 'handle']).as('register.handle')
  })
  .use([middleware.guest()])
  .prefix('/register')
