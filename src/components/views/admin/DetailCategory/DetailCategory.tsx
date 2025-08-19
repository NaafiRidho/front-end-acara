import { Tab, Tabs } from "@nextui-org/react";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <Tabs arial-lebel="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};
export default DetailCategory;
