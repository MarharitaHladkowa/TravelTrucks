import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { Camper, FilterState } from "../types/camper";

const LIMIT = 4;

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

      setLocation: (city) => set({ location: city }),

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

      fetchCampers: async (params) => {
        const { page, campers } = get();
        set({ isLoading: true });

        try {
          const res = await axios.get(
            "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
            { params },
          );

          const newItems: Camper[] = Array.isArray(res.data)
            ? res.data
            : res.data?.items || [];

          set({
            campers: page === 1 ? newItems : [...campers, ...newItems],
            hasMore: newItems.length === LIMIT,
            isLoading: false,
          });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "filter-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        location: state.location,
      }),
    },
  ),
);
