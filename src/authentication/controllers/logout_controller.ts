import AuthenticationService from '#authentication/services/authentication_service'
import { inject } from '@adonisjs/core'

@inject()
export default class LogoutController {
  constructor(private authenticationService: AuthenticationService) {}

  handle() {
    return this.authenticationService.logout()
  }
}
