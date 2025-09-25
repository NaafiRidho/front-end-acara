import PageHead from "@/components/commons/PageHead";
import { ReactNode, useEffect, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";

interface PropsTypes {
  title?: string;
  description?: string;
  children?: ReactNode;
  type?: string;
}

const DashboardLayout = (props: PropsTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  // restore state dari localStorage / responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // desktop → baca localStorage
        const saved = localStorage.getItem("sidebarOpen");
        if (saved !== null) {
          setOpen(saved === "true");
        } else {
          setOpen(true); // default buka di desktop
        }
      } else {
        // mobile → selalu tertutup setelah refresh
        setOpen(false);
      }
    };

    handleResize(); // cek pertama kali saat load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // simpan ke localStorage hanya di desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      localStorage.setItem("sidebarOpen", String(open));
    }
  }, [open]);

  return (
    <>
      <PageHead title={title}></PageHead>
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
          onClose={() => setOpen(false)} // untuk close sidebar di mobile
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              isSelected={open}                        // ✅ kontrol toggle
              onChange={(value) => setOpen(value)}     // ✅ ubah state dari toggle
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
