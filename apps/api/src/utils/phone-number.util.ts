import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export function normalizePhoneNumber(
  phone: string,
  defaultCountry: string = 'VN',
): string {
  const phoneNumber = parsePhoneNumberFromString(
    phone,
    defaultCountry as CountryCode,
  );
  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.number; // E.164 format
  }
  // throw new Error('Invalid phone number');
  return '';
}
