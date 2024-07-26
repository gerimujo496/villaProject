import React from 'react'
import VillaForm from '../VillaForm'
import { Villas } from '../../../types/types';

interface EditVillaFormProps {
  villa: Villas
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVilla: any;
}
const EditVillaForm: React.FC<EditVillaFormProps> = (props) => {
  return (
    <VillaForm {...props} />
  )
}

export default EditVillaForm