import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

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

@ValidatorConstraint({ async: false })
export class IsVietnamIdCardNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): Promise<boolean> | boolean {
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
    const hexStringRegex = /^[0-9a-fA-F]{24}$/;
    return hexStringRegex.test(value);
  }

  defaultMessage() {
    return 'ID must be a 24-character hexadecimal string';
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
