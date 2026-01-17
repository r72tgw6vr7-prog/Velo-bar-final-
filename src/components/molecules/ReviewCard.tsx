import React from 'react';
import Star from 'lucide-react/dist/esm/icons/star';

interface ReviewCardProps {
  rating: number; // Out of 5
  content: string;
  author: string;
  source: string;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  content,
  author,
  source,
  className = '',
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Star
          key={i}
          className='fill-accent-primary text-accent-primary h-6 w-6'
          aria-label='star'
        />,
      );
    }
    return stars;
  };

  return (
    <div
      className={`badge-card card flex w-[340px] flex-col items-start rounded-2xl py-[25px] ${className}`}
    >
      <div className='mx-8 mb-1 flex'>{renderStars()}</div>
      <div className='mx-8 mb-8 flex flex-col items-center self-stretch'>
        <span className='text-text-on-dark w-[280px] text-[15px]'>{content}</span>
      </div>
      <div className='ml-8 flex items-start gap-px'>
        <span className='text-text-on-dark text-[15px]'>— {author}</span>
        {source && <span className='text-text-on-dark ml-0 text-[15px]'>, {source}</span>}
      </div>
    </div>
  );
};

export default ReviewCard;
