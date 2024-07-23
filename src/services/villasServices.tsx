
import apiClient from './apiClient';
import type { Villas } from '../types/types';

interface VillasResponse {
  [key: string]: Omit<Villas, 'id'>; 
}

export const getVillas = async (): Promise<Villas[]> => {
  const { data } = await apiClient.get<VillasResponse>('/villas.json');
  
 
  return Object.entries(data).map(([id, villa]) => ({ id, ...villa }));
};



export const addVilla = async (villa: Omit<Villas, 'id'>): Promise<Villas> => {
    const { data } = await apiClient.post('/villas.json', villa);
    return { id: data.name, ...villa }; 
  };
  export const updateVilla = async (id: string, villa: Partial<Omit<Villas, 'id'>>): Promise<void> => {
    await apiClient.patch(`/villas/${id}.json`, villa);
  };
  

  export const deleteVilla = async (id: string): Promise<void> => {
    await apiClient.delete(`/villas/${id}.json`);
  };