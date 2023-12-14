import { NbTabComponent } from '@nebular/theme';

export const updateNumberBadge = (
  tab: NbTabComponent | undefined,
  count: number
) => {
  if (!tab) {
    return;
  }

  if (count === 0) {
    tab.badgeText = '';
    tab.badgeStatus = 'basic';
    return;
  }

  tab.badgeText = `${count > 100 ? '99+' : count}`;
  tab.badgeStatus = 'primary';
};
