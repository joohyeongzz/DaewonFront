"use client";

import { useEffect, useState } from "react";
import { FetchType } from "../types/FetchData.type";

const useFetchData = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [backendHost, setBackendHost] = useState<string>("");
    const [fetchData, setFetchData] = useState<any>("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);

            const hostname = window.location.hostname;

            // 환경에 따라 백엔드 호스트 설정
            if (hostname === "localhost") {
                setBackendHost("http://localhost:8090");
            } else {
                setBackendHost("http://localhost:8090");
            }
            const fetchData = async ({ path, method = "GET", contentType = "application/json", isAuthRequired = false, isNotAuthRequired = false, body }: FetchType) => {
                let response = null;
        
                if ((!isNotAuthRequired) || (isAuthRequired)) {
                    response = await fetch(`${backendHost}/api${path}`, {
                        method: method,
                        headers: {
                            "Content-Type": contentType,
                            "Authorization": `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(body)
                    });
                } else {
                    response = await fetch(`${backendHost}${path}`, {
                        method: method,
                        headers: {
                            "Content-Type": contentType,
                        },
                        body: JSON.stringify(body)
                    });
                }
        
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }
        
                const data = await response.json();
        
                return data;
            };
            setFetchData(fetchData)
        }
    }, []);

   

    return fetchData;
};

export default useFetchData;