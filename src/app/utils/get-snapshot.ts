import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

export function getSnapshot<T>(observable: Observable<T>): Promise<T> {
  return observable.pipe(take(1)).toPromise();
}
