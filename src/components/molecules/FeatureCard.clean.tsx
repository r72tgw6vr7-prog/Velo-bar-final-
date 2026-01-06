/**
 * FeatureCard Molecule - Content-Agnostic
 * ========================================
 * Card for displaying features with icon, title, and description.
 * All content passed via props.
 */

import React from 'react';
import { CardClean } from './Card.clean';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
import { cn } from '@/utils/classname';

export interface FeatureCardCleanProps {
  /** Icon or image element */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Additional CSS classes */
  className?: string;
}

export const FeatureCardClean: React.FC<FeatureCardCleanProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <CardClean padding='lg' hoverable className={cn('h-full', className)}>
      <div className='flex flex-col items-center space-y-8 text-center'>
        {icon && (
          <div className='bg-color-brand-primary bg-opacity-10 flex h-16 w-16 items-center justify-center rounded-full'>
            {icon}
          </div>
        )}
        <Heading level='h3' size='lg'>
          {title}
        </Heading>
        <Text variant='secondary'>{description}</Text>
      </div>
    </CardClean>
  );
};
