import { Tab, Tabs } from "@nextui-org/react";
import InfoTab from "./InfoTab/InfoTab";
import CoverTab from "./CoverTab/CoverTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab/LocationTab";
import TicketTab from "./TicketTab/TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();
  return (
    <Tabs arial-lebel="Options">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0].name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdate={handleUpdateLocation}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab/>
      </Tab>
    </Tabs>
  );
};
export default DetailEvent;
