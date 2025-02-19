import { CommonOptions } from './common.js';
import { StringFormat } from './string-format.js';

export type __StringOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  stringFormat?: StringFormat;
  enum?: string[];
  notIn?: string[];
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  notContains?: string;
};

export type StringOptions = Readonly<CommonOptions<string> & __StringOptions>;
