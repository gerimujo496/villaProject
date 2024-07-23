

export interface Villas{
    
        id: string,
        location: string,
        locationType: LocationType ,
        floors: number,
        area: number,
        numOfRooms: number,
        numOfBathrooms: number,
        price: number,
        image: string,
        isForSale: boolean,
    
}
export enum LocationType {
    SeaSide = 'seaSide',
    Hill = 'hill',
    RiverBank = 'riverBank',
    Alps = 'alps'
  }