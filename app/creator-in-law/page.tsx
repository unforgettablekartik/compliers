import type { Metadata } from 'next';
import CreatorInLawLanding from './CreatorInLawClient';

export const metadata: Metadata = {
  title: 'The Compliers - Legal Support for Creators & Influencers',
  description: 'The Compliers review agency contracts, sponsorship deals, and IP rights for Indian content creators. Creators focus on content creation with no headache about contracts and legal risks.',
};

export default function CreatorInLawPage() {
  return <CreatorInLawLanding />;
}
