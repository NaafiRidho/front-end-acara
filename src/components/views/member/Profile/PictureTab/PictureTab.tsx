import InputFile from "@/components/ui/inputFile/inputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    preview,
    resetUpdatePicture,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Picture Event</h1>
        <p className="w-full text-small text-default-400">
          Manage Picture for your profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="rounded-lg w-1/2 aspect-square"
            >
              <Avatar
                src={currentPicture}
                alt="Picture"
                showFallback
                className="aspect-square w-full h-full"
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                preview={typeof preview === "string" ? preview : ""}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeletePicture(onChange)}
              />
            )}
          ></Controller>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default PictureTab;
