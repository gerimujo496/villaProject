import { useMutation } from "@tanstack/react-query";
import { sellVila } from "../services/villasServices";

const useSellVilla = (
 
) => {
  return useMutation({
    mutationFn: sellVila,
   
    
  });
};

export default useSellVilla;
