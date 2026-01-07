import React from 'react';
import { Icon } from '../atoms/Icon/Icon.tsx';

interface ContactInfoCardProps {
  icon: string;
  title: string;
  value: string;
  href?: string;
  className?: string;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon: _icon,
  title,
  value,
  href,
  className = '',
}) => {
  const content = (
    <div
      className={`card border-color-border-on-dark flex items-start rounded-lg border border-solid p-6 ${className}`}
    >
      <Icon size={24} className='text-color-coral mr-8' />
      <div className='flex flex-col'>
        <span className='text-text-body mb-0 text-sm'>{title}</span>
        <span className='text-text-strong text-base'>{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className='block transition transition-opacity duration-200 ease-out hover:opacity-90'
        target='_blank'
        rel='noopener noreferrer'
      >
        {content}
      </a>
    );
  }

  return content;
};

export default ContactInfoCard;
