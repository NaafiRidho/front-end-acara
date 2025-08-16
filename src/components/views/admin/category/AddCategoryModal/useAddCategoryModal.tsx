import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { data } from "framer-motion/client";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please Input Name Of Category"),
  description: yup.string().required("Please Input Description Of Category"),
  icon: yup
    .mixed<FileList | string>()
    .required("Please Input Icon Of Category"),
});

const useAddCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch('icon');

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | "undefined") => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValue("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined)=>void,
  )=>{
    const fileUrl = getValues("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({fileUrl, callback: ()=> onChange(undefined)})
    }
  }

  const handleOnClose = (onclose: ()=>void)=>{
    const fileUrl = getValues("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({fileUrl, callback: ()=> {
        onclose();
        reset();
      }})
    }else{
      onclose();
      reset();
    }
  }

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Category Added Successfully",
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose
  };
};

export default useAddCategoryModal;
