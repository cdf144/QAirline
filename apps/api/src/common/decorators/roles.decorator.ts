import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';
import { Role } from '../enums/role.enum';

/**
 * A decorator to mark a route (handler) or controller (class) as accessible only to users with specific roles.
 *
 * @param {...Role[]} roles - The roles that are allowed to access the route or controller.
 * @returns A decorator function that sets the metadata key `ROLES_KEY` to the specified roles.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
