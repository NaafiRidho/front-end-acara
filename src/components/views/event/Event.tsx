import CardEvent from "@/components/ui/CardEvent/CardEvent";
import useEvent from "./useEvent";
import { IEvent } from "@/types/Event";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./eventFooter/EventFooter";
import EventFilter from "./eventFilter/EventFilter";
import Image from "next/image";

const Event = () => {
  const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();
  const router = useRouter();
  const { setUrlExplore } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <EventFilter />
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data?.map((event: IEvent) => (
                <CardEvent event={event} key={`card-event-${event._id}`} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardEvent
                  key={`card-event-loading-${index}`}
                  isLoading={isLoadingEvents}
                />
              ))}
        </div>

        {!isLoadingEvents && dataEvents?.data?.length > 0 && (
          <EventFooter totalPages={dataEvents?.pagination?.totalPages} />
        )}

        {dataEvents?.data?.length < 1 &&
          !isLoadingEvents &&
          !isRefetchingEvents && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src={"/images/illustrations/no-data.svg"}
                alt="no-data"
                width={200}
                height={200}
                className="rounded"
             />
             <h2 className="text-center text-2xl font-bold text-danger">
                Event Is Empty
             </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default Event;
