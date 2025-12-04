import type { Metadata } from 'next';
import MarksterLanding from './MarksterClient';

export const metadata: Metadata = {
  title: 'The Compliers - Experts for Trademark filing, search & advisory',
  description: 'Secure your brand identity in 3 days. Online Trademark search and filing service for Indian businesses. Fast, digital, and rejection-proof.',
};

export default function MarksterPage() {
  return <MarksterLanding />;
}
