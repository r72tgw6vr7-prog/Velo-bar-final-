import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  title?: string;
}

const GoogleMap: React.FC<Props> = ({
  width = '100%',
  height = '400px',
  className = '',
  title = 'Velo.Bar – Standortkarte München',
}) => {
  const [mapError, setMapError] = React.useState(false);
  const [showFallback, setShowFallback] = React.useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const mapQuery = encodeURIComponent('München, Deutschland');
  const mapUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${mapQuery}&zoom=13&maptype=roadmap`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5!2d11.571546!3d48.137433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e7680e1b1b1b1%3A0x0!2sM%C3%BCnchen!5e0!3m2!1sen!2sde!4v1699112345678`;

  const handleMapError = () => {
    console.error('Map failed to load');
    setMapError(true);
    setShowFallback(true);
  };

  if (showFallback) {
    return (
      <div
        className='border-brand-primary/20 flex flex-col items-center justify-center rounded-lg border-2 bg-linear-to-br from-gray-800 to-gray-900 p-8 text-center'
        style={{ minHeight: height }}
      >
        <MapPin className='text-brand-primary mb-8 h-16 w-16' />
        <h3 className='mb-0 text-xl font-semibold text-white'>
          Velo.Bar – Mobile Cocktailbar in München
        </h3>
        <p className='mb-8 max-w-xs text-sm text-white/70'>München, Deutschland</p>
        <div className='flex flex-col gap-0 sm:flex-row'>
          <a
            href='https://maps.google.com/?q=M%C3%BCnchen,+Deutschland'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-brand-primary hover:bg-accent-primary-hover inline-flex items-center gap-0 rounded-lg px-8 py-0 font-medium text-black transition transition-colors duration-200 ease-out'
          >
            <ExternalLink size={16} />
            Karte öffnen
          </a>
          <a
            href='https://www.google.com/maps/dir//M%C3%BCnchen,+Deutschland'
            target='_blank'
            rel='noopener noreferrer'
            className='border-brand-primary text-brand-primary hover:bg-brand-primary/10 inline-flex items-center gap-0 rounded-lg border px-8 py-0 font-medium transition transition-colors duration-200 ease-out'
          >
            Route planen
          </a>
        </div>
        <p className='mt-8 text-xs text-white/50'>Karte temporär nicht verfügbar</p>
      </div>
    );
  }

  return (
    <div style={{ width, height }} className={`relative ${className}`}>
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
        <iframe
          src={mapUrl}
          style={{
            border: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title={title}
          onError={handleMapError}
        />
      </div>
      {mapError && !showFallback && (
        <div className='absolute top-2 right-2 z-10'>
          <button
            onClick={() => setShowFallback(true)}
            className='rounded bg-black/50 px-0 py-0 text-xs text-white transition duration-200 ease-out hover:bg-black/70'
          >
            Static Map
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
