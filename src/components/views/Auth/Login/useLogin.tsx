import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin, IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please Input Your Username Or Email"),
  password: yup.string().required("Please Input Your Password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginServices = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result.status === 401) {
      throw new Error("Email or Username not Match with Your Password");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginServices,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
