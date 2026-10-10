import { imgSrcSet, imgUrl, isPhotoUrl } from '../images';

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
  return (
    <img
      src={uploaded ? id : imgUrl(id, 800)}
      srcSet={uploaded ? undefined : imgSrcSet(id, maxWidth)}
      sizes={uploaded ? undefined : sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
