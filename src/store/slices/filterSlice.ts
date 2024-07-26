import { StateCreator } from "zustand";
import { Filters } from "../../types/filters";
import { getLocalStorageFilters } from "../../utils/getLocalStorageFilters";

export interface FilterSlice extends Filters {
  applyFilters: (filtersObject: Filters) => void;
}

const initialFilterValues:Filters = getLocalStorageFilters();

export const createFilterSlice: StateCreator<FilterSlice> = (set) => ({
  location: initialFilterValues.location,
  floors: initialFilterValues.floors,
  bathrooms: initialFilterValues.bathrooms,
  locationType: initialFilterValues.locationType,
  price: initialFilterValues.price,
  applyFilters: (filters) =>
    set(() => ({
      location: filters.location,
      floors: filters.floors,
      bathrooms: filters.bathrooms,
      locationType: filters.locationType,
      price: filters.price
    })),
});
