import {
  delay,
  firstValueFrom,
  lastValueFrom,
  Observable,
  of,
  skip,
} from 'rxjs';
import { withLoadingWrapper } from './loading-wrapper.operator';

const DEFAULT_JEST_TIMEOUT_MS = 500;

const nthValueFrom = <T>(source$: Observable<T>, n: number): Promise<T> =>
  firstValueFrom(source$.pipe(skip(n - 1)));

describe('withLoadingWrapper', () => {
  it(
    'should emit twice when no loading delay is specified. Initially with loading and - when the source emits - with completed and value',
    async () => {
      // Arrange
      const sourceDelayMs = 100;
      const source$ = of('test').pipe(delay(sourceDelayMs));
      const test$ = source$.pipe(withLoadingWrapper());

      // Act
      const initial = await firstValueFrom(test$);
      const result = await lastValueFrom(test$);

      // Assert
      expect(initial).toEqual({ loading: true, completed: false });
      expect(result).toEqual({
        loading: false,
        completed: true,
        value: 'test',
      });
    },
    DEFAULT_JEST_TIMEOUT_MS
  );

  it(
    'should emit three times if a loading delay is specified and the source emits after the delay. Initially without loading, then with loading and - when the source emits - with completed and value',
    async () => {
      // Arrange
      const sourceDelayMs = 150;
      const loadingDelayMs = 50;
      const source$ = of('test').pipe(delay(sourceDelayMs));
      const test$ = source$.pipe(withLoadingWrapper(loadingDelayMs));

      // Act
      const start = Date.now();
      const initial = await firstValueFrom(test$);
      const loading = await nthValueFrom(test$, 2);
      const end = Date.now();
      const result = await lastValueFrom(test$);

      // Assert
      expect(initial).toEqual({ loading: false, completed: false });
      expect(loading).toEqual({ loading: true, completed: false });
      expect(result).toEqual({
        loading: false,
        completed: true,
        value: 'test',
      });

      expect(end - start).toBeGreaterThanOrEqual(loadingDelayMs);
      expect(end - start).toBeLessThanOrEqual(sourceDelayMs);
    },
    DEFAULT_JEST_TIMEOUT_MS
  );

  it(
    'should emit two times if a loading delay is specified and the source emits before the delay. Initially without loading and - when the source emits - with completed and value',
    async () => {
      // Arrange
      const sourceDelayMs = 100;
      const loadingDelayMs = 200;
      const source$ = of('test').pipe(delay(sourceDelayMs));
      const test$ = source$.pipe(withLoadingWrapper(loadingDelayMs));

      // Act
      const start = Date.now();
      const initial = await firstValueFrom(test$);
      const result = await lastValueFrom(test$);
      const end = Date.now();

      // Assert
      expect(initial).toEqual({ loading: false, completed: false });
      expect(result).toEqual({
        loading: false,
        completed: true,
        value: 'test',
      });

      expect(end - start).toBeLessThanOrEqual(loadingDelayMs);
    },
    DEFAULT_JEST_TIMEOUT_MS
  );
});
