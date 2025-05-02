"use server";

import { cookies } from "next/headers";

export default async function getToken() {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) throw new Error("Acesso negado: Token não encontrado.");
    return token;
}