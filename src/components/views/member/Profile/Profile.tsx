import { Tab, Tabs } from "@nextui-org/react";
import PictureTab from "./PictureTab/PictureTab";
import LocationTab from "./InfoTab/InfoTab";
import useProfile from "./useProfile";

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
      {/* <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab> */}
    </Tabs>
  );
};
export default Profile;
