// src/components/TrustBadgesBar.tsx
import React from 'react';
import { TrustBadges } from './TrustBadges';

export function TrustBadgesBar({ className = '' }: { className?: string }) {
  return <TrustBadges className={className} variant='bar' />;
}

export default TrustBadgesBar;
