import { OperatorFn } from '@interfaces';

export const tap = <T>(fn: OperatorFn<T>): OperatorFn<T> => (value: T) => {
  fn(value);
  return;
};
