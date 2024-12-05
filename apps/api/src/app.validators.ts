import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * **Custom Validator**
 *
 * Checks if the string is a 12-digit number (length of Vietnam ID card number).
 * If given value is not a string, then it returns false.
 */
export function IsVietnamIdCardNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVietnamIdCardNumberConstraint,
    });
  };
}

/**
 * **Custom Validator**
 *
 * Checks if the string is a 24-character hexadecimal string.
 * If given value is not a string, then it returns false.
 */
export function IsHexStringId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHexStringIdConstraint,
    });
  };
}

/**
 * **Custom Validator**
 *
 * Checks if the array contains only strings or numbers.
 * If given value is not an array, then it returns false.
 */
export function IsStringOrNumberArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringOrNumberArrayConstraint,
    });
  };
}

/**
 * **Custom Validator**
 *
 * Checks if the string represents a number with up to 2 decimal places.
 * If given value is not a string, then it returns false.
 */
export function IsPriceString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPriceStringConstraint,
    });
  };
}

@ValidatorConstraint({ async: false })
export class IsVietnamIdCardNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): Promise<boolean> | boolean {
    if (typeof value !== 'string') {
      return false;
    }
    const idCardNumberRegex = /^\d{12}$/;
    return idCardNumberRegex.test(value);
  }

  defaultMessage(): string {
    return 'ID card number must be a 12-digit number';
  }
}

@ValidatorConstraint({ async: false })
export class IsHexStringIdConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'string') {
      return false;
    }
    const hexStringRegex = /^[0-9a-fA-F]{24}$/;
    return hexStringRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a 24-character hexadecimal string`;
  }
}

@ValidatorConstraint({ async: false })
export class IsStringOrNumberArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    return (
      Array.isArray(value) &&
      value.every(
        (item) => typeof item === 'string' || typeof item === 'number',
      )
    );
  }

  defaultMessage() {
    return 'Array must contain only strings or numbers';
  }
}

@ValidatorConstraint({ async: false })
export class IsPriceStringConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'string') {
      return false;
    }
    const priceStringRegex = /^\d+(\.\d{1,2})?$/;
    return priceStringRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a string representing a number with up to 2 decimal places`;
  }
}
