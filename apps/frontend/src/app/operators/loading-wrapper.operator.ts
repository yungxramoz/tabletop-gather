import {
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

export type LoadingWrapped<T> =
  // It can be both not loading and not completed, if a loading delay has been specified
  | {
      loading: false;
      completed: false;
    }
  // It can be loading before it completes
  | {
      loading: true;
      completed: false;
    }
  // It can be completed
  | {
      loading: false;
      completed: true;
      value: T;
    };

/**
 * Operator function to wrap a value to a {@link LoadingWrapped<T>}. Intended to be used in templates in
 * combination with the {@link UnwrapLoadingPipe}.
 * @param {number|undefined} loadingDelayMs - optional delay in milliseconds before loading:true is emitted
 * @returns the wrapped {@link LoadingWrapped<T>}
 * @example
 * completed | ▄▄▄▄▄▄▄▄▄▄▄▄▄██████
 * loading   | ▄▄▄▄▄▄▄██████▄▄▄▄▄▄
 * value     | ▄▄▄▄▄▄▄▄▄▄▄▄▄▒▒▒▒▒▒ ← might be null or undefined
 *             | 200 | ← loadingDelayMs
 */
export function withLoadingWrapper<T>(
  loadingDelayMs?: number
): (source$: Observable<T>) => Observable<LoadingWrapped<T>> {
  return (source$: Observable<T>): Observable<LoadingWrapped<T>> => {
    const completedSubject = new Subject<boolean>();

    const value$ = source$.pipe(
      map((value) =>
        value
          ? { value, completed: true as const }
          : { completed: true as const }
      ),
      tap((value) => completedSubject.next(value.completed)),
      startWith({ completed: false as const })
    );

    const loading$ = !loadingDelayMs
      ? of(true)
      : timer(loadingDelayMs).pipe(
          map(() => true),
          takeUntil(completedSubject),
          startWith(false)
        );

    return combineLatest([value$, loading$]).pipe(
      map(([value, loading]) => {
        if (value.completed)
          return { loading: false, ...value } as LoadingWrapped<T>;
        return { loading, ...value } as LoadingWrapped<T>;
      })
    );
  };
}

export function mapLoadingWrappedData<T, R>(
  source: LoadingWrapped<T>,
  mapFn: (source: T) => R
): LoadingWrapped<R> {
  if (source.loading || !source.completed) return source;
  return { ...source, value: mapFn(source.value) };
}

export function mapLoadingWrapped<T, R>(
  mapFn: (data: T) => R
): (source$: Observable<LoadingWrapped<T>>) => Observable<LoadingWrapped<R>> {
  return (
    source$: Observable<LoadingWrapped<T>>
  ): Observable<LoadingWrapped<R>> => {
    return source$.pipe(map((state) => mapLoadingWrappedData(state, mapFn)));
  };
}
