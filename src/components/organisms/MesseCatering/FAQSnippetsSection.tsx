import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSnippetsSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export const FAQSnippetsSection: React.FC<FAQSnippetsSectionProps> = ({
  title,
  subtitle,
  faqs,
}) => (
  <div>
    <div className='mb-8 text-center'>
      <h2 className='text-on-light mb-0 text-2xl font-bold'>{title}</h2>
      <p className='text-sm text-(--color-text-on-light-secondary)'>{subtitle}</p>
    </div>
    <div className='space-y-8'>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className='snippet-block bg-navy-light border-accent-primary rounded-r-lg border-l-4 p-8 shadow-sm'
        >
          <h3 className='text-on-light mb-0 text-lg font-semibold'>{faq.question}</h3>
          <p className='leading-relaxed text-(--color-text-on-light-secondary)'>{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
);
