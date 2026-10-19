export interface GeocodingLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface UnsplashPhoto {
  urls: {
    raw: string;
  };
}

export interface UnsplashSearchResponse {
  results?: UnsplashPhoto[];
}
