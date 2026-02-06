import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { Camper, FilterState } from "../types/camper";

const LIMIT = 4;
const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

type FilterParams = Record<string, string | number | boolean | undefined>;

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      location: "",
      equipment: [],
      vehicleType: "",
      campers: [],
      isLoading: false,
      page: 1,
      hasMore: true,
      favorites: [],

      setLocation: (city) => set({ location: city.trim() }),

      toggleEquipment: (item) =>
        set((state) => ({
          equipment: state.equipment.includes(item)
            ? state.equipment.filter((i) => i !== item)
            : [...state.equipment, item],
        })),

      setVehicleType: (type) => set({ vehicleType: type }),

      resetFilters: () =>
        set({
          location: "",
          equipment: [],
          vehicleType: "",
        }),

      resetCampers: () =>
        set({
          campers: [],
          page: 1,
          hasMore: true,
        }),

      resetPage: () => set({ page: 1 }),

      nextPage: () =>
        set((state) => ({
          page: state.page + 1,
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),

      getFilterParams: (pageNumber: number): FilterParams => {
        const { location, equipment, vehicleType } = get();

        const trimmedLocation = location ? location.trim() : "";

        const params: FilterParams = {
          page: pageNumber,
          limit: LIMIT,
          location: trimmedLocation || undefined,
          form: vehicleType || undefined,
        };
        if (equipment.includes("AC")) params.AC = true;
        if (equipment.includes("kitchen")) params.kitchen = true;
        if (equipment.includes("TV")) params.TV = true;
        if (equipment.includes("bathroom")) params.bathroom = true;
        if (equipment.includes("automatic")) params.transmission = "automatic";

        return params;
      },

      searchCampers: async () => {
        set({ campers: [], page: 1, hasMore: true });

        const params = get().getFilterParams(1);
        await get().fetchCampers(params);
      },

      fetchCampers: async (params) => {
        set({ isLoading: true });

        try {
          const res = await axios.get(BASE_URL, { params });

          const newItems: Camper[] = Array.isArray(res.data)
            ? res.data
            : res.data?.items || [];

          set((state) => ({
            campers:
              params.page === 1 ? newItems : [...state.campers, ...newItems],
            hasMore: newItems.length === LIMIT,
            isLoading: false,
          }));
        } catch {
          set({
            campers: get().page === 1 ? [] : get().campers,
            hasMore: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "filter-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        location: state.location,
        campers: state.campers,
        page: state.page,
        hasMore: state.hasMore,
        equipment: state.equipment,
        vehicleType: state.vehicleType,
      }),
    },
  ),
);
