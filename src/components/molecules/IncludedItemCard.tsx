import React from 'react';

export interface IncludedItemCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

export const IncludedItemCard: React.FC<IncludedItemCardProps> = ({ icon, title, body }) => {
  return (
    <article className='included-card'>
      <div className='included-card__icon'>{icon}</div>
      <h3 className='included-card__title'>{title}</h3>
      <p className='included-card__body'>{body}</p>
    </article>
  );
};

export default IncludedItemCard;
