import type { Metadata } from 'next';
import MarksterDashboard from './DashboardClient';

export const metadata: Metadata = {
  title: 'Markster Dashboard - Track Your Trademark Applications',
  description: 'Manage your trademark orders, track filing status, view payments, and get support for your trademark applications with The Compliers.',
};

export default function DashboardPage() {
  return <MarksterDashboard />;
}
