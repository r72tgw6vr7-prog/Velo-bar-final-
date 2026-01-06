import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button/Button';
import { cn } from '@/utils/classname';

export interface ServiceCardMobileProps {
  title: string;
  description: string;
  ctaHref?: string;
  ctaText?: string;
  className?: string;
  active?: boolean;
}

export const ServiceCardMobile: React.FC<ServiceCardMobileProps> = ({
  title,
  description,
  ctaHref = '/kontakt',
  ctaText = 'Anfrage stellen',
  className = '',
  active = false,
}) => {
  return (
    <Card
      variant={active ? 'elevated' : 'default'}
      selected={active}
      padding='lg'
      hover={false}
      className={cn('w-full', className)}
      aria-current={active ? 'true' : 'false'}
    >
      <Card.Body className='gap-3'>
        <h3 className='font-headline text-color-text-on-light text-[1.125rem] leading-tight md:text-xl'>
          {title}
        </h3>
        <p className='text-color-text-on-light-secondary text-sm leading-relaxed'>{description}</p>
      </Card.Body>
      <Card.Footer className='border-t-0 pt-0'>
        <Button asChild variant='primary' size='md' fullWidth>
          <a href={ctaHref} aria-label={`${ctaText} – ${title}`}>
            {ctaText}
          </a>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ServiceCardMobile;
