import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropsTypes {
  title?: string;
  children?: ReactNode
  
}

const AuthLayout = (props: PropsTypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;
