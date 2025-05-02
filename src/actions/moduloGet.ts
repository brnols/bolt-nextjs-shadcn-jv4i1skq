"use server";

import apiError from "@/utils/apiError";
import { MODULO_GET, MODULOS_GET } from "@/server/api";
import { cookies } from "next/headers";
import refreshToken from "./refreshPost";

// Types
export type Video = {
    video_url: string;
    teacher: string | null;
    file_extension: string;
    thumbnail: string | null;
    description: string | null;
    title: string | null;
    uuid: string;
    session_id: string;
}
export type ModulosData = {
    uuid: string;
    title: string;
    thumbnail: string | null;
    description: string | null;
    product_id: string;
    videos: Video[];
};
export type VideoData = {
    uuid: string;
    title: string | null;
    url: string;
    description: string;
    thumbnail: string | null;
};
export type ModuloData = {
    uuid: string;
    title: string;
    thumbnail: string;
    description: string;
    product_id: string;
    created_at: string;
    updated_at: string;
    videos: VideoData[];
};

// Get Modulo
export async function moduloGet(id: string) {
    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) throw new Error("Acesso negado.");
        const { url } = MODULO_GET(id);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            const { detail } = await response.json();
            if (detail === "JWT token has expired") {
                await refreshToken(async () => await moduloGet(id));
            }
        }

        if (!response.ok) throw new Error("Erro ao buscar os dados.");
        const data: ModuloData[] = await response.json();
        return { data, ok: true, error: "" };
    } catch (error) {
        return apiError(error);
    }
}

// Get Modulos
export async function modulosGet(id: string) {
    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) throw new Error("Acesso negado.");
        const { url } = MODULOS_GET(id);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            const { detail } = await response.json();
            if (detail === "JWT token has expired") {
                await refreshToken(async () => await modulosGet(id));
            }
        }

        if (!response.ok) throw new Error("Erro ao buscar os dados.");
        const data: ModulosData[] = await response.json();
        return { data, ok: true, error: "" };
    } catch (error) {
        return apiError(error);
    }
}