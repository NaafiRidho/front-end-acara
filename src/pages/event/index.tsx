import LandingPageLayout from "@/components/layouts/LandingPageLayout/landingPageLayout";
import Event from "@/components/views/event/Event";

const HomePage=()=> {
  return (
    <LandingPageLayout title="Event">
      <Event/>
    </LandingPageLayout>
  );
}
export default HomePage;
