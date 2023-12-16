import { NbTabComponent } from '@nebular/theme';

/**
 * Updates the badge of a tab.
 * If the item is a string, the badge will be set to that string.
 * If the item is a number, the badge will be set to that number.
 * **If the item is 0, the badge will be cleared, e.g. removed.**
 *
 * @param {NbTabComponent | undefined} tab - The tab to update the badge for
 * @param {number | string} item - The number or string to set the badge to
 * @returns {void}
 */
export const updateTabBadge = (
  tab: NbTabComponent | undefined,
  item: number | string
) => {
  if (!tab) {
    return;
  }

  if (typeof item === 'string') {
    tab.badgeText = item;
    tab.badgeStatus = 'primary';
    return;
  }

  if (item === 0) {
    tab.badgeText = '';
    tab.badgeStatus = 'basic';
    return;
  }

  tab.badgeText = `${item > 100 ? '99+' : item}`;
  tab.badgeStatus = 'primary';
};
