import { SortCommentsPipe } from './sort-comment.pipe';

describe(SortCommentsPipe.name, () => {
  let pipe: SortCommentsPipe<{ dateCreated: Date }>;

  beforeEach(() => {
    pipe = new SortCommentsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if the input value is null', () => {
    // Arrange
    const value = null;

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toBeNull();
  });

  it('should return the input value if it is an empty array', () => {
    // Arrange
    const value: { dateCreated: Date }[] = [];

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toEqual([]);
  });

  it('should sort the comments by dateCreated in ascending order', () => {
    // Arrange
    const value = [
      { dateCreated: new Date('2022-01-01') },
      { dateCreated: new Date('2021-01-01') },
      { dateCreated: new Date('2023-01-01') },
    ];

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toEqual([
      { dateCreated: new Date('2021-01-01') },
      { dateCreated: new Date('2022-01-01') },
      { dateCreated: new Date('2023-01-01') },
    ]);
  });

  it('should return the input value if it is already sorted by dateCreated in ascending order', () => {
    // Arrange
    const value = [
      { dateCreated: new Date('2023-01-01') },
      { dateCreated: new Date('2022-01-01') },
      { dateCreated: new Date('2021-01-01') },
    ];

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toEqual([
      { dateCreated: new Date('2021-01-01') },
      { dateCreated: new Date('2022-01-01') },
      { dateCreated: new Date('2023-01-01') },
    ]);
  });

  it('should return the input value if it contains only one comment', () => {
    // Arrange
    const value = [{ dateCreated: new Date('2022-01-01') }];

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toEqual([{ dateCreated: new Date('2022-01-01') }]);
  });
});
