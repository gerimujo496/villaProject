import { Filters } from "../types/filters";

export const getLocalStorageFilters = () => {
  let parsedFilters = {};
  const filters = localStorage.getItem("filters");
  if (filters) {
    parsedFilters = JSON.parse(filters) as Filters;
    return parsedFilters;
  }
  return {};
};
