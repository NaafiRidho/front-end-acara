import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/inputFile/inputFile";
import { useEffect } from "react";
import useAddBannerModal from "./useAddBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthBanner: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refecthBanner } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    handleUploadImage,
    isPendingMutateUploadFile,
    preview,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refecthBanner();
    }
  }, [isSuccessMutateAddBanner]);

  const disabledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  ></Input>
                )}
              ></Controller>
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Online / Offline"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" value="true">
                      Show
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      Hide
                    </SelectItem>
                  </Select>
                )}
              ></Controller>
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteImage(onChange)}
                  />
                )}
              ></Controller>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white"></Spinner>
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
