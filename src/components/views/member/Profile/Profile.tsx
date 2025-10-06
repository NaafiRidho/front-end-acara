import { Tab, Tabs } from "@nextui-org/react";
import PictureTab from "./PictureTab/PictureTab";
import InfoTab from "./InfoTab/InfoTab";
import useProfile from "./useProfile";
import SecurityTab from "./SecurityTab/SecurityTab";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();
  return (
    <Tabs arial-lebel="Options">
      <Tab key="picture" title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};
export default Profile;
