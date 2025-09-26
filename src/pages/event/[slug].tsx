import LandingPageLayout from "@/components/layouts/LandingPageLayout/landingPageLayout";
import DetailEvent from "@/components/views/detailEvent/DateailEvent";

const HomePage=()=> {
  return (
    <LandingPageLayout title="Event">
      <DetailEvent/>
    </LandingPageLayout>
  );
}
export default HomePage;
