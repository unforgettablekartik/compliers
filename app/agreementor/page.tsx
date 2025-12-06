import type { Metadata } from 'next';
import AgreementorClient from './AgreementorClient';

export const metadata: Metadata = {
  title: 'Agreementor™ by The Compliers - Contracts & Agreements for Growing Businesses',
  description: 'Expert contract drafting, review, and risk assessment for founders, growing businesses, HR, real estate, creators, and digital businesses. Fixed fees, fast turnaround, specialized legal support.',
  keywords: 'contracts, agreements, legal counsel, business contracts, NDA, MSA, employment agreements, privacy policy, terms of service, GDPR, DPDP, founders agreement, shareholders agreement',
};

export default function AgreementorPage() {
  return <AgreementorClient />;
}
