
// import React, { useState } from 'react';
// import { useQuery,  useQueryClient } from '@tanstack/react-query';
// import { Table, Tag, Input, Space, Button, Modal, Form, InputNumber, Select } from 'antd';
// import type { ColumnsType, ColumnType } from 'antd/es/table';
// import { Villas, LocationType } from '../types/types';
// import { deleteVilla, getVillas, updateVilla } from '../services/villasServices';
// import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

// const { Option } = Select;

// const VillasTable: React.FC = () => {
//   const queryClient = useQueryClient();
//   const { data, error, isLoading } = useQuery<Villas[]>({
//     queryKey: ['villas'],
//     queryFn: getVillas,
//   });

//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState<string>('');
//   const [editingVilla, setEditingVilla] = useState<Villas | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters?: () => void) => {
//     if (clearFilters) clearFilters();
//     setSearchText('');
//   };

//   const getColumnSearchProps = (dataIndex: keyof Villas): ColumnType<Villas> => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={searchText as any}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
//         : false,
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const handleEdit = (villa: Villas) => {
//     setEditingVilla(villa);
//     form.setFieldsValue(villa);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this villa?',
//       onOk: async () => {
//         try {
//           await deleteVilla(id);
//           queryClient.invalidateQueries({ queryKey: ['villas'] });
//         } catch (error) {
//           console.error('Failed to delete villa:', error);
//         }
//       },
//     });
//   };

//   const handleModalOk = async () => {
//     try {
//       const values = await form.validateFields();
//       if (editingVilla) {
//         await updateVilla(editingVilla.id, values);
//         queryClient.invalidateQueries({ queryKey: ['villas'] });
//         setIsModalOpen(false);
//         setEditingVilla(null);
//       }
//     } catch (error) {
//       console.error('Failed to update villa:', error);
//     }
//   };

//   const handleModalCancel = () => {
//     setIsModalOpen(false);
//     setEditingVilla(null);
//   };

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
//       render: (image) => <img src={image} alt="Villa" style={{ width: 100 }} />,
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
//       <Table
//         columns={columns}
//         dataSource={data}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
      
//       />
//       <Modal
//         title="Edit Villa"
//         visible={isModalOpen}
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
//             label="Image URL"
//             name="image"
//             rules={[{ required: true, message: 'Please input the image URL!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Sale Status"
//             name="isForSale"
//             rules={[{ required: true, message: 'Please select the sale status!' }]}
//           >
//             <Select>
//               <Option value={true}>For Sale</Option>
//               <Option value={false}>Sold</Option>
//             </Select>
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
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    //   render: (image) => <img src={ "https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o/"+ {image}+"?alt=media&token=${downloadTokens}"} alt="Villa" style={{ width: 100 }} />,
    // },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image) => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o/${image}?alt=media&token=${downloadTokens}`;
          return <img src={imageUrl} alt="Villa" style={{ width: 100 }} />;
        },
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
        visible={isModalOpen}
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
            name="isForSale"
            rules={[{ required: true, message: 'Please select the sale status!' }]}
          >
            <Select>
              <Option value={true}>For Sale</Option>
              <Option value={false}>Sold</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VillasTable;
