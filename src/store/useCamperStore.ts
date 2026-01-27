import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper } from "../types/camper"; // Используем твой новый файл типов

interface CamperState {
  items: Camper[];
  favorites: string[];
  filters: Record<string, string | boolean>;
  isLoading: boolean;
  error: string | null;
  // Экшены
  setItems: (newItems: Camper[], append?: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: Record<string, string | boolean>) => void;
}

export const useCamperStore = create<CamperState>()(
  persist(
    (set) => ({
      items: [],
      favorites: [],
      filters: {},
      isLoading: false,
      error: null,

      // Заменяем массив или добавляем в конец (для пагинации)
      setItems: (newItems, append = false) =>
        set((state) => ({
          items: append ? [...state.items, ...newItems] : newItems,
          isLoading: false,
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error, isLoading: false }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      setFilters: (filters) => set({ filters }),
    }),
    {
      name: "travel-trucks-storage",
      // Сохраняем в LocalStorage только избранное, как в ТЗ
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
