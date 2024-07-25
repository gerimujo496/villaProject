import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { Villas } from "../../types/types";
import { Villa } from "../../types/villa";
import { NotificationPlacement } from "antd/es/notification/interface";
import { BuyAllVillas } from "../../types/buyAllVillas";

export const totalVillasPriceCalculator = (villas: Villa[]) => {
  return villas.reduce((sum, item) => sum + item.price, 0);
};
export const useMutationToBuyAllVillas = async ({
  data,
  sellVilla,
 
}: BuyAllVillas) => {
  return new Promise<string>((resolve, reject) => {
    data.map((item) =>
      sellVilla.mutate(item.id, {
        onSuccess: () => {
          resolve("OK");
        },
        onError: () => {
          reject("Error");
        
        },
      })
    );
  });
};

export const buyAllVillas = async ({
  data,
  sellVilla,
  removeVillaFromBuyList,
  openNotification,
}: BuyAllVillas) => {
  const response = await useMutationToBuyAllVillas({
    data: data,
    sellVilla,
    openNotification,
    removeVillaFromBuyList,
  });

  if (response == "OK") {
    openNotification("Success", `The villas are bought`, "topLeft");
    data.map((item) => removeVillaFromBuyList(item.id));
    return;
  } else {
    openNotification("Error", "An error occurred", "topLeft");
  }
};
