export interface Venue {
  id: string;
  nom_du_lieu: string;
  commune_et_zone: string;
  site_web_officiel: string;
  description: string;
  capacite_accueil: string;
  hebergement_sur_place: string;
  type_de_cadre: string;
  fourchette_de_prix: string;
  element_differenciant: string;
  contact: string;
  sources: string;
  imageUrl?: string;
  
  // Extended structured fields for filtering and details
  maxGuests: number;
  hasAccommodation: boolean;
  budgetCategory: '€' | '€€' | '€€€';
  detailedDescription: string;
  amenities: string[];
  galleryUrls: string[];
}
