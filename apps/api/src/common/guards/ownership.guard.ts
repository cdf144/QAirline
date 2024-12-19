import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { isEmail } from 'class-validator';
import { Role } from '../enums/role.enum';
import { JwtPayloadResult } from '../interfaces/jwt-payload.interface';

/**
 * Guard that determines if a user has ownership access to a resource.
 * An example use case is when it is required that a user can only query information that belongs to them, and not other users in the database.
 *
 * For users with the `admin` role, they are allowed to access any resource.
 *
 * For normal users, they can only access resources that belong to them, and the resource can only be queried through their id (MongoDB ObjectId) or email.
 *
 * @class
 * @implements {CanActivate}
 */
@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayloadResult = request.user;
    const identifier = request.params.identifier;

    // Since this guard is only used for authenticated routes (processed by JwtAuthGuard), user should always be defined, but we check anyways for good measure
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.roles.includes(Role.Admin)) {
      return true;
    }

    const identifierType = this.getIdentifierType(identifier);
    if (identifierType === 'other') {
      throw new ForbiddenException(
        'Access denied. You can only access resources through your id or email',
      );
    }

    let isBelongingToUser = false;

    if (identifierType === 'mongoId') {
      isBelongingToUser = user.userId === identifier;
    } else if (identifierType === 'email') {
      isBelongingToUser = user.email === identifier;
    }

    if (!isBelongingToUser) {
      throw new ForbiddenException(
        'Access denied. You do not own this resource',
      );
    }

    return true;
  }

  private getIdentifierType(identifier: string): 'mongoId' | 'email' | 'other' {
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      return 'mongoId';
    } else if (isEmail(identifier)) {
      return 'email';
    }
    return 'other';
  }
}
