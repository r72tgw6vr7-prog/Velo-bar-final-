import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Vite provides import.meta.env types automatically
import {
  Calendar,
  Clock,
  User,
  Mail,
  Palette,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  useLuxuryInteractions,
  LuxuryButton,
  LuxuryInput,
} from '@/components/atoms/MicroInteractions.tsx';
import { useBusinessDesignSystem } from '@/foundation/BusinessProvider.tsx';

// Temporary solid background (image removed)

interface BookingCallToActionProps {
  onBookNow: () => void;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export function BookingCallToAction({ onBookNow }: BookingCallToActionProps) {
  const { language } = useBusinessDesignSystem();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const { registerParallax, registerAnimation } = useLuxuryInteractions();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const content = {
    DE: {
      headline: 'Bereit für Ihr nächstes Event?',
      subtitle: 'Lassen Sie uns gemeinsam Ihre Veranstaltung mit der mobilen Velo.Bar planen.',
      formTitle: 'Event anfragen',
      nameLabel: 'Ihr Name',
      namePlaceholder: 'Wie dürfen wir Sie ansprechen?',
      emailLabel: 'E-Mail Adresse',
      emailPlaceholder: 'ihre.email@beispiel.de',
      serviceLabel: 'Gewünschtes Event',
      servicePlaceholder: 'Wählen Sie Ihr Event-Format',
      dateLabel: 'Gewünschter Starttermin',
      timeLabel: 'Uhrzeit',
      messageLabel: 'Ihr Event (optional)',
      messagePlaceholder: 'Beschreiben Sie Ihr Event, Gästezahl und Location...',
      submitButton: 'Event anfragen',
      whatsappButton: 'WhatsApp Beratung',
      whatsappText: 'Schnelle Antworten per WhatsApp',
      services: [
        { value: 'corporate-event', label: 'Firmenfeier / Corporate Event' },
        { value: 'wedding', label: 'Hochzeit' },
        { value: 'private-party', label: 'Private Feier / Geburtstag' },
        { value: 'trade-show', label: 'Messe-Catering / Promotion' },
        { value: 'gin-tasting', label: 'Gin-Tasting / Cocktail-Workshop' },
        { value: 'other', label: 'Sonstiges Event' },
      ],
      timeSlots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      successMessage: 'Vielen Dank! Wir melden uns in Kürze mit einem Angebot für Ihr Event.',
      privacy: 'Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.',
      whatsappMessage:
        'Hallo! Ich interessiere mich für die mobile Cocktailbar Velo.Bar für ein Event.',
    },
    EN: {
      headline: 'Ready for your next event?',
      subtitle: 'Let’s plan your event together with the Velo.Bar mobile cocktail bar.',
      formTitle: 'Request an Event',
      nameLabel: 'Your Name',
      namePlaceholder: 'What should I call you?',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      serviceLabel: 'Desired Event',
      servicePlaceholder: 'Choose your event format',
      dateLabel: 'Preferred Start Date',
      timeLabel: 'Time',
      messageLabel: 'Your Event (optional)',
      messagePlaceholder: 'Describe your event, guest count and location...',
      submitButton: 'Request Event Quote',
      whatsappButton: 'WhatsApp Consultation',
      whatsappText: 'Quick answers via WhatsApp',
      services: [
        { value: 'corporate-event', label: 'Corporate Event' },
        { value: 'wedding', label: 'Wedding' },
        { value: 'private-party', label: 'Private Party / Birthday' },
        { value: 'trade-show', label: 'Trade Show Catering / Promotion' },
        { value: 'gin-tasting', label: 'Gin Tasting / Cocktail Workshop' },
        { value: 'other', label: 'Other Event' },
      ],
      timeSlots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      successMessage: 'Thank you! We will contact you shortly with an offer for your event.',
      privacy: 'By submitting, you agree to our privacy policy.',
      whatsappMessage:
        'Hello! I am interested in booking the Velo.Bar mobile cocktail bar for an event.',
    },
  };

  const t = content[language];

  // Setup parallax and animations
  useEffect(() => {
    registerParallax(backgroundRef.current, 'bg');
    registerParallax(contentRef.current, 'subtle');
    registerAnimation(formRef.current);
  }, [registerParallax, registerAnimation]);

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Show WhatsApp button after a delay
          setTimeout(() => setShowWhatsApp(true), 1000);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would submit to your backend here
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console -- dev-only log of simulated booking CTA payload
      console.log('Form submitted:', formData);
    }

