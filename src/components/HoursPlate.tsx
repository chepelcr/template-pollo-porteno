import { Clock } from 'lucide-react';
import { businessHours, useStore } from '@/core';
import { useI18n } from '@/i18n';

/** The store's hours as the store wrote them (informational, never an "open now" claim). */
export function HoursPlate({ className = '' }: { className?: string }) {
  const { contact } = useStore();
  const { t } = useI18n();
  const hours = businessHours(contact);
  if (!hours) return null;
  return (
    <div className={`flex items-start gap-3 rounded-2xl bg-[color:var(--pp-whitewash)] p-4 text-[color:var(--pp-navy)] shadow-soft ring-2 ring-[color:var(--pp-navy)] ${className}`}>
      <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-display text-lg leading-tight">{t('contact.hours')}</p>
        <p className="whitespace-pre-line text-sm">{hours}</p>
      </div>
    </div>
  );
}
