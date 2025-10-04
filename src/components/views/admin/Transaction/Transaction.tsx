import DataTable from "@/components/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropDownAction/DropdownAction";
import useTransaction from "./useTransaction";
import { convertIDR } from "@/utils/currency";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal";
const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = useTransaction();

  const deleteTransactionModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          let color: "success" | "warning" | "danger" = "warning";

          if (cellValue === "completed") {
            color = "success";
          } else if (cellValue === "pending") {
            color = "warning";
          } else if (cellValue === "cancelled") {
            color = "danger";
          }

          return (
            <Chip color={color} size="sm" variant="flat">
              {cellValue as ReactNode}
            </Chip>
          );
        case "nominal":
          return convertIDR(Number(cellValue));
        case "action":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/transaction/${transaction?.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransactionModal.onOpen();
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
          emptyContent="Transaction is Empty"
          renderCell={renderCell}
          columns={COLUMN_LIST_TRANSACTION}
          data={dataTransactions?.data || []}
          totalPages={dataTransactions?.pagination.totalPages}
          isLoading={isLoadingTransactions || isRefetchingTransactions}
        />
      )}
      <DeleteTransactionModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refecthTransaction={refetchTransactions}
        {...deleteTransactionModal}
      />
    </section>
  );
};
export default Transaction;
