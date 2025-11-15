import type { Metadata } from 'next';
import React from 'react';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Markster™ — Trademark Filing & Early Defence (India) | The Compliers',
  description: 'Lawyer-led, fixed-fee trademark package for Indian startups & MSMEs: deep search & risk opinion, smart class specs, filing (TM-A), one examination reply, and 60-day watch—wrapped in clear timelines and a status dashboard.',
};

export default function MarksterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
