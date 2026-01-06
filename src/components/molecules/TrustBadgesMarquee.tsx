import React from 'react';
import { TrustBadges } from './TrustBadges';

export default function TrustBadgesMarquee({ className = '' }: { className?: string }) {
  return <TrustBadges className={className} variant='marquee' />;
}
