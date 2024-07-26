import { useQuery } from '@tanstack/react-query';
import { getSingleVilla } from "../services/villasServices"


export const useVillaDetail = (villaId:string | undefined) => {
    return useQuery({
        queryKey: ['villa', villaId],
        queryFn: () => getSingleVilla(villaId),
        enabled: !!villaId,
    })
}