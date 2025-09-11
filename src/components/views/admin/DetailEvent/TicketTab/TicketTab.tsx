import DropdownAction from "@/components/commons/DropDownAction/DropdownAction";
import DataTable from "@/components/ui/DataTable/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment, Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constans";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal/addTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "action":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
      <CardHeader className="items-center justify-between">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Event Ticket</h1>
          <p className="w-full text-small text-default-400">
            Manage Ticket of this event
          </p>
        </div>
        <Button color="danger" onPress={addTicketModal.onOpen}>Add new Ticket</Button>
      </CardHeader>
      <CardBody className="pt-0">
        <DataTable
          emptyContent="Ticket is Empty"
          renderCell={renderCell}
          columns={COLUMN_LIST_TICKET}
          data={dataTicket||[]}
          totalPages={1}
          isLoading={isPendingTicket||isRefetchingTicket}
          showLimit={false}
          showSearch={false}
        />
      </CardBody>
    </Card>
    <AddTicketModal {...addTicketModal} refecthTicket={refetchTicket}/>
    </Fragment>
  );
};

export default TicketTab;
