import DataTable from "@/components/ui/DataTable/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/inputFile/inputFile";
import AddCategoryModal from "./AddCategoryModal/addCategoryModal";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataCategory,
    isLoadingCategory,
    currentPage,
    currentLimit,
    isRefetchingCategory,
    refetchCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useCategory();

  const addCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "action":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onPress={() => push(`/admin/category/${category._id}`)}
                  key="detail-category-button"
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem key="delete-category" className="text-danger-500">
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          emptyContent="Category is Empty"
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          buttonTopContentLabel="Create Category"
          onclickButtonTopContent={addCategoryModal.onOpen}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          currentPage={Number(currentPage)}
          onChangePage={handleChangePage}
          totalPages={dataCategory?.pagination.totalPages}
          isLoading={isLoadingCategory || isRefetchingCategory}
        />
      )}
      <AddCategoryModal refecthCategory={refetchCategory} {...addCategoryModal} />
    </section>
  );
};
export default Category;
