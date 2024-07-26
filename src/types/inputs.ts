import { LocationType } from "./locationType";

export type Inputs = {
    location: string,
    locationType: LocationType | undefined,
    floors: number,
    area: number,
    rooms: number,
    bathrooms: number,
    price: number,
   }