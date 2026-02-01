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
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  transmission: string;
  engine: string;
  form: string;
  length: string; // <-- Проверь, чтобы было именно string
  width: string;
  height: string;
  tank: string;
  consumption: string;
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
  resetCampers: () => void;
  resetPage: () => void;
  nextPage: () => void;
  toggleFavorite: (id: string) => void;

  // Объединяем в один метод с правильными типами
  fetchCampers: (
    params: Record<string, string | number | boolean | undefined>,
  ) => Promise<void>;
  searchCampers: () => Promise<void>;
  getFilterParams: (
    pageNumber: number,
  ) => Record<string, string | number | boolean | undefined>;
}
