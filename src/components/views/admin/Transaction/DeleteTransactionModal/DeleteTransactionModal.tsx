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
import { Controller } from "react-hook-form";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthTransaction: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal = (props: PropsTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refecthTransaction,
    selectedId,
    setSelectedId,
  } = props;

  const {
  mutateDeleteTransaction,
  isPendingMutateDeleteTransaction,
  isSuccessMutateDeleteTransaction,
} = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTransaction) {
        onClose();
        refecthTransaction();
        setSelectedId("");
    }
  }, [isSuccessMutateDeleteTransaction]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are You Sure You Want To Delete This Transaction?
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
            disabled={isPendingMutateDeleteTransaction}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTransaction}
            onPress={() => mutateDeleteTransaction(selectedId)}
          >
            {isPendingMutateDeleteTransaction ? (
              <Spinner size="sm" color="white"></Spinner>
            ) : (
              "Delete Transaction"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteTransactionModal;
