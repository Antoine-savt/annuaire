import { Vendor } from '../types';
import { vendorTarget } from '../vendorListings';
import { ContactAccess } from './ContactAccess';
import { Photo } from './Photo';
import { Tags } from './VenueListItem';
import { Link } from '../router';
import { paths } from '../routes';

function VendorImage({ vendor }: { vendor: Vendor }) {
  const alt = vendor.imageAlt ?? vendor.name;
  if (!vendor.image) {
    // No photo yet: a monogram keeps the card tidy.
    return (
      <div aria-hidden className="flex h-full min-h-48 items-center justify-center bg-sage-soft font-display text-6xl text-pine/60">
        {vendor.name.charAt(0)}
      </div>
    );
  }
  if (vendor.image.startsWith('/')) {
    return <img src={vendor.image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />;
  }
  return <Photo id={vendor.image} alt={alt} sizes="(min-width: 768px) 30vw, 100vw" maxWidth={800} />;
}

/** A vendor in its category list, with the same gated contact form and statistics as the venues. */
export function VendorCard({ vendor }: { vendor: Vendor }) {
  const target = vendorTarget(vendor);

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
        <VendorImage vendor={vendor} />
      </div>
      <div className="flex min-w-0 flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-sm text-muted">
            {vendor.commune}, {vendor.zone}
          </p>
          {vendor.priceFrom && <p className="text-sm font-semibold text-ink">{vendor.priceFrom}</p>}
        </div>
        <h3 className="mt-1 text-[1.8rem] leading-tight text-ink">
          <Link href={paths.vendorPage(vendor.category, vendor.slug)} className="hover:text-pine">
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
          <ContactAccess target={target} />
          <Link href={paths.vendorPage(vendor.category, vendor.slug)} className="btn-ghost">
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  );
}
