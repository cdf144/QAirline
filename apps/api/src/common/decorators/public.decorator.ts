import { SetMetadata } from '@nestjs/common';

/**
 * A constant key used as metadata to mark routes (handlers) or controllers (classes) as public (i.e., not requiring JWT authentication).
 *
 * @constant {string}
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * A decorator to mark a route (handler) or controller (class) as public, meaning it does not require JWT authentication.
 *
 * @returns A decorator function that sets the metadata key `IS_PUBLIC_KEY` to `true`.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
