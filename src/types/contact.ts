import type { ReactNode } from 'react';

export interface SocialItem {
  readonly name: string;
  readonly url: string;
  readonly icon: ReactNode;
}