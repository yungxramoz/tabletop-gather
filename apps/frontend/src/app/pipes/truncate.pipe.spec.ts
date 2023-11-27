import { TruncatePipe } from './truncate.pipe';

describe(TruncatePipe.name, () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original value if it is null or undefined', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should truncate with correct defaults', () => {
    // Arrange
    const value =
      'This is a long string that exceeds the maxLength This is a long string that exceeds the maxLength This is a long string that exceeds the maxLength This is a long string that exceeds the maxLength This is a long string that exceeds the maxLength';
    const DEFAULT_MAX_LENGTH = 130;
    const DEFAULT_SUFFIX = ' ...';

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result?.length).toEqual(DEFAULT_MAX_LENGTH + DEFAULT_SUFFIX.length);
    expect(result?.endsWith(DEFAULT_SUFFIX)).toBeTruthy();
  });

  it('should truncate the value if it exceeds the maxLength', () => {
    // Arrange
    const value = 'This is a long string that exceeds the maxLength';
    const maxLength = 20;
    const suffix = '...';

    // Act
    const result = pipe.transform(value, maxLength, suffix);

    // Assert
    expect(result).toEqual('This is a long strin...');
  });

  it('should not truncate the value if it does not exceed the maxLength', () => {
    // Arrange
    const value = 'Short string';
    const maxLength = 20;
    const suffix = '...';

    // Act
    const result = pipe.transform(value, maxLength, suffix);

    // Assert
    expect(result).toEqual('Short string');
  });

  it('should use the default maxLength and suffix if not provided', () => {
    // Arrange
    const value = 'This is a long string that exceeds the maxLength';

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toEqual('This is a long string that exceeds the maxLength');
  });
});
