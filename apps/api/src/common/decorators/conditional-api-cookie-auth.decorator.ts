import { ApiCookieAuth } from '@nestjs/swagger';
import { IS_PUBLIC_KEY } from '../constants';

/**
 * A decorator that conditionally applies the `ApiCookieAuth` decorator to methods or classes
 * based on the presence of the `IS_PUBLIC_KEY` metadata (applied by the `Public` decorator).
 *
 * @param name - The name of the cookie authentication scheme. Optional.
 *
 * @returns A method and class decorator.
 *
 * @remarks
 * - If applied to a method, it checks if the method is public by looking for the `IS_PUBLIC_KEY` metadata.
 *   If the method is not public, it applies the `ApiCookieAuth` decorator.
 * - If applied to a class, it iterates over all methods of the class (excluding the constructor),
 *   checks if each method is public, and applies the `ApiCookieAuth` decorator to non-public methods.
 */
export function ConditionalApiCookieAuth(
  name?: string,
): MethodDecorator & ClassDecorator {
  return (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    if (descriptor) {
      // Method decorator
      const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, descriptor.value);
      if (!isPublic) {
        ApiCookieAuth(name)(target, propertyKey!, descriptor);
      }
    } else {
      // Class decorator
      for (const key of Object.getOwnPropertyNames(target.prototype)) {
        if (key === 'constructor') {
          continue;
        }
        const method = target.prototype[key];
        if (typeof method === 'function') {
          const methodDescriptor = Object.getOwnPropertyDescriptor(
            target.prototype,
            key,
          )!;
          const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, method);
          if (!isPublic) {
            ApiCookieAuth(name)(target.prototype, key, methodDescriptor);
          }
        }
      }
    }
  };
}
