import apiClient from "./apiClient";

export const sellVila = async (documentName: string) => {
  apiClient.patch(`/villas/${documentName}.json`, { isForSale: false });
};
