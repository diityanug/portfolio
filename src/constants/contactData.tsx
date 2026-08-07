import type { SocialItem } from '../types/contact';

import GithubIcon from '../components/icons/GithubIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import ResumeIcon from '../components/icons/ResumeIcon';

export const EMAIL_LINK =
  'https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=diityanug13@gmail.com';

export const RESUME_LINK =
  'https://drive.google.com/file/d/1QutvnoHILQ140dkXgy_bBqjG171XwpU6/view?usp=sharing';

export const SOCIAL_LINKS: readonly SocialItem[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/diityanug',
    icon: <LinkedInIcon />,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/diityanug',
    icon: <GithubIcon />,
  },
] as const;

export const RESUME_ICON = <ResumeIcon />;