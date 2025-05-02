"use server";

import apiError from "@/utils/apiError";
import { PRODUCT_GET } from "@/server/api";
import { cookies } from "next/headers";
import refreshToken from "./refreshPost";

export type ProductData = {
    id: number;
    name: string;
    company_id: string;
    sales: number;
    description: string;
    background_image: string;
    status: boolean;
    sales_link: string;
    support_email: string;
    phone: string;
    product_type: string;
    category: string;
    language: string;
    pixel_id: boolean | null;
    domain_url: string | null;
};

export default async function productGet(id: string) {
    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) throw new Error("Acesso negado.");
        const { url } = PRODUCT_GET(id);
        const response = await fetch(url, {
            headers: {
                Authorization:`Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            const { detail } = await response.json();
            if (detail === "JWT token has expired") {
                await refreshToken(async () => await productGet(id));
            }
        }

        if (!response.ok) throw new Error("Erro ao buscar os dados.");
        const data: ProductData = await response.json();
        return { data, ok: true, error: "" };
    } catch (error) {
        return apiError(error);
    }
}