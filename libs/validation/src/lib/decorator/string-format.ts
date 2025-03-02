import type { StringFormat } from '@puq/type';
import {
  IsAlpha,
  IsAlphanumeric,
  IsAscii,
  IsBase32,
  IsBase58,
  IsBase64,
  IsBIC,
  IsBooleanString,
  IsByteLength,
  IsCreditCard,
  IsCurrency,
  IsDataURI,
  IsDateString,
  IsDecimal,
  IsEAN,
  IsEmail,
  IsEthereumAddress,
  IsFirebasePushId,
  IsHexColor,
  IsHSL,
  IsIBAN,
  IsIdentityCard,
  IsIP,
  IsISBN,
  IsISIN,
  IsISO31661Alpha2,
  IsISO31661Alpha3,
  IsISO4217CurrencyCode,
  IsISO8601,
  IsISRC,
  IsISSN,
  IsJSON,
  IsJWT,
  IsLatLong,
  IsLocale,
  IsMACAddress,
  IsMagnetURI,
  IsMimeType,
  IsMobilePhone,
  IsMongoId,
  IsNumberString,
  IsOctal,
  IsPassportNumber,
  IsPhoneNumber,
  IsPort,
  IsPostalCode,
  IsRgbColor,
  IsSemVer,
  IsStrongPassword,
  IsTimeZone,
  IsUrl,
  IsUUID,
  IsVariableWidth,
  ValidationOptions,
} from 'class-validator';

export function StringFormatValidation(
  format: StringFormat,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    if (format == undefined) return;

    switch (format) {
      case 'email':
        IsEmail(undefined, validationOptions)(t, p);
        break;
      case 'ip':
        IsIP('4', validationOptions)(t, p);
        break;

      case 'strong-password':
        IsStrongPassword(undefined, validationOptions)(t, p);
        break;
      case 'phone-number':
        IsPhoneNumber(undefined, validationOptions)(t, p);
        break;
      case 'uuid':
        IsUUID(undefined, validationOptions)(t, p);
        break;

      case 'alpha':
        IsAlpha(undefined, validationOptions)(t, p);
        break;
      case 'alphanumeric':
        IsAlphanumeric(undefined, validationOptions)(t, p);
        break;
      case 'ascii':
        IsAscii(validationOptions)(t, p);
        break;
      case 'base32':
        IsBase32(validationOptions)(t, p);
        break;

      case 'base58':
        IsBase58(validationOptions)(t, p);
        break;

      case 'base64':
        IsBase64(undefined, validationOptions)(t, p);
        break;

      case 'bic':
        IsBIC(validationOptions)(t, p);
        break;
      case 'boolean-string':
        IsBooleanString(validationOptions)(t, p);
        break;
      case 'byte-length':
        IsByteLength(0, 255, validationOptions)(t, p);
        break;
      case 'credit-card':
        IsCreditCard(validationOptions)(t, p);
        break;
      case 'currency':
        IsCurrency(undefined, validationOptions)(t, p);
        break;
      case 'data-uri':
        IsDataURI(validationOptions)(t, p);
        break;
      case 'date-string':
        IsDateString(undefined, validationOptions)(t, p);
        break;
      case 'decimal':
        IsDecimal(undefined, validationOptions)(t, p);
        break;
      case 'ean':
        IsEAN(validationOptions)(t, p);
        break;
      case 'ethereum-address':
        IsEthereumAddress(validationOptions)(t, p);
        break;
      case 'firebase-push-id':
        IsFirebasePushId(validationOptions)(t, p);
        break;
      case 'hash':
        break;
      case 'hex-color':
        IsHexColor(validationOptions)(t, p);
        break;
      case 'hsl':
        IsHSL(validationOptions)(t, p);
        break;
      case 'iban':
        IsIBAN(validationOptions)(t, p);
        break;
      case 'identity-card':
        IsIdentityCard(undefined, validationOptions)(t, p);
        break;
      case 'imei':
      case 'ip-range':
        break;

      case 'isbn':
        IsISBN(undefined, validationOptions)(t, p);
        break;
      case 'isin':
        IsISIN(validationOptions)(t, p);
        break;
      case 'iso31661-alpha2':
        IsISO31661Alpha2(validationOptions)(t, p);
        break;
      case 'iso31661-alpha3':
        IsISO31661Alpha3(validationOptions)(t, p);
        break;
      case 'iso4217':
        IsISO4217CurrencyCode(validationOptions)(t, p);
        break;
      case 'iso8601':
        IsISO8601(undefined, validationOptions)(t, p);
        break;
      case 'isrc':
        IsISRC(validationOptions)(t, p);
        break;
      case 'issn':
        IsISSN(undefined, validationOptions)(t, p);
        break;
      case 'json':
        IsJSON(validationOptions)(t, p);
        break;
      case 'jwt':
        IsJWT(validationOptions)(t, p);
        break;
      case 'lat-long':
        IsLatLong(validationOptions)(t, p);
        break;
      case 'locale':
        IsLocale(validationOptions)(t, p);
        break;
      case 'mac-address':
        IsMACAddress(undefined, validationOptions)(t, p);
        break;
      case 'magnet-uri':
        IsMagnetURI(validationOptions)(t, p);
        break;
      case 'mime-type':
        IsMimeType(validationOptions)(t, p);
        break;
      case 'mobile-phone':
        IsMobilePhone(undefined, undefined, validationOptions)(t, p);
        break;
      case 'mongo-id':
        IsMongoId(validationOptions)(t, p);
        break;
      case 'number-string':
        IsNumberString(undefined, validationOptions)(t, p);
        break;
      case 'octal':
        IsOctal(validationOptions)(t, p);
        break;
      case 'passport-number':
        IsPassportNumber('any', validationOptions)(t, p);
        break;
      case 'port':
        IsPort(validationOptions)(t, p);
        break;
      case 'postal-code':
        IsPostalCode(undefined, validationOptions)(t, p);
        break;
      case 'rgb-color':
        IsRgbColor(undefined, validationOptions)(t, p);
        break;
      case 'sem-ver':
        IsSemVer(validationOptions)(t, p);
        break;
      case 'slug':
        break;
      case 'time-zone':
        IsTimeZone(validationOptions)(t, p);
        break;
      case 'url':
        IsUrl(undefined, validationOptions)(t, p);
        break;
      case 'variable-width':
        IsVariableWidth(validationOptions)(t, p);
        break;
    }
  };
}
