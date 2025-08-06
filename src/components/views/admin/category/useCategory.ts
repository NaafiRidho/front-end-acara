import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useCategory = () => {
    const router = useRouter();
    const debonce = useDebounce();
    const currentLimit = router.query.limit;
    const currentPage = router.query.page;
    const currentSearch = router.query.search;

    const setURL = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || "",
            }
        })
    }
    const getCategories = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const response = await categoryServices.getCategories(params);
        const { data } = response;
        return data;
    }

    const { data: dataCategory, isLoading: isLoadingCategory, isRefetching: isRefetchingCategory } = useQuery({
        queryKey: ["Category", currentPage, currentLimit, currentSearch],
        queryFn: getCategories,
        enabled: router.isReady && !!currentPage && !!currentLimit
    })

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page: page,
            }
        })
    }

    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectLimit = e.target.value;
        router.push({
            query: {
                ...router.query,
                limit: selectLimit,
                page: PAGE_DEFAULT,
            }
        })
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debonce(() => {
            const search = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    search: search,
                    page: PAGE_DEFAULT,
                }
            })
        }, DELAY)
    }

    const handleClearSearch = () => {
        router.push({
            query: {
                ...router.query,
                search: '',
                page: PAGE_DEFAULT,
            }
        })
    }

    return {
        setURL,
        dataCategory,
        isLoadingCategory,
        currentPage,
        currentLimit,
        currentSearch,
        isRefetchingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    }
}


export default useCategory;