import { StateCreator } from "zustand";
import { Filters } from "../../types/filters";

export interface FilterSlice extends Filters {
  applyFilters: (filtersObject: Filters) => void;
}

export const createFilterSlice: StateCreator<FilterSlice> = (set) => ({
  location: "",
  floors: undefined,
  bathrooms: undefined,
  locationType: "",
  price: "" || undefined,
  applyFilters: (filters) =>
    set(() => ({
      location: filters.location,
      floors: filters.floors,
      bathrooms: filters.bathrooms,
      locationType: filters.locationType,
      price: filters.price
    })),
});
