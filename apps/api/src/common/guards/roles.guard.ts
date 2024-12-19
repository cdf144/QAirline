import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants';
import { Role } from '../enums/role.enum';

/**
 * Guard that checks if the user has the required roles to access a resource.
 *
 * This guard uses `Reflector` to retrieve the roles metadata set on the route handler or class.
 * If no roles are required, access is granted by default.
 * If roles are required, it checks if the user has at least one of the required roles.
 * If the user does not have the required roles, a `ForbiddenException` is thrown.
 *
 * @class
 * @implements {CanActivate}
 *
 * @throws {ForbiddenException} - Thrown if the user does not have the required roles.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have the required roles to access this resource',
      );
    }

    return true;
  }
}
