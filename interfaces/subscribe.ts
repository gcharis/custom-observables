import { Observer } from './observer';

export type Subscribe<T> = (observer: Observer<T>) => Subscription;

export interface Subscription {
  unsubscribe(): void;
}
