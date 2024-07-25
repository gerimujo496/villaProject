import { useEffect, useState } from "react";
import { filterVillas } from "../utils/filter";
// import { Villas } from "../types/types";

export const useVillaFilter = (initialVillas: any[] | undefined) => {
  const [filteredVillas, setFilteredVillas] = useState<any[] | undefined>(
    initialVillas
  );

  const displayFiltersResult = (filters: any) => {
    console.log(JSON.stringify(initialVillas), "INITIAL");
    if (!initialVillas) {
      return;
    }
    setFilteredVillas(results);
  };
  const filters = localStorage.getItem("filters");
  const results =
    initialVillas?.length && filters
      ? filterVillas(initialVillas, JSON.parse(filters))
      : [];

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

  return { displayFiltersResult, filteredVillas, results };
};
