export const filterVillas = (villasArray: any, filters: any) => {
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
        ? villa.price <= filters.price
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
