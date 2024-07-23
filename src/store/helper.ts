
import { Villa } from "../types/villas";
import { ZustandStore } from "./store";

export const addVillaToWishList = (set: any) => (villa: Villa) => {
  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList, villa],
  }));
};
// export const removeVillaFromWishList = (set:any)=>(villa:Villas)=>{
//    set((store:ZustandStore)=>({villaWishList:[...(store.villaWishList.filter(([string,item]:Villa)=>))]}))
// }
export const removeVillaFromWishList = (set: any) => (id: string) => {
  set((store: ZustandStore) => ({
    villaWishList:[...(store.villaWishList.filter((item)=>item.id!=id))]
  }));
};
