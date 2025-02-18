import { StringFormat } from '@puq/type';
import {
  IsEmail,
  IsIP,
  IsPhoneNumber,
  IsStrongPassword,
  IsUUID,
  ValidationOptions,
} from 'class-validator';

export function StringFormatValidation(
  format: StringFormat,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    if (format == undefined) return;

    switch (format) {
      case 'email':
        IsEmail(undefined, validationOptions)(t, p);
        break;
      case 'ip4':
        IsIP('4', validationOptions)(t, p);
        break;
      case 'ip6':
        IsIP('6', validationOptions)(t, p);
        break;
      case 'password':
        IsStrongPassword(undefined, validationOptions)(t, p);
        break;
      case 'phone':
        IsPhoneNumber(undefined, validationOptions)(t, p);
        break;
      case 'uuid':
        IsUUID(undefined, validationOptions)(t, p);
        break;
    }
  };
}
