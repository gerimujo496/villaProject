export interface Villa {
    id: string,
    location: string,
    floors: number,
    bathrooms: number,
    area: number,
    image?: string,
    locationType: string,
    price: number,
    numOfRooms?: number
}