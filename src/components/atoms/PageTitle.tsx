import React from 'react';
import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <motion.header
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className='page-title'>{title}</h1>
      {subtitle && (
        <p className='mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl'>
          {subtitle}
        </p>
      )}
    </motion.header>
  );
};
