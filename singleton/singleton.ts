/**
 * Base class for storing user identity data.
 */
class User {
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken

    this.load()
  }

  /**
   * Load user data by authtoken.
   */
  load(): void {
    // This could be request to REST API.
  }
}

/**
 * A global service for authorization.
 */
class AuthService {
  private static instance: AuthService
  private userIdentity: User

  static getInstance(): AuthService {
    return AuthService.instance || (AuthService.instance = new AuthService())
  }

  private constructor() {
    this.createUser()
  }

  private createUser() {
    const userToken = localStorage.getItem('user-token') 

    if (userToken) {
      this.userIdentity = new User(userToken)
    }
  }

  getIdentity(): User {
    if (!this.userIdentity) {
      this.authorize()
      this.createUser()
    }

    return this.userIdentity
  }

  authorize() {
    // For example, synchronous getting token from oAuth service
    const userToken = '%user_token%'
    localStorage.setItem('user-token', userToken)
  }
}

// In one place
const currentUser = AuthService.getInstance().getIdentity()

if (currentUser) {
  console.log('render admin panel')
} else {
  console.log('render login form')
}

// In the other place
const user = AuthService.getInstance().getIdentity()