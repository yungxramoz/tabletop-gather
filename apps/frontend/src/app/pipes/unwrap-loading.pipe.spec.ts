import { LoadingWrapped } from '../utilities/loading-wrapper.operator';
import { UnwrapLoadingPipe } from './unwrap-loading.pipe';

describe('UnwrapLoadingPipe', () => {
  it('should unwrap correctly if it is loading and not yet completed', async () => {
    // Arrange
    const pipe = new UnwrapLoadingPipe();
    const source = {
      value: undefined,
      loading: true,
      completed: false,
    } as LoadingWrapped<string>;

    // Act
    const result = pipe.transform(source);

    // Assert
    expect(result).toHaveProperty('isLoading', true);
    expect(result).not.toHaveProperty('completedWithoutValue');
    expect(result).not.toHaveProperty('completedWithValue');
    expect(result).not.toHaveProperty('value');
  });

  it('should unwrap correctly if it is not loading and not yet completed', async () => {
    // Arrange
    const pipe = new UnwrapLoadingPipe();
    const source = {
      loading: false,
      completed: false,
    } as LoadingWrapped<string>;

    // Act
    const result = pipe.transform(source);

    // Assert
    expect(result).toHaveProperty('isLoading', false);
    expect(result).not.toHaveProperty('completedWithoutValue');
    expect(result).not.toHaveProperty('completedWithValue');
    expect(result).not.toHaveProperty('value');
  });

  it('should unwrap correctly if it is not loading and has completed no value', async () => {
    // Arrange
    const pipe = new UnwrapLoadingPipe();
    const source = {
      value: null,
      loading: false,
      completed: true,
    } as LoadingWrapped<string | null>;

    // Act
    const result = pipe.transform(source);

    // Assert
    expect(result).toHaveProperty('isLoading', false);
    expect(result).toHaveProperty('completedWithoutValue', true);
    expect(result).not.toHaveProperty('completedWithValue');
    expect(result).not.toHaveProperty('value');
  });

  it('should unwrap correctly if it is not loading and completed with value', async () => {
    // Arrange
    const payload = 'test';
    const pipe = new UnwrapLoadingPipe();
    const source = {
      value: payload,
      loading: false,
      completed: true,
    } as LoadingWrapped<string>;

    // Act
    const result = pipe.transform(source);

    // Assert
    expect(result).toHaveProperty('isLoading', false);
    expect(result).not.toHaveProperty('completedWithoutValue');
    expect(result).toHaveProperty('completedWithValue', true);
    expect(result).toHaveProperty('value', payload);
  });
});
