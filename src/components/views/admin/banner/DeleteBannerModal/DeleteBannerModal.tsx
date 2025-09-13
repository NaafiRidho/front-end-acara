import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthBanner: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropsTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refecthBanner,
    selectedId,
    setSelectedId,
  } = props;

  const {
  mutateDeleteBanner,
  isPendingMutateDeleteBanner,
  isSuccessMutateDeleteBanner,
} = useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessMutateDeleteBanner) {
        onClose();
        refecthBanner();
        setSelectedId("");
    }
  }, [isSuccessMutateDeleteBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are You Sure You Want To Delete This Banner?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => mutateDeleteBanner(selectedId)}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white"></Spinner>
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteBannerModal;
