import { LocationType } from "./locationType";

export interface Villa {
  id: string;
  area: number;
  floors: number;
  image: string;
  isForSale: boolean;
  location: string;
  locationType: LocationType;
  numOfBathrooms: number;
  numOfRooms: number;
  price: number;
}
