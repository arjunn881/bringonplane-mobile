import { ItemStatus } from '../types';
import { Colors } from '../constants/colors';

export interface StatusBadgeConfig {
  label: string;
  shortLabel: string;
  icon: string;
  bg: string;
  text: string;
  border: string;
  solid: string;
}

export function getStatusConfig(status: ItemStatus): StatusBadgeConfig {
  switch (status) {
    case 'allowed':
      return {
        label: 'ALLOWED',
        shortLabel: 'Allowed',
        icon: '✓',
        bg: Colors.allowed.badgeBg,
        text: Colors.allowed.badgeText,
        border: Colors.allowed.border,
        solid: Colors.allowed.solid,
      };
    case 'conditional':
      return {
        label: 'RESTRICTED',
        shortLabel: 'Restricted',
        icon: '⚠',
        bg: Colors.restricted.badgeBg,
        text: Colors.restricted.badgeText,
        border: Colors.restricted.border,
        solid: Colors.restricted.solid,
      };
    case 'not_allowed':
      return {
        label: 'PROHIBITED',
        shortLabel: 'Prohibited',
        icon: '✕',
        bg: Colors.prohibited.badgeBg,
        text: Colors.prohibited.badgeText,
        border: Colors.prohibited.border,
        solid: Colors.prohibited.solid,
      };
    default:
      return {
        label: 'CHECK RULES',
        shortLabel: 'Check Rules',
        icon: '?',
        bg: Colors.unknown.badgeBg,
        text: Colors.unknown.badgeText,
        border: Colors.unknown.border,
        solid: Colors.unknown.solid,
      };
  }
}
