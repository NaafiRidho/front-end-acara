import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar/LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter/LandingPageLayoutFooter";

interface PropsTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropsTypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar></LandingPageLayoutNavbar>
      <div className="py-10 md:p-6">{children}</div>
      <LandingPageLayoutFooter></LandingPageLayoutFooter>
    </Fragment>
  );
};
export default LandingPageLayout;
