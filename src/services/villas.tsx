
import apiClient from './apiClient';
import type { Villas } from '../types/types';

interface VillasResponse {
  [key: string]: Omit<Villas, 'id'>; 
}

export const getVillas = async (): Promise<Villas[]> => {
  const { data } = await apiClient.get<VillasResponse>('/villas.json');
  
 
  return Object.entries(data).map(([id, villa]) => ({ id, ...villa }));
};

// export const addVilla = async () :Promise<Villas>=> {
//     const { data } = await apiClient.post('/villas.json');
//     return data;
//   };
export const addVilla = async (villa: Omit<Villas, 'id'>): Promise<Villas> => {
    const { data } = await apiClient.post('/villas.json', villa);
    return { id: data.name, ...villa }; 
  };
  
//   export const updateVilla = async (villa: Villas): Promise<Villas> => {
//     const { id, ...villaData } = villa;
//     const { data } = await apiClient.put(`/villas/${id}.json`, villaData);
//     return { id, ...villaData,  };
//   };
  
//   export const deleteVilla = async (id: string) => {
//     await apiClient.delete(`/villas/${id}.json`);
//   };