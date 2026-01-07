// src/components/TrustBadgesBar.ts
import React from 'react';
import { TrustBadges } from './TrustBadges.ts';

export function TrustBadgesBar({ className = '' }: { className?: string }) {
  return <TrustBadges className={className} variant='bar' />;
}

export default TrustBadgesBar;
