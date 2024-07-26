import { LocationType } from "./locationType";


export interface Villas{
    
        id: string,
        location: string,
        locationType: LocationType,
        floors: number,
        area: number,
        numOfRooms: number,
        numOfBathrooms: number,
        price: number,
        image: any,
        isForSale: boolean,

}