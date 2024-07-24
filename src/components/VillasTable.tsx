
// import React from 'react';

// import { Table, Tag, Input, Space, Button, Modal, Form, InputNumber, Select, Upload } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { Villas, LocationType } from '../types/types';
// import { useVillas } from '../hooks/useVillaTable';

// const { Option } = Select;

// const VillasTable: React.FC = () => {
//   const [form] = Form.useForm();
//   const {
//     data,
//     error,
//     isLoading,
//     getColumnSearchProps,
//     handleEdit,
//     handleDelete,
//     handleModalOk,
//     handleModalCancel,
//     isModalOpen,
//   } = useVillas(form);

//   const columns: ColumnsType<Villas> = [
//     {
//       title: 'Location',
//       dataIndex: 'location',
//       key: 'location',
//       ...getColumnSearchProps('location'),
//       sorter: (a, b) => (a.location || '').localeCompare(b.location || ''),
//     },
//     {
//       title: 'Location Type',
//       dataIndex: 'locationType',
//       key: 'locationType',
//       sorter: (a, b) => (a.locationType || '').localeCompare(b.locationType || ''),
//     },
//     {
//       title: 'Floors',
//       dataIndex: 'floors',
//       key: 'floors',
//       sorter: (a, b) => (a.floors || 0) - (b.floors || 0),
//     },
//     {
//       title: 'Area (sq ft)',
//       dataIndex: 'area',
//       key: 'area',
//       sorter: (a, b) => (a.area || 0) - (b.area || 0),
//     },
//     {
//       title: 'Rooms',
//       dataIndex: 'numOfRooms',
//       key: 'numOfRooms',
//       sorter: (a, b) => (a.numOfRooms || 0) - (b.numOfRooms || 0),
//     },
//     {
//       title: 'Bathrooms',
//       dataIndex: 'numOfBathrooms',
//       key: 'numOfBathrooms',
//       sorter: (a, b) => (a.numOfBathrooms || 0) - (b.numOfBathrooms || 0),
//     },
//     {
//       title: 'Price (million)',
//       dataIndex: 'price',
//       key: 'price',
//       sorter: (a, b) => (a.price || 0) - (b.price || 0),
//     },
//     {
//       title: 'For Sale',
//       dataIndex: 'isForSale',
//       key: 'isForSale',
//       render: (isForSale) => <Tag color={isForSale ? 'green' : 'red'}>{isForSale ? 'Yes' : 'No'}</Tag>,
//       sorter: (a, b) => (a.isForSale ? 1 : 0) - (b.isForSale ? 1 : 0),
//     },
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       key: 'image',
//       render: (image) => <img src={image} alt="Villa" style={{ width: 100 }} />
//     },
    
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button onClick={() => handleEdit(record)}>Edit</Button>
//           <Button onClick={() => handleDelete(record.id)} danger>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading villas</p>;

//   return (
//     <>
//       <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 10 }} />
//       <Modal
//         title="Edit Villa"
//         open={isModalOpen}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="Location"
//             name="location"
//             rules={[{ required: true, message: 'Please input the location!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Location Type"
//             name="locationType"
//             rules={[{ required: true, message: 'Please select the location type!' }]}
//           >
//             <Select>
//               {Object.values(LocationType).map((type) => (
//                 <Option key={type} value={type}>
//                   {type}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Floors"
//             name="floors"
//             rules={[{ required: true, message: 'Please input the number of floors!' }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Area"
//             name="area"
//             rules={[{ required: true, message: 'Please input the area!' }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Number of Rooms"
//             name="numOfRooms"
//             rules={[{ required: true, message: 'Please input the number of rooms!' }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Number of Bathrooms"
//             name="numOfBathrooms"
//             rules={[{ required: true, message: 'Please input the number of bathrooms!' }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: 'Please input the price!' }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Upload Image"
//             name="image"
//             extra="Upload an image file for the villa"
//           >
//             <Upload name="image"  listType="picture" maxCount={1}>
//               <Button >Click to Upload</Button>
//             </Upload>
//           </Form.Item>
          
         
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default VillasTable;


import React from 'react';

import { Table, Tag, Input, Space, Button, Modal, Form, InputNumber, Select, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Villas, LocationType } from '../types/types';
import { useVillas } from '../hooks/useVillaTable';

const { Option } = Select;

const VillasTable: React.FC = () => {
  const [form] = Form.useForm();
  const {
    data,
    error,
    isLoading,
    getColumnSearchProps,
    handleEdit,
    handleDelete,
    handleModalOk,
    handleModalCancel,
    isModalOpen,
  } = useVillas(form);

  const columns: ColumnsType<Villas> = [
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ...getColumnSearchProps('location'),
      sorter: (a, b) => (a.location || '').localeCompare(b.location || ''),
    },
    {
      title: 'Location Type',
      dataIndex: 'locationType',
      key: 'locationType',
      sorter: (a, b) => (a.locationType || '').localeCompare(b.locationType || ''),
    },
    {
      title: 'Floors',
      dataIndex: 'floors',
      key: 'floors',
      sorter: (a, b) => (a.floors || 0) - (b.floors || 0),
    },
    {
      title: 'Area (sq ft)',
      dataIndex: 'area',
      key: 'area',
      sorter: (a, b) => (a.area || 0) - (b.area || 0),
    },
    {
      title: 'Rooms',
      dataIndex: 'numOfRooms',
      key: 'numOfRooms',
      sorter: (a, b) => (a.numOfRooms || 0) - (b.numOfRooms || 0),
    },
    {
      title: 'Bathrooms',
      dataIndex: 'numOfBathrooms',
      key: 'numOfBathrooms',
      sorter: (a, b) => (a.numOfBathrooms || 0) - (b.numOfBathrooms || 0),
    },
    {
      title: 'Price (million)',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: 'For Sale',
      dataIndex: 'isForSale',
      key: 'isForSale',
      render: (isForSale) => <Tag color={isForSale ? 'green' : 'red'}>{isForSale ? 'Yes' : 'No'}</Tag>,
      sorter: (a, b) => (a.isForSale ? 1 : 0) - (b.isForSale ? 1 : 0),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Villa" style={{ width: 100 }} />
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading villas</p>;

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal
        title="Edit Villa"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
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

          <Form.Item
            label="Upload Image"
            name="image"
            extra="Upload an image file for the villa"
          >
            <Upload name="image"  listType="picture" maxCount={1}>
              <Button >Click to Upload</Button>
            </Upload>
          </Form.Item>
          
         
        </Form>
      </Modal>
    </>
  );
};

export default VillasTable;





