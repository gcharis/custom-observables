export type NextObserver<T> = (value?: T) => void;
export type ErrorObserver = (error?: any) => void;
export type CompleteObserver = () => void;

export interface Observer<T> {
  next?: NextObserver<T>;
  error?: ErrorObserver;
  complete?: CompleteObserver;
}
