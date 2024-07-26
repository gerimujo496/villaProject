import apiClient from "./apiClient";
import type { Villa } from "../types/villa";

import { uploadImageToFirebase } from "./imageUpload";

interface VillasResponse {
  [key: string]: Omit<Villa, "id">;
}

export const getVillas = async (): Promise<Villa[]> => {
  const { data } = await apiClient.get<VillasResponse>("/villas.json");

  return Object.entries(data).map(([id, villa]) => ({ id, ...villa }));
};

export const getSingleVilla = async (
  villaId: string | undefined
): Promise<Villa> => {
  const { data } = await apiClient.get(`/villas/${villaId}.json`);
  return data;
};

export const sellVila = async (documentName: string) => {
  apiClient.patch(`/villas/${documentName}.json`, { isForSale: false });
};

export const updateVilla = async (
  id: string,
  villa: Partial<Omit<Villa, "id">>
): Promise<void> => {
  await apiClient.patch(`/villas/${id}.json`, villa);
};

export const addVilla = async (
  villa: Omit<Villa, "id"> & { imageFile?: any }
): Promise<Villa> => {
  let imageUrl = villa.image;

  if (villa.imageFile) {
    imageUrl = await uploadImageToFirebase(villa.imageFile.originFileObj);
  }

  const { data } = await apiClient.post("/villas.json", {
    ...villa,
    image: imageUrl,
  });
  return { id: data.name, ...villa, image: imageUrl };
};

export const deleteVilla = async (id: string): Promise<void> => {
  await apiClient.delete(`/villas/${id}.json`);
};
