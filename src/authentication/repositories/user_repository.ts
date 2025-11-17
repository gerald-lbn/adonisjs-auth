import User from '#authentication/models/user'

/**
 * Repository to manage the User model
 */
export default class UserRepository {
  /**
   * Creates a new user
   * @param fullName the full name of the new user
   * @param email the email associated to the account
   * @param password the password associated to the account
   * @returns the newly created user
   */
  async create(fullName: string, email: string, password: string): Promise<User> {
    const user = await User.create({ fullName, email, password })
    return user
  }

  /**
   * Verifies the credentials of a user
   * @param email the email associated to the account
   * @param password the password associated to the account
   * @returns the user if the credentials are valid, null otherwise
   */
  async verifyCredentials(email: string, password: string): Promise<User | null> {
    try {
      return await User.verifyCredentials(email, password)
    } catch {
      return null
    }
  }
}
