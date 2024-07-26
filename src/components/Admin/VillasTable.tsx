import React, { useState } from "react";
import { Table, Tag, Space, Button, Flex } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Villas } from "../../types/types";
import { useVillasTable } from "../../hooks/useVillaTable";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import EditVillaForm from "./mutationForms/EditVillaForm";
import CreateVillaForm from "./mutationForms/CreateVillaForm";

const VillasTable: React.FC = () => {
 
  const [selectedVilla, setSelectedVilla] = useState<Villas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading, getColumnSearchProps, handleDelete } =
    useVillasTable();



  const handleEdit = (record: Villas) => {
    setSelectedVilla(record);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Villas> = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
      sorter: (a, b) => (a.location || "").localeCompare(b.location || ""),
    },
    {
      title: "Location Type",
      dataIndex: "locationType",
      key: "locationType",
      sorter: (a, b) =>
        (a.locationType || "").localeCompare(b.locationType || ""),
    },
    {
      title: "Floors",
      dataIndex: "floors",
      key: "floors",
      sorter: (a, b) => (a.floors || 0) - (b.floors || 0),
    },
    {
      title: "Area (sq ft)",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) => (a.area || 0) - (b.area || 0),
    },
    {
      title: "Rooms",
      dataIndex: "numOfRooms",
      key: "numOfRooms",
      sorter: (a, b) => (a.numOfRooms || 0) - (b.numOfRooms || 0),
    },
    {
      title: "Bathrooms",
      dataIndex: "numOfBathrooms",
      key: "numOfBathrooms",
      sorter: (a, b) => (a.numOfBathrooms || 0) - (b.numOfBathrooms || 0),
    },
    {
      title: "Price (million)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: "For Sale",
      dataIndex: "isForSale",
      key: "isForSale",
      render: (isForSale) => (
        <Tag color={isForSale !== false ? "green" : "red"}>
          {isForSale !== false ? "Yes" : "No"}
        </Tag>
      ),
      sorter: (a, b) => (a.isForSale ? 1 : 0) - (b.isForSale ? 1 : 0),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Villa" style={{ width: 80 }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>
            <EditTwoTone />
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading villas</p>;

  return (
    <>
      <Flex justify="flex-end" align={"center"}>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ margin: "  30px 35px 3px   10px  ", height: "40px" }}
        >
          Add New Villa
        </Button>
      </Flex>
      <Table
        style={{
          margin: "30px",
          boxShadow: "10px 10px 10px 5px lightgrey",
          borderRadius: "10px",
        }}
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
      {selectedVilla ? (
        <EditVillaForm
          setSelectedVilla={setSelectedVilla}
          villa={selectedVilla}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      ) : (
        <CreateVillaForm
          setSelectedVilla={setSelectedVilla}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default VillasTable;
