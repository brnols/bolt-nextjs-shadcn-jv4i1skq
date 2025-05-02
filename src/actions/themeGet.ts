"use server";

import apiError from "@/utils/apiError";
import { THEME_GET } from "@/server/api";
import refreshToken from "./refreshPost";

export type Colors = {
    color_primary: string;
    color_secondary: string;
    text_primary: string;
    text_secondary: string;
    background_primary: string;
    background_secondary: string;
}

export type ThemeData = {
    colors: Colors;
    logo_img: string;
    course_title: string;
    course_description: string;
    link_community: string;
    link_support: string;
    background_img: string;
}

export default async function themeGet(id: string) {
    try {
        const { url } = THEME_GET(id);
        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer ",
            },
        });

        if (response.status === 401) {
            const { detail } = await response.json();
            if (detail === "JWT token has expired") {
                await refreshToken(async () => await themeGet(id));
            }
        }

        if (!response.ok) throw new Error("Erro ao buscar os dados.");
        const data: ThemeData = await response.json();
        return { data, ok: true, error: "" };
    } catch (error) {
        return apiError(error);
    }
}