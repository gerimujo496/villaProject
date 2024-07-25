
import { Form, Input, Button, Select, InputNumber, Modal, Upload, UploadFile, Flex } from 'antd';
import { LocationType } from '../../types/locationType';
import useCreateVillaForm from '../../hooks/useCreateVillaForm';
import useVillaEditor from '../../hooks/useEditVilla';
import { useState } from 'react';
import React from 'react';
import { Villa } from '../../types/villas';
import { Villas } from '../../types/types';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const { Option } = Select;
const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignOptions = ['flex-start', 'center', 'flex-end'];

interface VillaFormProps {
  villa?: Villas | null;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVilla: any;
}

type Inputs = {
  location: string
  area: number
}

export const VillaForm: React.FC<VillaFormProps> = ({ villa, isModalOpen, setIsModalOpen, setSelectedVilla }) => {


  //const {createMutation, updateMutation, uploadImage} = useVillaMutations();

  //add other default values
  const defaultValues = {
    location: villa?.location || "",
    area: villa?.area || 0
  };


  //create a hook: 2 useMutations: Edit Villa, Create Villa

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    if (isEditing) {
      //call mutate edit, data:


      return;
    }

    //upload image  await uploadImage

    //change data => data.imageUrl = url + key;

    //mutate Create

  }

  const isEditing = !!villa;

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>();
  // const [form] = Form.useForm();
  const [editForm] = Form.useForm()
  const createVillaForm = useCreateVillaForm();
  const editVillaForm = useVillaEditor(editForm);
  const [isEdit, setIsEdit] = useState(false);


  const showModal = (edit = false, villa?: any) => {
    setIsEdit(edit);
    if (edit) {
      editVillaForm.handleEdit(villa);
    } else {
      createVillaForm.showModal();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedVilla(null)

    }, 1000)
  };

  const onFinish = async (values: any) => {

    console.log(values);
    setSelectedVilla(null);

    // if (isEdit) {
    //   await editVillaForm.handleModalOk();
    // } else {
    //   await createVillaForm.onFinish(values);
    // }
  };

  const { handleSubmit, control, formState: { errors } } = useForm<Inputs>({
    defaultValues,
  });

  return (
    <>
      <Modal
        title={isEditing ? 'Edit Villa' : 'Add New Villa'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="location"
            validateStatus={errors.location ? 'error' : ''}
            help={errors.location ? errors.location.message : null}
          >
            <Controller
              name="location"
              control={control}
              rules={{ required: 'location is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="area"
            validateStatus={errors.area ? 'error' : ''}
            help={errors.area ? errors.area.message : null}
          >
            <Controller
              name="area"
              control={control}
              rules={{
                required: 'Email is required',

              }}
              render={({ field }) => <Input type='number' {...field} />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Upload
          name="image"
          maxCount={1}
          listType="picture"
          fileList={uploadFileList}
          customRequest={({ onSuccess }) => onSuccess?.(null)}
          onChange={({ fileList }) => setUploadFileList(fileList)}
        >
          <Button>Click to Upload</Button>
        </Upload>


        <Flex justify={justifyOptions[1]} align={alignOptions[1]} >

          <Button type="primary" htmlType="submit" style={{ width: '100px', height: '40px' }} >
            {isEditing ? 'Edit Villa' : 'Add Villa'}
          </Button>

        </Flex>

      </Modal >
    </>
  );
};

export default VillaForm;

