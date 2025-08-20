import DataTable from "@/components/ui/DataTable/DataTable";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_EVENT } from "./event.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useEvent from "./useEvent";
import InputFile from "@/components/ui/inputFile/inputFile";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropDownAction/DropdownAction";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "action":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          emptyContent="Event is Empty"
          renderCell={renderCell}
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          buttonTopContentLabel="Create Category"
          onclickButtonTopContent={addEventModal.onOpen}
          totalPages={dataEvents?.pagination.totalPages}
          isLoading={isLoadingEvents || isRefetchingEvents}
        />
      )}
    </section>
  );
};
export default Category;
