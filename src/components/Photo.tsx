import { imgSrcSet, imgUrl, isPhotoUrl, localSrcSet, localThumb } from '../images';

interface PhotoProps {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  maxWidth?: number;
}

export function Photo({ id, alt, sizes, className = '', priority = false, maxWidth = 1600 }: PhotoProps) {
  // Photos uploaded by professionals are already resized when uploaded.
  const uploaded = isPhotoUrl(id);
  // A curated venue's own photos come in two sizes (see src/images.ts).
  const local = localSrcSet(id);
  const src = local ? (maxWidth <= 480 ? localThumb(id) : id) : uploaded ? id : imgUrl(id, 800);
  return (
    <img
      src={src}
      srcSet={local ?? (uploaded ? undefined : imgSrcSet(id, maxWidth))}
      sizes={local || !uploaded ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
