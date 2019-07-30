import { Observable } from './observable';

export class Subject<T> extends Observable<T> {
  next(value: T) {
    for (const observer of this._observers) {
      observer.next(value);
    }
  }
}
