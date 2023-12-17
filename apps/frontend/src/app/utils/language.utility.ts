/**
 * Prefixes a word with the correct article (a or an)
 *
 * @param {string} word - The word to check
 * @returns {string} The word with the correct article
 */
export const aOrAn = (word: string): string =>
  (['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a') +
  ` ${word}`;
