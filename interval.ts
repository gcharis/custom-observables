import { Observable } from './observable';

export const interval = (timespan: number) =>
  new Observable<number>(({ next }) => {
    let time = 0;
    const int = setInterval(() => {
      console.log('inside the interval');
      next(time);
      time += timespan;
    }, timespan);

    return {
      unsubscribe() {
        clearInterval(int);
      }
    };
  });
