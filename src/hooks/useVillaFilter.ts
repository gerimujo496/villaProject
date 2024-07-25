import { useEffect, useState } from "react";
import { filterVillas } from "../utils/filter";
// import { Villas } from "../types/types";

export const useVillaFilter = (initialVillas: any[]) => {
  const [filteredVillas, setFilteredVillas] = useState<any[]>(initialVillas);

  const displayFiltersResult = (filters: any) => {
    const results = filterVillas(initialVillas, filters);
    setFilteredVillas(results);
  };


  useEffect(() => {
    const filters = localStorage.getItem("filters");
    if (filters) {
      const parsedFilters = JSON.parse(filters);
      if (Object.keys(parsedFilters).length === 0) {
        return;
      }
      displayFiltersResult(parsedFilters);
    }
  }, []);

  return { displayFiltersResult, filteredVillas };
};
