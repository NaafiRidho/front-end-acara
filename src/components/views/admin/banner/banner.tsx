import DataTable from "@/components/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropDownAction/DropdownAction";
import useBanner from "./useBanner";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanners,
    isLoadingBanners,
    isRefetchingBanners,
    refetchBanners,
    selectedId,
    setSelectedId,
  } = useBanner();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="image" width={300} height={200} />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "action":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
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
          emptyContent="Banner is Empty"
          renderCell={renderCell}
          columns={COLUMN_LIST_BANNER}
          data={dataBanners?.data || []}
          buttonTopContentLabel="Create Banner"
          onclickButtonTopContent={addBannerModal.onOpen}
          totalPages={dataBanners?.pagination.totalPages}
          isLoading={isLoadingBanners || isRefetchingBanners}
        />
      )}
    </section>
  );
};
export default Banner;
