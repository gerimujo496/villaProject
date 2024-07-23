import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';

import { LocationType, Villas } from '../types/types';
import { addVilla } from '../services/villas';


const { Option } = Select;

const VillaForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<Villas, 'id'>) => {
    try {
      const newVilla = await addVilla(values);
      console.log('Villa added:', newVilla);
      form.resetFields();
    } catch (error) {
      console.error('Failed to add villa:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
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
        name="rooms"
        rules={[{ required: true, message: 'Please input the number of rooms!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label="Number of Bathrooms"
        name="bathrooms"
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
        label="Image URL"
        name="image"
        rules={[{ required: true, message: 'Please input the image URL!' }]}
      >
        <Input />
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
        <Button type="primary" htmlType="submit">
          Add Villa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VillaForm;
