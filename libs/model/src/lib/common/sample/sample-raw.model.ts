export type SampleObj = {
  value: string;
};

export type SampleRawModel = {
  str: string;
  num: number;
  int: number;
  bool: boolean;
  date: Date;
  obj: SampleObj;
  strArr: Array<string>;
  numArr: Array<number>;
  intArr: Array<number>;
  boolArr: Array<boolean>;
  objArr: Array<SampleObj>;
  dateArr: Array<Date>;
};
