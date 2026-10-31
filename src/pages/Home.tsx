import { Link } from 'wouter';
import { featuredItems, homeContent, paragraphs, useCatalog, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { CmsIcon } from '@/components/CmsIcon';
import { DishCard, DishCardSkeleton } from '@/components/DishCard';
import { Flame } from '@/components/Flame';
import { HoursPlate } from '@/components/HoursPlate';
import { boardSections, MenuBoard, MenuBoardSkeleton } from '@/components/MenuBoard';
import { Placeholder } from '@/components/Placeholder';
import { Porthole } from '@/components/Porthole';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';

/** The store's name painted on the sign; the flame stays with its last word. */
function SignTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const last = words.pop();
  return (
    <h1 className="text-[clamp(3rem,9vw,6.25rem)]">
      {words.length > 0 && <span className="sign-name">{words.join(' ')} </span>}
      <span className="whitespace-nowrap">
        <span className="sign-name">{last}</span>
        <Flame flicker className="ml-[0.12em] inline-block h-[0.78em] w-auto align-[-0.04em]" />
      </span>
    </h1>
  );
}

export default function Home() {
  const { t } = useI18n();
  const cms = useCmsPage('home');
  const home = homeContent(cms.page);
  const catalog = useCatalog();
  usePageMeta(cms.page?.title, cms.page?.metaDescription);

  const featured = featuredItems(catalog.items, 4);
  const sections = boardSections(catalog.categories, catalog.items, 5);
  const categoryOf = (id: string | null) => catalog.categories.find((c) => c.id === id);
  const story = paragraphs(home.story.content);

  return (
    <>
      <section className="page pt-6 md:pt-10">
        <div className="sign grid items-center gap-x-10 gap-y-10 px-6 py-10 sm:px-10 md:grid-cols-12 md:px-14 md:py-14">
          <div className="md:col-span-7">
            {cms.isLoading ? (
              <div aria-hidden="true" className="flex flex-col gap-4">
                <div className="skeleton h-8 w-40 rounded-full" />
                <div className="skeleton h-20 w-full" />
                <div className="skeleton h-5 w-3/4" />
              </div>
            ) : cms.isError ? (
              <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
            ) : (
              <>
                {home.hero.badge && (
                  <p className="mb-4 inline-flex rounded-full bg-[color:var(--pp-navy)] px-4 py-1.5 font-bold text-[color:var(--pp-yellow)]">{home.hero.badge}</p>
                )}
                {home.hero.title && <SignTitle title={home.hero.title} />}
                {home.hero.subtitle && <p className="mt-5 max-w-[34rem] text-lg font-medium">{home.hero.subtitle}</p>}
                <div className="mt-7 flex flex-wrap gap-3">
                  {home.hero.ctaPrimary && (
                    <Link href="/products" className="btn btn-accent">
                      {home.hero.ctaPrimary}
                    </Link>
                  )}
                  {home.hero.ctaSecondary && (
                    <Link href="/contact" className="btn btn-sign">
                      {home.hero.ctaSecondary}
                    </Link>
                  )}
                </div>
              </>
            )}
            <HoursPlate className="mt-7 max-w-md" />
          </div>
          {home.hero.image && (
            <div className="px-4 md:col-span-5">
              <Porthole className="mx-auto w-[min(22rem,70vw)]">
                <StoreImage src={home.hero.image} alt="" priority sizes="(min-width: 768px) 22rem, 70vw" maxWidth={900} fallback={<Placeholder />} />
              </Porthole>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby={home.featured.title ? 'home-featured' : undefined} className="page pt-20">
        {(home.featured.title || home.featured.subtitle) && (
          <div className="mb-8 max-w-2xl">
            {home.featured.title && (
              <h2 id="home-featured" className="text-[clamp(2.2rem,5vw,3.4rem)] text-heading">
                {home.featured.title}
              </h2>
            )}
            {home.featured.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.featured.subtitle}</p>}
          </div>
        )}
        {catalog.isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <DishCardSkeleton key={i} />
            ))}
          </div>
        ) : catalog.isError ? (
          <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
        ) : featured.length === 0 ? (
          <p className="text-lg text-ink-soft">{t('catalog.empty.store')}</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <li key={item.id}>
                <DishCard item={item} category={categoryOf(item.categoryId)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {(sections.length > 0 || catalog.isLoading) && (
        <section aria-labelledby={home.categories.title ? 'home-menu' : undefined} className="page pt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              {home.categories.title && (
                <h2 id="home-menu" className="text-[clamp(2.2rem,5vw,3.4rem)] text-heading">
                  {home.categories.title}
                </h2>
              )}
              {home.categories.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.categories.subtitle}</p>}
            </div>
            {catalog.items.length > 0 && (
              <Link href="/products" className="btn btn-quiet">
                {t('catalog.viewAll')}
              </Link>
            )}
          </div>
          {catalog.isLoading ? <MenuBoardSkeleton /> : <MenuBoard sections={sections} label={home.categories.title ?? t('catalog.title')} />}
        </section>
      )}

      {home.benefits.length > 0 && (
        <section className="page pt-20">
          <ul className="grid gap-5 md:grid-cols-3">
            {home.benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4 rounded-[var(--radius-frame)] bg-surface-quiet p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--pp-yellow)] text-[color:var(--pp-navy)] ring-2 ring-[color:var(--pp-navy)]">
                  <CmsIcon icon={benefit.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-2xl text-heading">{benefit.title}</h3>
                  {benefit.description && <p className="mt-1 text-ink-soft">{benefit.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(home.story.title || story.length > 0) && (
        <section className="page pt-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
            {home.story.image && (
              <div className="frame aspect-[4/3] bg-surface-quiet shadow-soft md:col-span-5">
                <StoreImage src={home.story.image} alt="" sizes="(min-width: 768px) 36vw, 100vw" maxWidth={1100} fallback={<Placeholder />} />
              </div>
            )}
            <div className={home.story.image ? 'md:col-span-7' : 'md:col-span-9'}>
              {home.story.title && <h2 className="text-[clamp(2.2rem,5vw,3.4rem)] text-heading">{home.story.title}</h2>}
              <div className="mt-4 flex max-w-[58ch] flex-col gap-3 text-lg text-ink-soft">
                {story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link href="/about" className="btn btn-quiet mt-7">
                {t('nav.about')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {(home.cta.title || home.cta.description) && (
        <section className="page pt-20">
          <div className="sign flex flex-col items-start gap-6 px-7 py-10 sm:px-10 md:flex-row md:items-center md:justify-between md:px-14">
            <div className="max-w-xl">
              {home.cta.title && <h2 className="text-[clamp(2rem,4.4vw,3rem)]">{home.cta.title}</h2>}
              {home.cta.description && <p className="mt-2 text-lg font-medium">{home.cta.description}</p>}
            </div>
            {home.cta.buttonText && (
              <Link href="/contact" className="btn btn-accent shrink-0">
                {home.cta.buttonText}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
