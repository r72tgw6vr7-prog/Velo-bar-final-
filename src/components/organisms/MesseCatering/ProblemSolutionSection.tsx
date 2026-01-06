import React from 'react';
import { Check, Target } from 'lucide-react';

export const ProblemSolutionSection: React.FC = () => (
  <div className='grid items-center gap-16 lg:grid-cols-2'>
    <div>
      <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
        Warum 90% der Messebesucher an Ihrem Stand vorbeigehen
      </h2>
      <p className='mb-8 text-lg text-(--color-text-on-light-secondary)'>
        Die meisten Messestände kämpfen um Aufmerksamkeit. Besucher sind reizüberflutet, haben wenig
        Zeit und müssen priorisieren. Ohne einen klaren Stopper laufen sie vorbei.
      </p>
      <div className='space-y-8'>
        {[
          {
            title: 'Austauschbares Stand-Design',
            description: 'Roll-ups und Flyer wie alle anderen',
          },
          {
            title: 'Kein Gesprächs-Einstieg',
            description: 'Kalte Ansprache wirkt aufdringlich',
          },
          {
            title: 'Kurze Verweildauer',
            description: 'Besucher nehmen Flyer und gehen',
          },
        ].map((item) => (
          <div key={item.title} className='flex items-start gap-8'>
            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100'>
              <span className='font-bold text-red-500'>✕</span>
            </div>
            <div>
              <div className='text-on-light font-semibold'>{item.title}</div>
              <div className='text-(--color-text-on-light-secondary)'>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className='flex h-full flex-col rounded-2xl bg-(--color-bg-surface-tinted) p-8'>
      <h3 className='text-on-light mb-8 flex items-center gap-0 text-2xl font-bold'>
        <Target className='text-accent-primary' size={28} />
        Die Lösung: Mobile Cocktailbar
      </h3>
      <p className='mb-8 text-(--color-text-on-light-secondary)'>
        Unsere Fahrrad-Bar ist ein einzigartiger Eye-Catcher, der Besucher magisch anzieht. Ein
        Cocktail bricht das Eis – Sie führen qualifizierte Gespräche statt kalter Ansprachen.
      </p>
      <div className='space-y-8'>
        <div className='flex items-start gap-8'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100'>
            <Check className='text-green-600' size={18} />
          </div>
          <div>
            <div className='text-on-light font-semibold'>Einzigartiger Stopper</div>
            <div className='text-(--color-text-on-light-secondary)'>
              Besucher stoppen, schauen, kommen
            </div>
          </div>
        </div>
        <div className='flex items-start gap-8'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100'>
            <Check className='text-green-600' size={18} />
          </div>
          <div>
            <div className='text-on-light font-semibold'>Natürlicher Gesprächsstarter</div>
            <div className='text-(--color-text-on-light-secondary)'>
              &quot;Darf ich Ihnen einen Drink anbieten?&quot;
            </div>
          </div>
        </div>
        <div className='flex items-start gap-8'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100'>
            <Check className='text-green-600' size={18} />
          </div>
          <div>
            <div className='text-on-light font-semibold'>Verlängerte Verweildauer</div>
            <div className='text-(--color-text-on-light-secondary)'>
              Cocktails trinken dauert – Zeit für Ihr Pitch
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
