/**
 * A constant key used as metadata to mark routes (handlers) or controllers (classes) as public (i.e., not requiring JWT authentication).
 *
 * @constant {string}
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * A constant key used as metadata to mark routes (handlers) or controllers (classes) as accessible only to users with specific roles.
 *
 * @constant {string}
 */
export const ROLES_KEY = 'roles';

/**
 * An object containing the names of cookies used in the application.
 *
 * @property {string} ACCESS_TOKEN - The name of the cookie used to store the access token.
 */
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'qairline_access_token',
};
