"use server";

import apiError from "@/utils/apiError";
import { USER_POST } from "@/server/api";
import { cookies } from "next/headers";
import refreshToken from "./refreshPost";

export type UserData = {
    uuid: string;
    name: string;
    email: string;
    is_blocked: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login: string;
    deleted_at: string | null;
};

export default async function userPost() {
    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) throw new Error("Acesso negado.");

        const { url } = USER_POST();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        if (response.status === 401) {
            const { detail } = await response.json();
            if (detail === "JWT token has expired") {
                await refreshToken(async () => await userPost());
            }
        }

        if (!response.ok) throw new Error("Erro ao buscar os dados.");
        const data: UserData = await response.json();
        return { data, ok: true, error: "" };
    } catch (error) {
        return apiError(error);
    }
}
