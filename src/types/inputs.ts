import { LocationType } from "./locationType";

export type Inputs = {
    location: string,
    locationType: LocationType | undefined,
    floors: number,
    area: number,
    numOfRooms: number,
    numOfBathrooms: number,
    price: number,
   }