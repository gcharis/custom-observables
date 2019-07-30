import { map } from './operators/map';
import { of } from './of';

of({ x: 1 })
  .pipe(map(v => ({ ...v, x: v.x + 1000 })))
  .subscribe(console.log);
