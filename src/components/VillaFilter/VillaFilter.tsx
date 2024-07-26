import { Button, Form, Input, InputNumber, Select } from "antd";
import { useStore } from "../../store/store";
import { Filters } from "../../types/filters";
import { getLocalStorageFilters } from "../../utils/getLocalStorageFilters";
import classes from "../VillaFilter/VillaFilter.module.css";

const VillaFilter = () => {
  const [form] = Form.useForm();
  const localStorageFilters: Filters = getLocalStorageFilters();
  const { applyFilters } = useStore();

  const onFinish = (filterValuesObj: Filters) => {
    applyFilters(filterValuesObj);
    localStorage.setItem("filters", JSON.stringify(filterValuesObj));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={localStorageFilters}
      className={classes.villaFilterFormContainer}
    >
      <div className={classes.formInputsContainer}>
        <Form.Item name="location" label="Location">
          <Input placeholder="Example: Tirana" />
        </Form.Item>
        <Form.Item name="floors" label="Floors">
          <InputNumber placeholder="" min={1} />
        </Form.Item>
        <Form.Item name="bathrooms" label="Bathrooms">
          <InputNumber placeholder="" min={1} />
        </Form.Item>
        <Form.Item name="locationType" label="Location Type">
          <Select placeholder="All">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="seaSide">Sea side</Select.Option>
            <Select.Option value="hill">Hill</Select.Option>
            <Select.Option value="riverBank">River bank</Select.Option>
            <Select.Option value="alps">Alps</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="price" label="Price">
          <Select placeholder="All">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="10000-30000">€10.000 - €30.000</Select.Option>
            <Select.Option value="30000-90000">€30.000 - €90.000</Select.Option>
            <Select.Option value="90000-150000">
              €90.000 - €150.000
            </Select.Option>
            <Select.Option value="150000+">€150.000+</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isForSale" label="For Sale">
          <Select placeholder="">
            <Select.Option value={true}>For Sale</Select.Option>
            <Select.Option value={false}>Sold</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <Form.Item className={classes.submitButtonFormItem}>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VillaFilter;
