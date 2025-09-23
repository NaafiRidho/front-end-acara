import Image from "next/image";
import { Inter } from "next/font/google";
import Home from "@/components/views/home/home";
import LandingPageLayout from "@/components/layouts/LandingPageLayout/landingPageLayout";

const HomePage=()=> {
  return (
    <LandingPageLayout title="Home">
      <Home/>
    </LandingPageLayout>
  );
}
export default HomePage;
