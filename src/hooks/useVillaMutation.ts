import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Villas } from "../types/types";

export const useCreateMutation = () => {
  const mutation = useMutation({
    mutationFn: async (villa: Villas) => {
      const response = await axios.post('/api/villas', villa);
      return response.data;
    },
    onError: (error: Error) => {
      console.error('Error creating villa:', error);
    }
  });

  const imageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/api/upload', formData);
    return response.data.imageUrl;
  };

  return { mutate: mutation.mutate, imageUpload, mutation };
};

export const useEditMutation = () => {
  const mutation = useMutation({
    mutationFn: async (villa: Villas) => {
      const response = await axios.put(`/api/villas/${villa.id}`, villa);
      return response.data;
    },
    onError: (error: Error) => {
      console.error('Error updating villa:', error);
    }
  });

  return { mutate: mutation.mutate, mutation };
};
