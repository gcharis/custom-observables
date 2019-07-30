import { Observable } from './observable';

export const of = <T>(value: T): Observable<T> => {
  return new Observable(({ next }) => {
    next(value);
    return null;
  });
};