    setIsSubmitting(false);

    // Reset form and show success (or redirect to booking flow)
    setFormData({
      name: '',
      email: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    });

    // Open booking flow instead of just showing success
    onBookNow();
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '4989269313'; // Munich studio number
    const message = encodeURIComponent(t.whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get tomorrow's date as minimum
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section
      ref={sectionRef}
      className='parallax-container relative flex min-h-screen items-center justify-center overflow-hidden'
      aria-label={t.headline}
    >
      {/* Parallax Background with luxury effects */}
      <div ref={backgroundRef} className='parallax-bg absolute inset-0'>
        <div className='bg-navy absolute inset-0' />

        {/* Enhanced Luxury Gradient Overlay */}
        <div className='from-navy/95 via-navy/85 to-navy/95 absolute inset-0 bg-linear-to-br'></div>

        {/* Accent Accent Gradients with animation */}
        <div className='via-accent-primary/5 absolute inset-0 animate-pulse bg-linear-to-r from-transparent to-transparent'></div>
        <div className='to-navy/90 absolute inset-0 bg-linear-to-b from-transparent via-transparent'></div>

        {/* Luxury Pattern Overlay */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(107, 114, 128, 0.2) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Content Container with subtle parallax */}
      <div
        ref={contentRef}
        className='parallax-subtle relative z-10 mx-auto max-w-[1104px] px-8 py-24 sm:px-8 lg:px-8'
      >
        {/* Section Header with luxury animations */}
        <motion.div
          className='animate-luxury-fade-in mb-16 text-center'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className='text-headline-xl font-headline text-accent-primary magnetic-cursor-target relative mb-8'
            style={{
              textShadow: '0 0 20px rgba(107, 114, 128, 0.4), 0 0 40px rgba(107, 114, 128, 0.2)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {t.headline}

            {/* Decorative Elements */}
            <motion.div
              className='absolute -top-4 -right-4'
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={24} className='text-accent-primary/60' />
            </motion.div>
            <motion.div
              className='absolute -bottom-4 -left-4'
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={20} className='text-white/40' />
            </motion.div>
          </motion.h2>

          <motion.p
            className='text-body-large font-body mx-auto max-w-3xl text-white/80'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Enhanced Booking Form with luxury card */}
        <motion.div
          ref={formRef}
          className='animate-luxury-scale-in mx-auto max-w-4xl'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className='card-luxury luxury-hover border-accent-primary/30 rounded-3xl border-2 p-8 shadow-lg lg:p-16'>
            {/* Form Header */}
            <div className='mb-8 text-center'>
              <h3 className='text-headline-md font-headline text-accent-primary mb-8'>
                {t.formTitle}
              </h3>
              <div className='via-accent-primary mx-auto h-0.5 w-24 bg-linear-to-r from-transparent to-transparent'></div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Name and Email Row */}
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {/* Name Input */}
                <div className='space-y-0'>
                  <label
                    htmlFor='name'
                    className='text-body font-body flex items-center space-x-0 font-medium text-white'
                  >
                    <User size={18} className='text-accent-primary' />
                    <span>{t.nameLabel}</span>
                  </label>
                  <LuxuryInput
                    type='text'
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                {/* Email Input */}
                <div className='space-y-0'>
                  <label
                    htmlFor='email'
                    className='text-body font-body flex items-center space-x-0 font-medium text-white'
                  >
                    <Mail size={18} className='text-accent-primary' />
                    <span>{t.emailLabel}</span>
                  </label>
                  <LuxuryInput
                    type='email'
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className='space-y-0'>
                <label
                  htmlFor='service'
                  className='text-body font-body flex items-center space-x-0 font-medium text-white'
                >
                  <Palette size={18} className='text-accent-primary' />
                  <span>{t.serviceLabel}</span>
                </label>
                <select
                  id='service'
                  required
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  className='input-luxury font-body text-body touch-target w-full rounded-xl px-8 py-8'
                >
                  <option value='' disabled className='text-white/60'>
                    {t.servicePlaceholder}
                  </option>
                  {t.services.map((service) => (
                    <option
                      key={service.value}
                      value={service.value}
                      className='bg-navy text-white'
                    >
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time Row */}
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {/* Date Input */}
                <div className='space-y-0'>
                  <label
                    htmlFor='date'
                    className='text-body font-body flex items-center space-x-0 font-medium text-white'
                  >
                    <Calendar size={18} className='text-accent-primary' />
                    <span>{t.dateLabel}</span>
                  </label>
                  <input
                    type='date'
                    id='date'
                    required
                    min={minDate}
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className='input-luxury font-body text-body touch-target flex h-full w-full flex-col rounded-xl px-8 py-8'
                  />
                </div>

                {/* Time Selection */}
                <div className='space-y-0'>
                  <label
                    htmlFor='time'
                    className='text-body font-body flex items-center space-x-0 font-medium text-white'
                  >
                    <Clock size={18} className='text-accent-primary' />
                    <span>{t.timeLabel}</span>
                  </label>
                  <select
                    id='time'
                    required
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className='input-luxury font-body text-body touch-target flex h-full w-full flex-col rounded-xl px-8 py-8'
                  >
                    <option value='' disabled className='text-white/60'>
                      Wählen Sie eine Zeit
                    </option>
                    {t.timeSlots.map((time) => (
                      <option
                        key={time}
                        value={time}
                        className='bg-navy flex h-full flex-col text-white'
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Textarea */}
              <div className='space-y-0'>
                <label
                  htmlFor='message'
                  className='text-body font-body flex items-center space-x-0 font-medium text-white'
                >
                  <MessageCircle size={18} className='text-accent-primary' />
                  <span>{t.messageLabel}</span>
                </label>
                <textarea
                  id='message'
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className='input-luxury font-body text-body w-full resize-none rounded-xl px-8 py-8'
                />
              </div>

              {/* Privacy Notice */}
              <p className='text-body-small font-body text-center text-white/60'>{t.privacy}</p>

              {/* Submit Button with luxury interactions */}
              <LuxuryButton
                size='lg'
                disabled={isSubmitting}
                className='flex w-full items-center justify-center space-x-0 px-8 py-8'
              >
                {isSubmitting ? (
                  <>
                    <div className='border-navy/30 border-t-navy h-5 w-5 animate-spin rounded-full border-2' />
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <span>{t.submitButton}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </LuxuryButton>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Enhanced WhatsApp Quick Contact */}
      <motion.div
        className='fixed right-8 bottom-8 z-20'
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{
          opacity: showWhatsApp ? 1 : 0,
          scale: showWhatsApp ? 1 : 0,
          rotate: showWhatsApp ? 0 : -45,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: showWhatsApp ? 0 : 0,
        }}
      >
        <motion.button
          onClick={handleWhatsAppClick}
          className='group magnetic-cursor-target luxury-hover u-elevation-3 touch-target flex items-center space-x-0 rounded-full bg-green-500 p-8 text-white transition duration-200 ease-out hover:bg-green-600'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={t.whatsappButton}
        >
          {/* WhatsApp Icon */}
          <div className='flex h-8 w-8 items-center justify-center'>
            <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.69z' />
            </svg>
          </div>

          {/* Expandable Text */}
          <motion.div
            className='max-w-0 overflow-hidden transition-all duration-500 group-hover:max-w-xs'
            initial={{ maxWidth: 0 }}
            whileHover={{ maxWidth: '200px' }}
          >
            <div className='pr-0 whitespace-nowrap'>
              <div className='text-sm font-bold'>{t.whatsappButton}</div>
              <div className='text-xs opacity-90'>{t.whatsappText}</div>
            </div>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
