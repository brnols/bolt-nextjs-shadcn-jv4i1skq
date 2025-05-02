"use server";

import api from "@/lib/axiosInstances";
import type { MeUser } from "@/types/meUser";
import { cookies } from "next/headers";

export const getMeUser = async () => {
    const response = await api.post<MeUser>('/api/v1/clients/get-me');
    return response.data;
};
export const postLogout = async () => {
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");

    const response = await api.post("/api/v1/auth/logout");
    return response;
};