export const aOrAn = (word: string): string =>
  (['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a') +
  ` ${word}`;
