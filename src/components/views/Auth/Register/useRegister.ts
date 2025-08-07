import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Please Input Your FullName"),
    userName: yup.string().required("Please Input Your UserName"),
    email: yup.string().email("Email Format Not Valid").required("Please Input Your Email"),
    password: yup.string().min(8, "Minimal 8 Characters").required("Please Input Your Password"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Password Not Match").required("Please Input Your Password"),
});

const useRegister = () => {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        passwordConfirmation: false
    });
    const { setToaster } = useContext(ToasterContext);

    const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key]
        });
    };

    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const registerServices = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: registerServices,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Register Success"
            })
            router.push("/auth/register/success");
        }
    });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors
    };
}

export default useRegister;