export type Operator<T> = (fn: OperatorFn<T>) => any;
export type OperatorFn<T> = (value: T) => any;
