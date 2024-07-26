import React, { useState } from "react";
import { Input, Button, Modal, Upload, UploadFile, Flex } from "antd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Villas } from "../../types/types";
import { Inputs } from "../../types/inputs";
import useCreateVillaForm from "../../hooks/useCreateVillaForm";
import useEditVilla from "../../hooks/useEditVilla";

import { uploadImageToFirebase } from "../../services/imageUpload";

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
const alignOptions = ["flex-start", "center", "flex-end"];

interface VillaFormProps {
  villa?: Villas | null;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVilla: any;
}

const VillaForm: React.FC<VillaFormProps> = ({
  villa,
  isModalOpen,
  setIsModalOpen,
  setSelectedVilla,
}) => {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const defaultValues: Inputs = {
    location: villa?.location || "",
    locationType: villa?.locationType,
    floors: villa?.floors || 0,
    numOfRooms: villa?.numOfRooms || 0,
    numOfBathrooms: villa?.numOfBathrooms || 0,
    price: villa?.price || 0,
    area: villa?.area || 0,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Villas>({
    defaultValues,
  });

  const createVillaForm = useCreateVillaForm(reset, () => {
    setIsModalOpen(false);
  });

  const editVillaForm = useEditVilla(villa?.id, reset, () => {
    setIsModalOpen(false);
    setSelectedVilla(null);
  });
  const isEditing = !!villa;

  const onSubmit: SubmitHandler<Villas> = async (data) => {
    try {
      if (uploadFileList.length > 0) {
        const imageUrl = await uploadImageToFirebase(uploadFileList[0]);
        data.image = imageUrl;
      }

      if (isEditing) {
        await editVillaForm.mutation.mutateAsync({ ...data, id: villa!.id });
      } else {
        await createVillaForm.mutation.mutateAsync(data);
      }

      setSelectedVilla(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedVilla(null);
  };

  return (
    <Modal
      title={isEditing ? "Edit Villa" : "Add New Villa"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form className="villa-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Location</label>
              <Input
                {...field}
                status={errors.location ? "error" : undefined}
              />
              <span>{errors.location?.message}</span>
            </div>
          )}
        />
        <Controller
          name="locationType"
          control={control}
          rules={{ required: "Location Type is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Location Type</label>
              <Input
                {...field}
                status={errors.locationType ? "error" : undefined}
              />
              <span>{errors.locationType?.message}</span>
            </div>
          )}
        />
        <Controller
          name="floors"
          control={control}
          rules={{ required: "Floors are required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Floors</label>
              <Input {...field} status={errors.floors ? "error" : undefined} />
              <span>{errors.floors?.message}</span>
            </div>
          )}
        />
        <Controller
          name="numOfRooms"
          control={control}
          rules={{ required: "Number of Rooms is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Number of Rooms</label>
              <Input
                {...field}
                status={errors.numOfRooms ? "error" : undefined}
              />
              <span>{errors.numOfRooms?.message}</span>
            </div>
          )}
        />
        <Controller
          name="numOfBathrooms"
          control={control}
          rules={{ required: "Number of Bathrooms is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Number of Bathrooms</label>
              <Input
                {...field}
                status={errors.numOfBathrooms ? "error" : undefined}
              />
              <span>{errors.numOfBathrooms?.message}</span>
            </div>
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Price</label>
              <Input {...field} status={errors.price ? "error" : undefined} />
              <span>{errors.price?.message}</span>
            </div>
          )}
        />
        <Controller
          name="area"
          control={control}
          rules={{ required: "Area is required" }}
          render={({ field }) => (
            <div className="input-container">
              <label htmlFor={field.name}>Area</label>
              <Input {...field} status={errors.area ? "error" : undefined} />
              <span>{errors.area?.message}</span>
            </div>
          )}
        />
        <Upload
          name="image"
          maxCount={1}
          listType="picture"
          fileList={uploadFileList}
          onChange={({ fileList }) => setUploadFileList(fileList)}
          customRequest={({ onSuccess }) => onSuccess?.(null)}
        >
          <Button>Click to Upload</Button>
        </Upload>
        <Flex justify={justifyOptions[1]} align={alignOptions[1]}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100px", height: "40px" }}
          >
            {isEditing ? "Edit Villa" : "Add Villa"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default VillaForm;
