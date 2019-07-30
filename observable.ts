import {
  Subscribe,
  Identified,
  Observer,
  Subscription,
  NextObserver,
  ErrorObserver,
  CompleteObserver
} from '@interfaces';
import { Operator, OperatorFn } from 'interfaces/operator';

export interface Observable<T> {
  subscribe(Observer?: Observer<T>): Subscription;
  subscribe(
    next?: NextObserver<T>,
    error?: ErrorObserver,
    complete?: CompleteObserver
  ): Subscription;
}

export class Observable<T> implements Observable<T> {
  /**
   * @internal
   */
  _subscribe: Subscribe<T>;
  /**
   * @internal
   */
  _observers: Identified<Observer<T>>[] = [];

  _completed = false;

  _operators: Operator<T>[] = [];

  constructor(subscribe?: Subscribe<T>) {
    this._subscribe = subscribe;
  }

  subscribe(
    observer?: Observer<T> | NextObserver<T>,
    error?: ErrorObserver,
    complete?: CompleteObserver
  ): Subscription {
    if (!observer) observer = () => {};

    if (!error) error = () => {};

    if (!complete) complete = () => {};

    let _observer = {} as Identified<Observer<T>>;

    _observer.next = value => {
      if (!this._observers.find(({ id }) => _observer.id === id)) return;
      (observer['next'] || observer)(value);
    };

    _observer.error = value => {
      if (!this._observers.find(({ id }) => _observer.id === id)) return;
      (observer['error'] || error)(value);
    };

    _observer.complete = () => {
      if (!this._observers.find(({ id }) => _observer.id === id)) return;
      this._observers = this._observers.filter(({ id }) => _observer.id !== id);
      (observer['complete'] || complete)();
    };

    _observer.id = this._observers.length;

    this._observers.push(_observer);
    const unsubscription = this._subscribe && this._subscribe(_observer);

    return {
      unsubscribe: () => {
        this._observers = this._observers.filter(({ id }) => _observer.id !== id);
        unsubscription.unsubscribe();
      }
    };
  }

  pipe(...operators: OperatorFn<T>[]): Observable<T> {
    return new Observable<T>(obs => {
      const wrapped: Observer<T> = {
        next(value) {
          for (const operator of operators) {
            value = operator(value);
          }

          obs.next(value);
        }
      };
      return this._subscribe(wrapped);
    });
  }
}
