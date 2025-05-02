"use server";

import { REFRESH_POST } from "@/server/api";
import { cookies } from "next/headers";
import logoutPost from "./logoutPost";

export default async function refreshToken(action: () => void) {
    try {
        const refresh_token = (await cookies()).get("refresh_token")?.value;
        if (!refresh_token || !refresh_token.length) {
            await logoutPost();
            return { data: null, ok: false, error: "No refresh token" };
        }

        const { url } = REFRESH_POST();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${refresh_token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            await logoutPost();
            return { data: null, ok: false, error: "Failed to refresh token" };
        }

        (await cookies()).set("access_token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        action();
        return { data: null, ok: true, error: "" };
    } catch (error: unknown) {
        console.error("Error refreshing token:", error);
        await logoutPost();
        return { data: null, ok: false, error: "Failed to refresh token" };
    }
    
}
