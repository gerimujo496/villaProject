import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVilla } from "../services/villasServices";
import { Villa } from "../types/villa";
import { UseFormReset } from "react-hook-form";

export const useEditVilla = (
  idOfVillaBeingEdited: string | undefined,
  reset: UseFormReset<Villa>,
  closeModal: VoidFunction
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: Villa) => {
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

