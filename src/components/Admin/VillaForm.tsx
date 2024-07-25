
import { Form, Input, Button, Select, InputNumber, Modal, Upload, UploadFile, Flex} from 'antd';
import { LocationType } from '../../types/locationType';
import useCreateVillaForm from '../../hooks/useCreateVillaForm';
import useVillaEditor from '../../hooks/useEditVilla';
import { useState } from 'react';
import React from 'react';

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

export const VillaForm: React.FC = () => {
  

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>();
  // const [form] = Form.useForm();
  const [editForm]=Form.useForm()
  const [createForm] = Form.useForm();
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
    if (isEdit) {
      editVillaForm.handleCancel();
    } else {
      createVillaForm.handleCancel();
    }
  };

  const onFinish = async (values: any) => {
    if (isEdit) {
      await editVillaForm.handleModalOk();
    } else {
      await createVillaForm.onFinish(values);
    }
  };
 
  return (
    <>
    
    <Flex  justify={justifyOptions[2]} align={alignOptions[0]} >
      <Button type="primary" onClick={() => showModal(false)} style={{ margin: '  30px 35px 3px   10px  ', height:'40px' }} >
        Add New Villa
      </Button>
      
      </Flex>
      
      <Modal
        title={isEdit ? 'Edit Villa' : 'Add New Villa'}
        open={isEdit ? editVillaForm.isModalOpen : createVillaForm.isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={isEdit ? editForm : createForm} onFinish={onFinish} layout={ 'vertical' }>
       
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input the location!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location Type"
            name="locationType"
            rules={[{ required: true, message: 'Please select the location type!' }]}
          >
            <Select>
              {Object.values(LocationType).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Flex  justify={justifyOptions[3]} align={alignOptions[0]}>
          <Form.Item
            label="Floors"
            name="floors"
            rules={[{ required: true, message: 'Please input the number of floors!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: 'Please input the area!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          
          <Form.Item
            label="Number of Rooms"
            name="numOfRooms"
            rules={[{ required: true, message: 'Please input the number of rooms!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          </Flex>
          <Flex  justify={justifyOptions[3]} align={alignOptions[0]}>
          <Form.Item
            label="Bathrooms"
            name="numOfBathrooms"
            rules={[{ required: true, message: 'Please input the number of bathrooms!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
           
          >
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
            
          </Form.Item>
          </Flex>
          <Flex  justify={justifyOptions[1]} align={alignOptions[1]} >
          <Form.Item>
            <Button type="primary" htmlType="submit"  style={{width:'100px', height:'40px'}} >
              {isEdit ? 'Edit Villa' : 'Add Villa'}
            </Button>
          </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default VillaForm;

