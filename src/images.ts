/** Unsplash photo ids used across the site (all illustrative). */
export const photos = {
  ceremonyAisle: 'photo-1469371670807-013ccf25f16a',
  vineyardRows: 'photo-1560493676-04071c5f467b',
  floralColonnade: 'photo-1523438885200-e635ba2c371e',
  wineCellar: 'photo-1528823872057-9c018a7a7553',
  lightsHall: 'photo-1510076857177-7470076d4098',
  hillsideArch: 'photo-1529636798458-92182e662485',
  toastLights: 'photo-1527529482837-4698179dc6ce',
  longTable: 'photo-1511795409834-ef04bbd61622',
  chandelierHall: 'photo-1519167758481-83f550bb49b3',
  tableRed: 'photo-1530023367847-a683933f4172',
  gardenCeremony: 'photo-1505944357431-27579db47558',
  seaDeck: 'photo-1582719508461-905c673771fd',
  palmPool: 'photo-1600011689032-8b628b8a8747',
  sunsetHills: 'photo-1464207687429-7505649dae38',
  villaArches: 'photo-1416331108676-a22ccb276e35',
  forestLight: 'photo-1523712999610-f77fbcfc3843',
  confettiCouple: 'photo-1583939003579-730e3918a45a',
  brideBouquet: 'photo-1549417229-7686ac5595fd',
  wineGrapes: 'photo-1474722883778-792e7990302f',
  coastVillage: 'photo-1533105079780-92b9be482077',
  coupleRoad: 'photo-1532712938310-34cb3982ef74',
  catering: 'photo-1555244162-803834f70033',
  bouquetRoses: 'photo-1525258946800-98cfd641d0de',
  concert: 'photo-1516450360452-9312f5e86fc7',
  coupleNight: 'photo-1519741497674-611481863552',
  planning: 'photo-1522201949034-507737bce479',
  makeup: 'photo-1487412947147-5cebf100ffc2',
  brideVeil: 'photo-1546032996-6dfacbacbf3f',
  coupleBw: 'photo-1520342868574-5fa3804e551c',
  weddingCake: 'photo-1519654793190-2e8a4806f1f2',
  ringsFlowers: 'photo-1515934751635-c81c6bc9a2d8',
  dressSuit: 'photo-1550005809-91ad75fb315f',
} as const;

const WIDTHS = [480, 800, 1200, 1600, 2000];

/** Absolute Unsplash URL for a photo id at a given width. */
export function imgUrl(id: string, width = 1200): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}

/** Responsive srcset for a photo id, capped at maxWidth. */
export function imgSrcSet(id: string, maxWidth = 1600): string {
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${imgUrl(id, w)} ${w}w`)
    .join(', ');
}

/** True for a full URL or a site path (photos uploaded by professionals), false for an Unsplash id. */
export function isPhotoUrl(id: string): boolean {
  return /^(https?:)?\/\//.test(id) || id.startsWith('/');
}

/** Photos of the curated venues, served from public/: each one has a 480 px wide copy named "<photo>-480.webp". */
const LOCAL_PHOTO = /^\/images\/lieux\/.+\.webp$/;

/** Responsive srcset of a curated venue's own photo, or undefined for any other photo. */
export function localSrcSet(id: string): string | undefined {
  return LOCAL_PHOTO.test(id) ? `${localThumb(id)} 480w, ${id} 1400w` : undefined;
}

/** 480 px wide copy of a curated venue's own photo (see localSrcSet). */
export function localThumb(id: string): string {
  return id.replace(/\.webp$/, '-480.webp');
}

/** URL of any photo: Unsplash ids are resized, uploaded photos are used as they are. */
export function photoUrl(id: string, width = 1200): string {
  return isPhotoUrl(id) ? id : imgUrl(id, width);
}
