import React, { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Tag, Input, Space, Button, Modal } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { Villas } from "../types/types";
import { deleteVilla, getVillas } from "../services/villasServices";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const VillasTable: React.FC = () => {
  const { data, error, isLoading } = useQuery<Villas[]>({
    queryKey: ["villas"],
    queryFn: getVillas,
  });
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<typeof Input | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof Villas
  ): ColumnType<Villas> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput as any}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this villa?",
      onOk: async () => {
        try {
          await deleteVilla(id);
          queryClient.invalidateQueries({ queryKey: ["villas"] });
        } catch (error) {
          console.error("Failed to delete villa:", error);
        }
      },
    });
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
        <Tag color={isForSale ? "green" : "red"}>
          {isForSale ? "Yes" : "No"}
        </Tag>
      ),
      sorter: (a, b) => (a.isForSale ? 1 : 0) - (b.isForSale ? 1 : 0),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Villa" style={{ width: 100 }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    console.log("Various parameters", pagination, filters, sorter, extra);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading villas</p>;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default VillasTable;
