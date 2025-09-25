import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debonce = useDebounce();
  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentisOnline = router.query.isOnline;
  const currentisFeatured = router.query.isFeatured;

  const setUrl = () => {
    if (router.isReady) {
      router.replace({
        query: {
          limit: currentLimit || LIMIT_DEFAULT,
          page: currentPage || PAGE_DEFAULT,
          search: currentSearch || "",
        },
      });
    }
  };

  const setUrlExplore = () => {
    if (router.isReady) {
      router.replace({
        query: {
          limit: currentLimit || LIMIT_DEFAULT,
          page: currentPage || PAGE_DEFAULT,
          category: currentCategory || "",
          isOnline: currentisOnline || "",
          isFeatured: currentisFeatured || "",
        },
      });
    }
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeCategory = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debonce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search: search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };
  return {
    currentLimit,
    currentPage,
    currentSearch,
    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    setUrlExplore,
    currentCategory,
    currentisFeatured,
    currentisOnline,
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
  };
};
export default useChangeUrl;
