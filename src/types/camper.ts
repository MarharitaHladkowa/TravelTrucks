export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface GalleryItem {
  thumb: string;
  original: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  form: "panelTruck" | "fullyIntegrated" | "alcove";
  transmission: string;
  engine: string;

  AC: boolean;
  kitchen: boolean;
  TV: boolean;
  bathroom: boolean;

  gallery: Array<string | GalleryItem>;
  reviews: Review[];
}

export interface FilterState {
  location: string;
  equipment: string[];
  vehicleType: string;

  campers: Camper[];
  isLoading: boolean;

  page: number;
  hasMore: boolean;

  favorites: string[];

  setLocation: (city: string) => void;
  toggleEquipment: (item: string) => void;
  setVehicleType: (type: string) => void;
  resetFilters: () => void;

  nextPage: () => void;
  resetPage: () => void;
  resetCampers: () => void;

  toggleFavorite: (id: string) => void;

  fetchCampers: (
    params: Record<string, string | number | boolean | undefined>,
  ) => Promise<void>;
}
