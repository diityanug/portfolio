export interface EducationItem {
  readonly degree: string;
  readonly school: string;
  readonly period: string;
  readonly gpa: string;
  readonly details: string;
  readonly link: string;
}

export interface CertificateItem {
  readonly title: string;
  readonly issuer: string;
  readonly year: string;
  readonly link: string;
}