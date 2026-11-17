import { Vendor } from '../types';
import { Tags } from './VenueListItem';
import { PhotoCarousel } from './VenueGallery';
import { Link } from '../router';
import { usePaths, useT } from '../i18n/lang';

/** A vendor's photos: the cover first, then the extra ones, without duplicates. */
export function vendorPhotos(v: Vendor): string[] {
  return [v.image, ...(v.photos ?? [])].filter((p, i, all): p is string => !!p && all.indexOf(p) === i);
}

/** A vendor in its category list; the contact form is on its page, as for the venues. */
export function VendorCard({ vendor }: { vendor: Vendor }) {
  const t = useT();
  const href = usePaths().vendorPage(vendor.category, vendor.slug);
  const photos = vendorPhotos(vendor);

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      {photos.length > 0 ? (
        <PhotoCarousel
          photos={photos}
          name={vendor.name}
          firstAlt={vendor.imageAlt ?? vendor.name}
          href={href}
          lastLabel={t('Voir la fiche', 'View listing')}
          className="aspect-[16/10] md:aspect-auto md:min-h-64"
        />
      ) : (
        // No photo yet: a monogram keeps the card tidy.
        <div aria-hidden className="flex aspect-[16/10] min-h-48 items-center justify-center bg-sage-soft font-display text-6xl text-pine/60 md:aspect-auto">
          {vendor.name.charAt(0)}
        </div>
      )}
      <div className="flex min-w-0 flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-sm text-muted">
            {vendor.commune}, {vendor.zone}
          </p>
          {vendor.priceFrom && <p className="text-sm font-semibold text-ink">{vendor.priceFrom}</p>}
        </div>
        <h3 className="mt-1 text-[1.8rem] leading-tight text-ink">
          <Link href={href} className="hover:text-pine">
            {vendor.name}
          </Link>
        </h3>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink/80">{vendor.summary}</p>
        {vendor.tags.length > 0 && (
          <div className="mt-4">
            <Tags tags={vendor.tags} />
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-auto md:pt-5">
          <Link href={href} className="btn-primary">
            {t('Obtenir les coordonnées', 'Get contact details')}
          </Link>
          <Link href={href} className="btn-ghost">
            {t('Voir la fiche', 'View listing')}
          </Link>
        </div>
      </div>
    </article>
  );
}
