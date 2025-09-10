import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please Input Name"),
  slug: yup.string().required("Please Input slug"),
  category: yup.string().required("Please Select Category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublish: yup.string().required("Please Select status"),
  isFeatured: yup.string().required("Please Select featured"),
  description: yup.string().required("Please Input Description"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

    const { data: dataCategory } = useQuery({
      queryKey: ["Categories"],
      queryFn: () => categoryServices.getCategories(),
      enabled: true,
    });
    
  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  };
};
export default useInfoTab;
