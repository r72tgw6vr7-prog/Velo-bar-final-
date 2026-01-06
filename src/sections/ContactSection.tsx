import React from 'react';
import { ContactForm as ContactFormComponent } from '@/components/organisms/ContactForm';

export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
  [key: string]: string | boolean | undefined;
}

interface ContactSectionProps {
  title: string;
  subtitle: string;
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  contactInfo,
  socialLinks,
  onSubmit,
  className = '',
}) => {
  // Adapter: ContactForm uses a narrower FormData shape; map it to the section's ContactFormData
  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    service?: string;
    message: string;
    privacyPolicy: boolean;
  }) => {
    return onSubmit({
      name: data.name,
      email: data.email,
      phone: undefined,
      subject: data.service ?? '',
      message: data.message,
      privacyPolicy: data.privacyPolicy,
    });
  };
  return (
    <div className={` ${className}`}>
      <div className='container mx-auto px-8 py-24'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <h2 className='text-accent-primary mb-8 text-[42px] font-bold'>{title}</h2>
          <p className='mx-auto max-w-2xl text-lg text-white'>{subtitle}</p>
        </div>

        <div className='grid grid-cols-1 gap-16 lg:grid-cols-2'>
          {/* Contact Form (use canonical ContactForm organism) */}
          <div>
            <ContactFormComponent onSubmit={handleFormSubmit} />
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            {/* Contact Cards */}
            <div className='grid gap-8'>
              {contactInfo.map((info) => (
                <div
                  key={`contact-${info.title}-${info.value}`}
                  className='flex h-full flex-col items-center rounded-lg p-8'
                >
                  {info.icon && <img src={info.icon} alt={info.title} className='mr-8 h-8 w-8' />}
                  {info.icon && (
                    <img src={info.icon} alt={info.title} className='mr-8 h-8 w-8' loading='lazy' />
                  )}
                  <div>
                    <h4 className='text-lg font-semibold text-white'>{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className='text-accent-primary transition duration-200 ease-out hover:underline'
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className='text-white'>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className='flex h-full flex-col border-t border-[#C0BFBF33] pt-8'>
              <h3 className='mb-8 text-xl text-white'>Folge uns</h3>
              <div className='flex gap-8'>
                {socialLinks.map((social) => (
                  <a
                    key={`social-${social.label}-${social.url}`}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:bg-accent-primary flex h-full flex-col rounded-full p-0 transition-colors duration-200'
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className='h-6 w-6' />
                    <img src={social.icon} alt={social.label} className='h-6 w-6' loading='lazy' />
                  </a>
                ))}
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className='flex h-[300px] h-full flex-col overflow-hidden rounded-lg'>
              <iframe
                title='Location Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
