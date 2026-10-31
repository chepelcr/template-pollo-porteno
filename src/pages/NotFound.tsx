import { Link } from 'wouter';
import { usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { Flame } from '@/components/Flame';

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t('notFound.title'));
  return (
    <div className="page pt-12">
      <div className="sign grid items-center gap-8 px-8 py-12 sm:px-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="text-[clamp(2.4rem,6vw,4rem)]">{t('notFound.title')}</h1>
          <p className="mt-4 max-w-md text-lg font-medium">{t('notFound.body')}</p>
          <Link href="/" className="btn btn-accent mt-7">
            {t('notFound.cta')}
          </Link>
        </div>
        <div className="hidden justify-center md:col-span-4 md:flex">
          <Flame className="h-40 w-auto opacity-90" />
        </div>
      </div>
    </div>
  );
}
