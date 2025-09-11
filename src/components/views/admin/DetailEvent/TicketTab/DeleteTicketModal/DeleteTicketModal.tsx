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
import useDeleteTicketModal from "./useDeleteTiketModal";
import { ITicket } from "@/types/Ticket";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refecthTicket: () => void;
  SelectedDataTicket: ITicket|null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket|null>>;
}

const DeleteTicketModal = (props: PropsTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refecthTicket,
    SelectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
  mutateDeleteTicket,
  isPendingMutateDeleteTicket,
  isSuccessMutateDeleteTicket,
} = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket) {
        onClose();
        refecthTicket();
        setSelectedDataTicket(null);
    }
  }, [isSuccessMutateDeleteTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are You Sure You Want To Delete This Ticket?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null);
            }}
            disabled={isPendingMutateDeleteTicket}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTicket}
            onPress={() => mutateDeleteTicket(`${SelectedDataTicket?._id}`)}
          >
            {isPendingMutateDeleteTicket ? (
              <Spinner size="sm" color="white"></Spinner>
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteTicketModal;
