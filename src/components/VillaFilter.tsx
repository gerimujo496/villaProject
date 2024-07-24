import { Button, Form, Input, InputNumber, Select } from "antd";
import { useStore } from "../store/store";
import { Filters } from "../types/filters";
import { getLocalStorageFilters } from "../utils/getLocalStorageFilters";

interface Props {
  onFilterChange: (filterValues: Filters) => void;
}

const VillaFilter = ({ onFilterChange }: Props) => {
  const [form] = Form.useForm();
  const localStorageFilters: Filters = getLocalStorageFilters();

  const { applyFilters } = useStore();

  const onFinish = (filterValuesObj: any) => {
    applyFilters(filterValuesObj);
    localStorage.setItem("filters", JSON.stringify(filterValuesObj));
    onFilterChange(filterValuesObj);
  };

  return (
    <Form
      layout="inline"
      form={form}
      onFinish={onFinish}
      initialValues={localStorageFilters}
      style={{
        margin: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Form.Item name="location" label="Location">
        <Input placeholder="Example: Tirana" />
      </Form.Item>
      <Form.Item name="floors" label="Floors">
        <InputNumber placeholder="1" min={1} />
      </Form.Item>
      <Form.Item name="bathrooms" label="Bathrooms">
        <InputNumber placeholder="1" min={1} />
      </Form.Item>
      <Form.Item name="locationType" label="Location Type">
        <Select style={{ minWidth: "10rem" }} placeholder="All">
          <Select.Option value="seaSide">Sea side</Select.Option>
          <Select.Option value="hill">Hill</Select.Option>
          <Select.Option value="riverBank">River bank</Select.Option>
          <Select.Option value="alps">Alps</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Select style={{ minWidth: "12rem" }} placeholder="All">
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="10000-30000">€10.000 - €30.000</Select.Option>
          <Select.Option value="30000-90000">€30.000 - €90.000</Select.Option>
          <Select.Option value="90000-150000">€90.000 - €150.000</Select.Option>
          <Select.Option value="150000+">€150.000+</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button style={{ margin: "1rem" }} type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VillaFilter;
