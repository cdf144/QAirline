/**
 * Represents the body of a login request.
 *
 * @interface LoginBody
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
export interface LoginBody {
  email: string;
  password: string;
}

/**
 * Represents the result of a login operation.
 *
 * @interface LoginResult
 * @property {string} accessToken - The token (JWT) to be used as cookie for accessing protected routes.
 */
export interface LoginResult {
  accessToken: string;
}
