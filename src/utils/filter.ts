import { Filters } from "../types/filters";
import { Villa } from "../types/villa";

export function filteredVillasFn(
  villasArray: Villa[] | undefined,
  filters: Filters
) {
  if (!filters) return villasArray;

  const results = villasArray?.length ? filterVillas(villasArray, filters) : [];
  return results;
}

export const filterVillas = (villasArray: Villa[], filters: Filters) => {
  return villasArray.filter((villa: any) => {
    const matchesLocation = filters.location
      ? villa.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesFloors = filters.floors
      ? villa.floors === filters.floors
      : true;
    const matchesBathrooms = filters.bathrooms
      ? villa.bathrooms === filters.bathrooms
      : true;
    const matchesLocationType =
      filters.locationType && filters.locationType !== "all"
        ? villa.locationType === filters.locationType
        : true;
    const matchesIsForSale =
      filters.isForSale
        ? filters.isForSale === villa.isForSale 
        : true;
    const matchesPrice =
      filters.price && filters.price !== "all"
        ? (filters.price === "10000-30000" &&
            villa.price >= 10000 &&
            villa.price <= 30000) ||
          (filters.price === "30000-90000" &&
            villa.price >= 30000 &&
            villa.price <= 90000) ||
          (filters.price === "90000-150000" &&
            villa.price >= 90000 &&
            villa.price <= 150000) ||
          (filters.price === "150000+" && villa.price >= 150000)
        : true;

    return (
      matchesLocation &&
      matchesFloors &&
      matchesBathrooms &&
      matchesLocationType &&
      matchesIsForSale&&
      matchesPrice
    );
  });
};
