import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVilla } from "../services/villasServices";
import { Villas } from "../types/types";
import { UseFormReset } from "react-hook-form";

export const useEditVilla = (
  idOfVillaBeingEdited: string | undefined,
  reset: UseFormReset<Villas>,
  closeModal: VoidFunction
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: Villas) => {
      if (idOfVillaBeingEdited) {
        await updateVilla(idOfVillaBeingEdited, values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villas"] });
      closeModal();
      reset();
    },
    onError: (error: Error) => {
      console.error("Failed to update villa:", error);
    },
  });

  return {
    mutation,
  };
};

export default useEditVilla;

