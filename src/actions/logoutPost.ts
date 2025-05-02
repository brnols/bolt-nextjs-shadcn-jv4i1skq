"use server";

import { LOGOUT_POST } from "@/server/api";
import { cookies } from "next/headers";

export default async function logoutPost() {
    const { url } = LOGOUT_POST();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");

    const responseData = await response.json();
    return { data: responseData, ok: true, error: "" };
}
