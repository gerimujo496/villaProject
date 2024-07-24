
import React from 'react';
import { Form, Input, Button, Select, InputNumber, Modal, Upload } from 'antd';
import { LocationType } from '../types/types';
import useVillaForm from '../hooks/useCreateVillaForm';

const { Option } = Select;

const VillaForm: React.FC = () => {
  const { isModalOpen, form, onFinish, showModal, handleCancel} = useVillaForm();

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ margin: '30px' }}>
        Open Modal
      </Button>

      <Modal
        title="Add New Villa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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

          <Form.Item
            label="Number of Bathrooms"
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

          {/* <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Upload Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
            extra="Upload an image file for the villa"
          >
            <Upload name="image" action="/upload.do" listType="picture" maxCount={1}>
              <Button >Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Sale Status"
            name="saleStatus"
            rules={[{ required: true, message: 'Please select the sale status!' }]}
          >
            <Select>
              <Option value="forSale">For Sale</Option>
              <Option value="sold">Sold</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Add Villa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VillaForm;
