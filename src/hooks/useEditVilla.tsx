

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import { updateVilla } from '../services/villasServices';
import { Villas } from '../types/types';

export const useVillaEditor = (form: FormInstance) => {
  const queryClient = useQueryClient();
  const [editingVilla, setEditingVilla] = useState<Villas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  console.log('Edit Form instance:', form);
  const mutation = useMutation({
    mutationFn: async (values: Villas) => {
      if (editingVilla) {
        await updateVilla(editingVilla.id, values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villas'] });
      setIsModalOpen(false);
      setEditingVilla(null);
      form.resetFields();
    },
    onError: (error: Error) => {
      console.error('Failed to update villa:', error);
    },
  });

  const handleEdit = (villa: Villas) => {
    setIsModalOpen(true);
    setEditingVilla(villa);
    form.setFieldsValue(villa);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error('Failed to update villa:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingVilla(null);
    form.resetFields();
  };

  return {
    editingVilla,
    isModalOpen,
    showModal: () => setIsModalOpen(true),
    handleEdit,
    handleModalOk,
    handleCancel,
  };
};

export default useVillaEditor;
