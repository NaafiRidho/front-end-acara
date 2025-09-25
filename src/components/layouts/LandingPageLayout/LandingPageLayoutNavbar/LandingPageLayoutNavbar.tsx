import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_ITEMS, NAV_ITEMS } from "../landingPage.constans";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const {
    dataProfile,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();
  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex w-full items-center justify-between 2xl:container">
        <div className="flex items-center gap-8">
          <NavbarBrand as={Link} href="/">
            <Image
              src="/images/general/logo.svg"
              alt="logo"
              width={100}
              height={50}
              className="cursor-pointer"
            />
          </NavbarBrand>
          <NavbarContent className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger-500": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
        <NavbarContent justify="end">
          <NavbarMenuToggle className="lg:hidden" />
          <NavbarItem className="hidden lg:flex relative">
            <Input
              isClearable
              className="w-[300px]"
              placeholder="Search Event"
              startContent={<CiSearch />}
              onClear={() => setSearch("")}
              onChange={handleSearch}
            />
            {search !== "" && (
              <Listbox
                items={dataEventsSearch?.data || []}
                className="absolute right-0 top-12 rounded-xl border bg-white"
              >
                {!isRefetchingEventSearch && !isLoadingEventsSearch ? (
                  (item: IEvent) => (
                    <ListboxItem
                      key={item?._id}
                      href={`/event/${item?.slug}`}
                    >
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${item?.banner}`}
                        alt={`${item?.name}`}
                        className="w-2/5 rounded-md"
                        width={100}
                        height={40}
                      />
                      <p className="w-3/5 text-wrap">
                        {item?.name}
                      </p>
                    </div>
                    </ListboxItem>
                )
                ) : (
                  <ListboxItem key="loading">
                    <Spinner color="danger" size="sm" />
                  </ListboxItem>
                )}
              </Listbox>
            )}
          </NavbarItem>
          {session.status === "authenticated" ? (
            <NavbarItem className="hidden lg:block">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    src={dataProfile?.ProfilePicture}
                    className="cursor-pointer"
                    showFallback
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="admin"
                    href="/admin/dashboard"
                    className={cn({
                      hidden: dataProfile?.role !== "admin",
                    })}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem key="profile" href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="signout"
                    onPress={() => signOut()}
                    className="text-danger"
                  >
                    LogOut
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="hidden lg:flex lg:gap-4">
              {BUTTON_ITEMS.map((item) => (
                <NavbarItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    href={item.href}
                    variant={item.variant as ButtonProps["variant"]}
                    color="danger"
                  >
                    {item.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          )}

          <NavbarMenu className="gap-4">
            {NAV_ITEMS.map((item) => (
              <NavbarMenuItem
                key={`nav-${item.label}`}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger": router.pathname === item.href,
                  },
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavbarMenuItem>
            ))}
            {session.status === "authenticated" ? (
              <Fragment>
                <NavbarMenuItem
                  className={cn(
                    "font-medium text-default-700 hover:text-danger",
                    {
                      hidden: dataProfile?.role !== "admin",
                    },
                  )}
                >
                  <Link href="/admin/dashboard">Admin</Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                  <Link href="/member/profile">Profile</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Button
                    color="danger"
                    onPress={() => signOut()}
                    className="mt-2 w-full"
                    variant="bordered"
                    size="md"
                  >
                    LogOut
                  </Button>
                </NavbarMenuItem>
              </Fragment>
            ) : (
              <Fragment>
                {BUTTON_ITEMS.map((item) => (
                  <NavbarMenuItem key={`button-${item.label}`}>
                    <Button
                      as={Link}
                      color="danger"
                      href={item.href}
                      fullWidth
                      variant={item.variant as ButtonProps["variant"]}
                      size="md"
                    >
                      {item.label}
                    </Button>
                  </NavbarMenuItem>
                ))}
              </Fragment>
            )}
          </NavbarMenu>
        </NavbarContent>
      </div>
    </Navbar>
  );
};
export default LandingPageLayoutNavbar;
