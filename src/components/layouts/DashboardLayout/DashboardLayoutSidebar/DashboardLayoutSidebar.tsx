import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropsTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  onClose?: () => void;
}

const DashboardLayoutSidebar = (props: PropsTypes) => {
  const { sidebarItems, isOpen, onClose } = props;
  const router = useRouter();

  // helper → tutup sidebar kalau mobile
  const handleCloseIfMobile = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "z-50 flex h-screen w-64 flex-col justify-between border-r border-default-200 bg-white px-4 py-6 transition-transform",
        "fixed top-0 left-0 transform lg:static lg:translate-x-0",
        { "-translate-x-full": !isOpen }
      )}
    >
      <div>
        <div className="flex w-full justify-center">
          <Image
            src="/images/general/logo.svg"
            alt="Logo"
            width={180}
            height={60}
            className="mb-6 w-32 cursor-pointer"
            onClick={() => {
              router.push("/");
              handleCloseIfMobile();
            }}
          />
        </div>
        <Listbox items={sidebarItems} variant="solid" aria-label="Dashboard Menu">
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger-500 text-white": router.pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              as={Link}
              href={item.href}
              onClick={handleCloseIfMobile}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onPress={() => {
            handleCloseIfMobile();
            signOut();
          }}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
