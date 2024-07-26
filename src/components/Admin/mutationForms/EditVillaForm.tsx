import React from 'react'
import VillaForm from '../VillaForm'
import { Villa } from '../../../types/villa';


interface EditVillaFormProps {
  villa: Villa
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