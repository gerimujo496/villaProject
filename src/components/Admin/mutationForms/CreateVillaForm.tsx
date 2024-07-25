import React from 'react'
import VillaForm from '../VillaForm'

interface CreateVillaFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVilla: any;
}
const CreateVillaForm: React.FC<CreateVillaFormProps> = (props) => {
  return (
    <VillaForm {...props} />
  )
}

export default CreateVillaForm