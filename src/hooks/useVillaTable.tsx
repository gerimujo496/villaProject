

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVillas, deleteVilla } from '../services/villasServices';
import { Villa } from '../types/villa';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Input, Button, Space, Modal } from 'antd';

export const useVillasTable = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<Villa[]>({
    queryKey: ['villas'],
    queryFn: getVillas,
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: keyof Villa): ColumnType<Villa> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this villa?',
      onOk: async () => {
        try {
          await deleteVilla(id);
          queryClient.invalidateQueries({ queryKey: ['villas'] });
        } catch (error) {
          console.error('Failed to delete villa:', error);
        }
      },
    });
  };

  return {
    data,
    error,
    isLoading,
    searchText,
    searchedColumn,
    getColumnSearchProps,
    handleDelete,
  };
};
