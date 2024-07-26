import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVilla } from "../services/villasServices";
import { Villa } from "../types/villa";
import { UseFormReset } from "react-hook-form";

export const useCreateVillaForm = (
  reset: UseFormReset<Villa>,
  closeModal: VoidFunction,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addVilla,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villas"] });
      closeModal();
      reset();
    },
    onError: (error: Error) => {
      console.error("Failed to add villa:", error);
    },
  });

  return {
    mutation,
  };
};

export default useCreateVillaForm;

