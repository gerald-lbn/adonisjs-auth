import UserRepository from '#authentication/repositories/user_repository'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticationService {
  constructor(
    protected ctx: HttpContext,
    private userRepository: UserRepository
  ) {}

  /**
   * Registers a new user
   * @param fullName the full name of the new user
   * @param email the email of the new user
   * @param password the password of the new user
   */
  @inject()
  async register(fullName: string, email: string, password: string): Promise<void> {
    const user = await this.userRepository.create(fullName, email, password)
    await this.ctx.auth.use('web').login(user)
  }

  /**
   * Logs in a user
   * @param email the email of the user
   * @param password the password of the user
   */
  async login(email: string, password: string): Promise<void> {
    const user = await this.userRepository.verifyCredentials(email, password)
    if (user) {
      await this.ctx.auth.use('web').login(user)
    }
  }
}
