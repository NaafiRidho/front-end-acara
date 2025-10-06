import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useSecurityTab from "./useSecurityTab";

const SecurityTab = () => {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,
    isPendingMutateUpdatePassword,
    hadleUpdatePassword,
  } = useSecurityTab();

  // === visibility states ===
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-small text-default-400">
          Update your account security
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(hadleUpdatePassword)}
        >
          {/* Old Password */}
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Input your old password"
                type={showOld ? "text" : "password"}
                isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword.oldPassword?.message}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowOld((prev) => !prev)}
                  >
                    {showOld ? (
                      <FaEye className="text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="text-xl text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />

          {/* New Password */}
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="New Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Input your new password"
                type={showNew ? "text" : "password"}
                isInvalid={errorsUpdatePassword.password !== undefined}
                errorMessage={errorsUpdatePassword.password?.message}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowNew((prev) => !prev)}
                  >
                    {showNew ? (
                      <FaEye className="text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="text-xl text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />

          {/* Confirm New Password */}
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm New Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Input your confirm new password"
                type={showConfirm ? "text" : "password"}
                isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword.confirmPassword?.message}
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? (
                      <FaEye className="text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="text-xl text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdatePassword}
          >
            {isPendingMutateUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
