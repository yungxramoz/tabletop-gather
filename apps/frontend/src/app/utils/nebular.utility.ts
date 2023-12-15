import { NbTabComponent } from '@nebular/theme';

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
