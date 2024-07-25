
import { useState } from "react";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVilla } from "../services/villasServices";
import { Villas } from "../types/types";
import { uploadImageToFirebase } from "../services/imageUpload";

export const useCreateVillaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

   const mutation = useMutation({
    mutationFn: addVilla,
    onSuccess: () => {
      form.resetFields();
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['villas'] }); 
    },
    onError: (error: Error) => {
      console.error("Failed to add villa:", error);
    },
  });

  const onFinish = async (
    values: Omit<Villas, "id"> & { imageFile?: File }
  ) => {

    console.log(values);
    
    if (values.image.file) {
      values.image = await uploadImageToFirebase(values.image.file);
    }
    await mutation.mutateAsync(values);
  };

   const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    form,
    onFinish,
    showModal,
    handleCancel,
    mutation,
  };
};

export default useCreateVillaForm;

