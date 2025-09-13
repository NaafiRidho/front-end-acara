import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);
    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingMutateDeleteBanner,
    isSuccess: isSuccessMutateDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError: (error) => {
      setToaster({ message: error.message, type: "error" });
    },
    onSuccess: () => {
      setToaster({ message: "Banner deleted successfully", type: "success" });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
