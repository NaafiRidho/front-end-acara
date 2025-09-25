import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
  const { control, dataCategory, isSuccessCategory, setValue } =
    useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentCategory,
    currentisOnline,
    currentisFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentisOnline}`);
      setValue("isFeatured", `${currentisFeatured}`);
    }
  }, [isSuccessCategory]);
  return (
    <div className="top-20 h-fit w-full rounded-xl border p-4 lg:sticky lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  placeholder="Search Category Here"
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            ></Controller>
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  labelPlacement="outside"
                  placeholder="Select Online / Offline"
                  variant="bordered"
                  disallowEmptySelection
                  defaultSelectedKeys={[`${currentisOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
                >
                  <SelectItem key="true" value="true">
                    Online
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Offline
                  </SelectItem>
                </Select>
              )}
            ></Controller>
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Featured"
                  labelPlacement="outside"
                  placeholder="Select Featured Event"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentisFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
                >
                  <SelectItem key="true" value="true">
                    Yes
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    No
                  </SelectItem>
                </Select>
              )}
            ></Controller>
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg"></Skeleton>
            <Skeleton className="h-14 w-full rounded-lg"></Skeleton>
            <Skeleton className="h-14 w-full rounded-lg"></Skeleton>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventFilter;
