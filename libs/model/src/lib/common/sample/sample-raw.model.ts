export type SampleObj = {
  value: string;
};

export type SampleRawModel = {
  stringValue: string;
  numberValue: number;
  integerValue: number;
  booleanValue: boolean;
  dateValue: string;
  objectValue: SampleObj;
  stringArray: Array<string>;
  numberArray: Array<number>;
  integerArray: Array<number>;
  booleanArray: Array<boolean>;
  objectArray: Array<SampleObj>;
  dateArray: Array<string>;
};
