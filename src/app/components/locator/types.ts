export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string; // "displayName.text"
  formattedAddress: string; // "formattedAddress"
  location: Location;
  isOpenNow?: boolean; // "regularOpeningHours.openNow"
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  googleMapsUri?: string;
}

export interface SearchState {
  places: Place[];
  userLocation: Location | null;
  loading: boolean;
  error: string | null;
}
