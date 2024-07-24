import { Filters } from "../types/filters";
import { Villa } from "../types/villas";

export const filterVillas = (villasArray: Villa[], filters: Filters) => {
  return villasArray.filter((villa: any) => {
    const matchesLocation = filters.location
      ? villa.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesFloors = filters.floors
      ? villa.floors === filters.floors
      : true;
    const matchesBathrooms = filters.bathrooms
      ? villa.bathrooms === filters.bathrooms
      : true;
    const matchesLocationType = filters.locationType
      ? villa.locationType === filters.locationType
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
      matchesPrice
    );
  });
};
