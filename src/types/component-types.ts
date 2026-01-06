import { ReactNode } from 'react';
import { PageType } from './route-types';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export interface Artist {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  portfolio: string[];
}

export interface ArtistDetailHeroProps {
  artist: Artist;
}

export interface ArtistPortfolioProps {
  artistId: string;
  size?: 'small' | 'large';
}

export interface StickyBookingBarProps {
  artistId: string;
  artistName: string;
}

export interface HomePageProps {
  onBookNow?: () => void;
  onBookService?: (serviceId: string) => void;
  onBookArtist?: (artistId: string) => void;
}

export interface BookingCallToActionProps {
  className?: string;
  onBook?: () => void;
}
