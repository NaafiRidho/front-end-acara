import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/inputFile/inputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refecthCategory } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refecthCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit = isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateDeleteFile

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={()=>handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    isDisabled
                  ></Input>
                )}
              ></Controller>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  ></Textarea>
                )}
              ></Controller>
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDropable
                    preview={typeof preview === 'string' ? preview : ""}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={()=>handleDeleteIcon(onChange)}
                  />
                )}
              ></Controller>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={()=>handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white"></Spinner>
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
