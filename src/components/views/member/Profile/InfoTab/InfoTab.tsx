import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="w-full text-small text-default-400">
          Manage Information Of this Account
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile?.userName} className="rounded-lg">
            <Input
              label="Username"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataProfile?.userName}
            ></Input>
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              label="Email"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataProfile?.email}
            ></Input>
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              label="Role"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataProfile?.role}
            ></Input>
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="fullname"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Input Your Fullname"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                ></Input>
              )}
            ></Controller>
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataProfile?._id}
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

export default InfoTab;
