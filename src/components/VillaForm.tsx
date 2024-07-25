// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   InputNumber,
//   Modal,
//   Upload,
//   UploadFile,
// } from "antd";
// import { LocationType } from "../types/types";
// import useVillaForm from "../hooks/useCreateVillaForm";

// const { Option } = Select;

// const VillaForm: React.FC = () => {
//   const [uploadFileList, setUploadFileList] = useState<UploadFile[]>();

//   const { isModalOpen, form, onFinish, showModal, handleCancel } =
//     useVillaForm();

//   return (
//     <>
//       <Button type="primary" onClick={showModal} style={{ margin: "30px" }}>
//         Open Modal
//       </Button>

//       <Modal
//         title="Add New Villa"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             label="Location"
//             name="location"
//             rules={[{ required: true, message: "Please input the location!" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Location Type"
//             name="locationType"
//             rules={[
//               { required: true, message: "Please select the location type!" },
//             ]}
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
//             rules={[
//               { required: true, message: "Please input the number of floors!" },
//             ]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Area"
//             name="area"
//             rules={[{ required: true, message: "Please input the area!" }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Number of Rooms"
//             name="numOfRooms"
//             rules={[
//               { required: true, message: "Please input the number of rooms!" },
//             ]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Number of Bathrooms"
//             name="numOfBathrooms"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the number of bathrooms!",
//               },
//             ]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: "Please input the price!" }]}
//           >
//             <InputNumber min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Upload Image"
//             name="image"
//             extra="Upload an image file for the villa"
//           >
//             <Upload
//               name="image"
//               maxCount={1}
//               listType="picture"
//               fileList={uploadFileList}
//               accept=".png"
//               customRequest={({ onSuccess }) => onSuccess?.(null)}
//               onChange={({ fileList }) => setUploadFileList(fileList)}
//             >
//               <Button>Click to Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item
//             label="Sale Status"
//             name="saleStatus"
//             rules={[
//               { required: true, message: "Please select the sale status!" },
//             ]}
//           >
//             <Select>
//               <Option value="forSale">For Sale</Option>
//               <Option value="sold">Sold</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Villa
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default VillaForm;

//

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Modal,
  Upload,
  UploadFile,
} from "antd";
import { LocationType, Villas } from "../types/types";
import useCreateVillaForm from "../hooks/useCreateVillaForm";
import { useVillaEditor } from "../hooks/useEditVilla";
import { useState } from "react";

const { Option } = Select;

const VillaForm: React.FC = () => {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>();
  const [form] = Form.useForm();

  const createVillaForm = useCreateVillaForm();
  const editVillaForm = useVillaEditor(form);
  const [isEdit, setIsEdit] = useState(false);

  const showModal = (edit = false) => {
    setIsEdit(edit);
    if (edit) {
      editVillaForm.showModal();
    } else {
      createVillaForm.showModal();
    }
  };

  const handleCancel = () => {
    createVillaForm.handleCancel();
    editVillaForm.handleCancel();
  };

  const onFinish = async (values: any) => {
    if (isEdit) {
      await editVillaForm.handleModalOk();
    } else {
      await createVillaForm.onFinish(values);
    }
  };

  return (
    <Modal
      getContainer={false}
      title={isEdit ? "Edit Villa" : "Add New Villa"}
      open
      onCancel={handleCancel}
      footer={null}
    >
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
          name="numOfRooms"
          rules={[
            { required: true, message: "Please input the number of rooms!" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="Number of Bathrooms"
          name="numOfBathrooms"
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
          label="Upload Image"
          name="image"
          extra="Upload an image file for the villa"
        >
          <Upload
            name="image"
            maxCount={1}
            listType="picture"
            fileList={uploadFileList}
            accept=".png"
            customRequest={({ onSuccess }) => onSuccess?.(null)}
            onChange={({ fileList }) => setUploadFileList(fileList)}
          >
            <Button>Click to Upload</Button>
          </Upload>
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
            {isEdit ? "Edit Villa" : "Add Villa"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VillaForm;
