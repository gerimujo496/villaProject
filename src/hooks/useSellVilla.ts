import { useMutation } from "@tanstack/react-query";
import { sellVila } from "../services/villasServices";
import { OpenNotification } from "../types/openNotification";
import { NotificationPlacement } from "antd/es/notification/interface";

const useSellVilla = (
 
) => {
  return useMutation({
    mutationFn: sellVila,
   
    
  });
};

export default useSellVilla;
