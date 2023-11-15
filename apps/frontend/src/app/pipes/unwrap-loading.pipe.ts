import { Pipe, PipeTransform } from '@angular/core';
import { LoadingWrapped } from '../utilities/loading-wrapper.operator';

type LoadingUnwrapped<T> =
  // It can be loading before it completes
  | {
      isLoading: true;
      completedWithValue?: false;
      completedWithoutValue?: false;
    }
  // ...but also loading:false, if a loading delay has been specified
  | {
      isLoading: false;
      completedWithValue?: false;
      completedWithoutValue?: false;
    }
  // It can complete without a value (undefined or null)
  | {
      isLoading: false;
      completedWithValue?: false;
      completedWithoutValue: true;
    }
  // ...or with a value
  | {
      isLoading: false;
      completedWithValue: true;
      completedWithoutValue?: false;
      value: T;
    };

/**
 * Unwraps a {@link LoadingWrapped<T>} object into a {@link LoadingUnwrapped<T>} object. Intended to be used in templates.
 * @param value - the {@link LoadingWrapped<T>} to unwrap
 * @returns the unwrapped {@link LoadingUnwrapped<T>}
 * @example
 * ```html
 * <ng-container *ngIf="myWrappedData | unwrapLoading as it">
 *   <ng-container *ngIf="it.isLoading">
 *     Loading...
 *   </ng-container>
 *   <ng-container *ngIf="it.completedWithoutValue">
 *     No value
 *   </ng-container>
 *   <ng-container *ngIf="it.completedWithValue">
 *     {{ it.value | json }}
 *   </ng-container>
 * </ng-container>
 * ```
 */
@Pipe({ name: 'unwrapLoading', pure: false, standalone: true })
export class UnwrapLoadingPipe implements PipeTransform {
  public transform<T>(
    value: LoadingWrapped<T | undefined | null> | undefined | null
  ): LoadingUnwrapped<T> {
    if (value && value.loading) {
      return { isLoading: true };
    }

    if (value && !value.completed) {
      return { isLoading: false };
    }

    if (!value || value.value === undefined || value.value === null) {
      return { isLoading: false, completedWithoutValue: true };
    } else {
      return { isLoading: false, completedWithValue: true, value: value.value };
    }
  }
}
