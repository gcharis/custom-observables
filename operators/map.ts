import { OperatorFn } from '@interfaces';

export const map = <T>(fn: OperatorFn<T>): OperatorFn<T> => (value: T) => fn(value);
