import { Skeleton } from "@nextui-org/react";
import HomeSlider from "./HomeSlider/HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEventlist from "./HomeEventList/HomeEventList";
import HomeCategoryList from "./HomeCategoryList/HomeCategoryList";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanner={isLoadingBanners}
      />
      <HomeEventlist
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mb-16 h-[20vw] w-full rounded-xl px-6 lg:px-0"
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          className="h-[20vw] w-full rounded-xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeEventlist
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};
export default Home;
