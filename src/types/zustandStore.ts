import { Villa } from "./villas";

export interface ZustandStore {
    villaWishList: Villa[];
    villaBuyList: Villa[];
    villaOpenDetails: Villa | {};
    addVillaToWishList: (villa: Villa) => void;
    removeVillaFromWishList: (id: string) => void;
    addVillaToBuyList: (villa: Villa) => void;
    removeVillaFromBuyList: (id: string) => void;
    setVillaOpenDetails: (villa: Villa) => void;
    setVillaIsBoughtToTrue: (id: string) => void;
  }