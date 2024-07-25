import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import { updateVilla } from '../services/villasServices';
import { Villas } from '../types/types';

export const useVillaEditor = (form: FormInstance) => {
  const queryClient = useQueryClient();

  const [editingVilla, setEditingVilla] = useState<Villas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (villa: Villas) => {
    setEditingVilla(villa);
    form.setFieldsValue(villa);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingVilla) {
        await updateVilla(editingVilla.id, values);
        queryClient.invalidateQueries({ queryKey: ['villas'] });
        setIsModalOpen(false);
        setEditingVilla(null);
      }
    } catch (error) {
      console.error('Failed to update villa:', error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingVilla(null);
  };

  return {
    editingVilla,
    isModalOpen,
    showModal,
    handleEdit,
    handleModalOk,
    handleCancel,
  };
};
