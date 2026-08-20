import type { SocialItem } from '../types/contact';

import GithubIcon from '../components/icons/GithubIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import ResumeIcon from '../components/icons/ResumeIcon';

export const EMAIL_MAILTO = 'mailto:diityanug13@gmail.com';

export const EMAIL_GMAIL_WEB =
  'https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=diityanug13@gmail.com';

export const RESUME_LINK =
  'https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing';

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