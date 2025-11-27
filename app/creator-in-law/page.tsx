import type { Metadata } from 'next';
import CreatorInLawLanding from './CreatorInLawClient';

export const metadata: Metadata = {
  title: 'The Compliers - Legal Support for Creators & Influencers',
  description: 'The Compliers helps you decode brand deals, protect your content, and stay compliant — so you can focus on content creation and not contracts and legal verification.',
};

export default function CreatorInLawPage() {
  return <CreatorInLawLanding />;
}
