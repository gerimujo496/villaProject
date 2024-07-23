import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Modal, Flex } from "antd";

import { LocationType, Villas } from "../types/types";
import { addVilla } from "../services/villasServices";

const { Option } = Select;

const VillaForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<Villas, "id">) => {
    try {
      const newVilla = await addVilla(values);
      console.log("Villa added:", newVilla);
      form.resetFields();
    } catch (error) {
      console.error("Failed to add villa:", error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ margin: "30px" }}>
        Open Modal
      </Button>

      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location Type"
            name="locationType"
            rules={[
              { required: true, message: "Please select the location type!" },
            ]}
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
            rules={[
              { required: true, message: "Please input the number of floors!" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "Please input the area!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Number of Rooms"
            name="rooms"
            rules={[
              { required: true, message: "Please input the number of rooms!" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Number of Bathrooms"
            name="bathrooms"
            rules={[
              {
                required: true,
                message: "Please input the number of bathrooms!",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sale Status"
            name="saleStatus"
            rules={[
              { required: true, message: "Please select the sale status!" },
            ]}
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
      </Modal>
    </>
  );
};

export default VillaForm;
// VillasForm.tsx
// VillasForm.tsx
// import React from 'react';
// import { useMutation, UseMutationResult } from '@tanstack/react-query';
// import { Form, Input, Button, Select, InputNumber, Checkbox } from 'antd';
// import { addVilla } from '../services/villas';
// import { Villas, LocationType } from '../types/types';
// import { useVillaStore } from '../store/useVillaStore';

// const { Option } = Select;

// const VillasForm: React.FC = () => {
//   const { closeModal } = useVillaStore();
//   const [form] = Form.useForm();

//   const mutation: UseMutationResult<Villas, Error, Omit<Villas, 'id'>> = useMutation(addVilla, {
//     onSuccess: () => {
//       closeModal();
//       form.resetFields();
//     },
//     onError: (error: Error) => {
//       console.error('Error adding villa:', error);
//     },
//   });

//   const onFinish = async (values: any) => {
//     const villa: Omit<Villas, 'id'> = {
//       location: values.location,
//       locationType: values.locationType,
//       floors: values.floors,
//       area: values.area,
//       numOfRooms: values.numOfRooms,
//       numOfBathrooms: values.numOfBathrooms,
//       price: values.price,
//       image: values.image,
//       isForSale: values.isForSale,
//     };
//     await mutation.mutateAsync(villa);
//   };

//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical">
//       <Form.Item
//         name="location"
//         label="Location"
//         rules={[{ required: true, message: 'Please input the location!' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="locationType"
//         label="Location Type"
//         rules={[{ required: true, message: 'Please select the location type!' }]}
//       >
//         <Select>
//           <Option value={LocationType.SeaSide}>Sea Side</Option>
//           <Option value={LocationType.Hill}>Hill</Option>
//           <Option value={LocationType.RiverBank}>River Bank</Option>
//           <Option value={LocationType.Alps}>Alps</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="floors"
//         label="Floors"
//         rules={[{ required: true, message: 'Please input the number of floors!' }]}
//       >
//         <InputNumber min={1} />
//       </Form.Item>

//       <Form.Item
//         name="area"
//         label="Area"
//         rules={[{ required: true, message: 'Please input the area!' }]}
//       >
//         <InputNumber min={1} />
//       </Form.Item>

//       <Form.Item
//         name="numOfRooms"
//         label="Number of Rooms"
//         rules={[{ required: true, message: 'Please input the number of rooms!' }]}
//       >
//         <InputNumber min={1} />
//       </Form.Item>

//       <Form.Item
//         name="numOfBathrooms"
//         label="Number of Bathrooms"
//         rules={[{ required: true, message: 'Please input the number of bathrooms!' }]}
//       >
//         <InputNumber min={1} />
//       </Form.Item>

//       <Form.Item
//         name="price"
//         label="Price"
//         rules={[{ required: true, message: 'Please input the price!' }]}
//       >
//         <InputNumber min={1} />
//       </Form.Item>

//       <Form.Item
//         name="image"
//         label="Image URL"
//         rules={[{ required: true, message: 'Please input the image URL!' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item name="isForSale" valuePropName="checked">
//         <Checkbox>For Sale</Checkbox>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
//           Add Villa
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default VillasForm;
