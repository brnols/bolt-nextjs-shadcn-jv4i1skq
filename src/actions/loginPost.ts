"use server";

import { LOGIN_POST } from "@/server/api";
import apiError from "@/utils/apiError";
import { cookies } from "next/headers";

export type PayloadLogin = {
    email: string | undefined;
    password: string;
};

export default async function loginPost(payload: PayloadLogin) {
    try {
        const { url } = LOGIN_POST();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const { detail } = await response.json();
            throw new Error(detail);
        }
        const data = await response.json();

        (await cookies()).set("access_token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 15 * 60 * 60,
        });
        (await cookies()).set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 30 * 60 * 60,
        });

        return { data: null, ok: true, error: "" };
    } catch (error: unknown) {
        return apiError(error);
    }
}
