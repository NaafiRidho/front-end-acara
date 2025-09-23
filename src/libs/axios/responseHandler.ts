import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface errorResponseData {
    data: {
        name: string;
    }
}

const onErrorHandler = (error: Error) => {
    const { response } = error as AxiosError;
    const res = response?.data as errorResponseData;

    if (response && res?.data?.name === "TokenExpiredError") {
        signOut();
    }
}

export default onErrorHandler;