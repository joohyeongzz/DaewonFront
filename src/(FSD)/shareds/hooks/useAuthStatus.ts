"use client";

import { useEffect } from "react";
import { isLoggedInState } from "../stores/UserAtom";
import { useSetRecoilState } from "recoil";
import { useTokenRead } from "@/(FSD)/entities/auth/api/useTokenRead";

const useAuthStatus = () => {
    const { data, isError, isPending, error, refetch } = useTokenRead();

    const set = useSetRecoilState(isLoggedInState);

    const isLoggedIn: boolean = !!data;

    useEffect(() => {
        set(isLoggedIn);
    }, [data]);

    useEffect(() => {
        if (isError) {
            if (typeof window !== 'undefined') {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            }
        }
    }, [isError]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        refetch();
        }
    }, [typeof window !== 'undefined' && localStorage.getItem("access_token")]);

    return { data, isPending };
};

export default useAuthStatus;