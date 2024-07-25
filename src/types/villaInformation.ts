import { LocationType } from "./locationType";

export interface VillaInformation {
    area: number;
    floors: number;
    image: string;
    isForSale: boolean;
    location: string;
    locationType: LocationType;
    bathrooms: number;
    rooms: number;
    price: number;
  }
  