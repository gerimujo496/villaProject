import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { Villas } from "../../types/types";
import { Villa } from "../../types/villa";
import { NotificationPlacement } from "antd/es/notification/interface";
import { BuyAllVillas } from "../../types/buyAllVillas";

export const totalVillasPriceCalculator = (villas: Villa[]) => {
  return villas.reduce((sum, item) => sum + item.price, 0);
};
export const buyAllVillas = (
  {data, sellVilla, removeVillaFromBuyList, openNotification}:BuyAllVillas
) => {
  data.map((item) =>
    sellVilla.mutate(item.id, {
      onSuccess: () => {
        removeVillaFromBuyList(item.id);
        openNotification("Success", "The villa is bought", "topLeft");
      },
      onError: () => {
        openNotification("Error", "An error occurred", "topLeft");
      },
    })
  );
  return;
};
