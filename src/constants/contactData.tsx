import type { SocialItem } from '../types/contact';

export const EMAIL_LINK = 'https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=diityanug13@gmail.com';
export const RESUME_LINK = 'https://drive.google.com/file/d/1QutvnoHILQ140dkXgy_bBqjG171XwpU6/view?usp=sharing';

export const SOCIAL_LINKS: readonly SocialItem[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/diityanug',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    name: 'GitHub',
    url: 'https://github.com/diityanug',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.32a12.3 12.3 0 0 0-6.2 0C6.15 2.5 5 2.8 5 2.8a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 12c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path>
        <path d="M8 19c-3 1-4-1-5-1"></path>
      </svg>
    )
  }
] as const;

export const RESUME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);