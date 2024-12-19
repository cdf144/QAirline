import { Role } from '../enums/role.enum';

/**
 * Represents the claims contained in a JWT payload.
 *
 * @interface JwtPayloadClaims
 *
 * @property {string} sub - User ID as a MongoDB ObjectId string.
 * @property {string} email - Email address of the user.
 * @property {Role[]} roles - Array of roles assigned to the user.
 */
export interface JwtPayloadClaims {
  sub: string;
  email: string;
  roles: Role[];
}

/**
 * Represents the returned object after decoding and validating a JWT payload sent to the server.
 *
 * @interface JwtPayloadResult
 *
 * @property {string} userId - A MongoDB ObjectId string of the user.
 * @property {string} email - The email address of the user.
 * @property {Role[]} roles - An array of roles assigned to the user.
 */
export interface JwtPayloadResult {
  userId: string;
  email: string;
  roles: Role[];
}
