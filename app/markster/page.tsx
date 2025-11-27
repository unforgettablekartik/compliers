import type { Metadata } from 'next';
import MarksterLanding from './MarksterClient';

export const metadata: Metadata = {
  title: 'The Compliers - Experts for Trademark filing, search & advisory',
  description: 'Lawyer-led, specialized trademark package for Indian startups & MSMEs: with deep search & risk opinion, form filing, examination reply, and 60-day watch—wrapped with transparency.',
};

export default function MarksterPage() {
  return <MarksterLanding />;
}
