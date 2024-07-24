import { useState } from 'react';
import { Form } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { addVilla } from '../services/villasServices';
import { Villas } from '../types/types';

const useVillaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: addVilla,
    onSuccess: () => {
      form.resetFields();
      setIsModalOpen(false);
    },
    onError: (error: Error) => {
      console.error('Failed to add villa:', error);
    },
  });

  const onFinish = async (values: Omit<Villas, 'id'>) => {
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

export default useVillaForm;
