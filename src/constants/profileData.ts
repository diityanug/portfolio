import type { EducationItem, CertificateItem } from '../types/about';

export const EDUCATION_DATA: readonly EducationItem[] = [
  {
    degree: 'Master of Science in Information Technology',
    school: 'President University',
    period: '2023 - 2025',
    gpa: '3.64',
    details: 'Focused on Business Intelligence.',
    link: '#'
  },
  {
    degree: 'Bachelor of Accounting',
    school: 'Tadulako University',
    period: '2017 - 2022',
    gpa: '3.71',
    details: 'Focused on Financial Accounting and Taxation.',
    link: '#'
  }
] as const;

export const CERTIFICATES_DATA: readonly CertificateItem[] = [
  { title: 'Learn Frontend Web Development (HTML, CSS dan Javascript)', issuer: 'Udemy', year: '2025', link: '#' },
  { title: 'Java Bootcamp: Learn Java with 100+ Java Projects', issuer: 'Udemy', year: '2025', link: '#' },
  { title: 'Cloud Practitioner Essentials (Learn AWS Cloud Basic)', issuer: 'Dicoding Indonesia', year: '2025', link: '#' },
  { title: 'Learn Machine Learning for Beginners', issuer: 'Dicoding Indonesia', year: '2024', link: '#' },
  { title: 'English Speaking Intensive 1 - Level A1 (Excellent)', issuer: 'WECAMP English Village', year: '2023', link: '#' },
  { title: 'Tax Brevet Training AB + e-SPT', issuer: 'Centre for Accounting Development, Universitas Indonesia', year: '2023', link: '#' },
  { title: 'Start Programming with Python', issuer: 'Dicoding Indonesia', year: '2023', link: '#' },
  { title: 'Learn JavaScript Programming Basics', issuer: 'Dicoding Indonesia', year: '2023', link: '#' },
  { title: 'Learn Basic Structured Query Language (SQL)', issuer: 'Dicoding Indonesia', year: '2023', link: '#' },
  { title: 'Learn DevOps Basics', issuer: 'Dicoding Indonesia', year: '2023', link: '#' },
  { title: 'Starting Basic Programming to Become a Software Developer', issuer: 'Dicoding Indonesia', year: '2023', link: '#' }
] as const;