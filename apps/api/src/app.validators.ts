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
