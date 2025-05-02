"use client";

import { useState } from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Loading from "@/utils/Loading";
import { Label } from "./ui/label";

export default function ForgotPass() {

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleSendMail = async (
        // e: any
    ) => {
        // e.preventDefault();
        setLoading(true);
        // if (!email) toast.error("Por favor, insira um e-mail válido.");
        // const { ok, error, data } = await passRequestReset(email);
        // if (ok) {
        //     toast.success(
        //         "E-mail de recuperação enviado! Verifique sua caixa de e-mails e redefin sua senha!",
        //         { duration: 5000 },
        //     );
        //     setLoading(false);
        //     push("/");
        // }
    };

    return (
        <form
            onSubmit={handleSendMail}
            className="flex items-center justify-center min-h-screen"
        >
            <Card 
                className="w-full max-w-md box-item"
            >
                <CardHeader>
                    <CardTitle>Recuperar Senha</CardTitle>
                    <CardDescription className="text-gray-500">
                        Insira seu e-mail para receber o link de recuperação.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid mt-4 space-y-4">
                    <div className="grid gap-1">
                        <Label
                            htmlFor="reset-email"
                            className="text-sm font-normal"
                        >
                            E-mail
                        </Label>
                        <Input
                            type="email"
                            id="reset-email"
                            placeholder="exemplo@email.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="grid space-y-4">
                    <Button className="hover:text-black">
                        {loading ? <Loading /> : "Enviar"}
                    </Button>
                    <article className="mt-4 grid gap-2 items-center justify-center text-sm">
                        <Link
                            href="/login/dashboard"
                            className="flex items-center gap-2 hover:underline text-primary"
                        >
                            Volte ao login
                        </Link>
                    </article>
                </CardFooter>
            </Card>
        </form>
    );
}
