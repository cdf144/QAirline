import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants';

/**
 * A decorator to mark a route (handler) or controller (class) as public, meaning it does not require JWT authentication.
 *
 * @returns A decorator function that sets the metadata key `IS_PUBLIC_KEY` to `true`.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
