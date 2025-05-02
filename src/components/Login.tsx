"use client";

import {CardContent, CardDescription, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import loginPost, { type PayloadLogin } from "@/actions/loginPost";
import { useRouter } from "next/navigation";
import Loading from "@/utils/Loading";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import type { ThemeData } from "@/actions/themeGet";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';


type LoginProps = {
    data: ThemeData | null;
    uuid: string;
};

const Login = ({ data, uuid }: LoginProps) => {
    const router = useRouter();
    const payloadDefault = { email: "", password: "" };
    const [payloadLogin, setPayloadLogin] = useState<PayloadLogin>(payloadDefault);

    // atualiza o payload
    const updatePayloadLogin = (
        key: keyof typeof payloadLogin,
        value: string | number | boolean
    ) => {
        setPayloadLogin((prev: PayloadLogin) => ({
        ...prev,
        [key]: value,
        }));
    };

    const login = useMutation({
        mutationFn: loginPost,
        onSuccess: (data) => {
            if (data?.ok) {
                toast.success("Login realizado com sucesso!");
                if (uuid !== "dashboard") {
                    router.push(`/main/${uuid}`);
                } else {
                    router.push("/dashboard");
                }
            } else {
                toast.error("Falha ao realizar Login!");
            }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            login.isPending ||
            payloadLogin.email === "" ||
            payloadLogin.password === ""
        )
        return;
    
        login.mutate(payloadLogin);
    };

    return (
        <>
            {data? (
                <div
                    className="sm:w-[440px] w-[320px] h-auto box-item"
                    style={{ backgroundColor: data?.colors?.background_primary }}
                >
                    <CardContent className="flex flex-col items-center sm:pt-4 pt-8">
                        <div className=" sm:h-[100px] h-[70px] relative flex justify-center items-center">
                            {data ? (
                                <img className="w-[200px] aspect-16/9 rounded-md" src={data?.logo_img} alt="logo"/>
                            ) : (
                                <Skeleton className="w-[200px] min-h-[70px] aspect-16/9 rounded-lg" />
                            )}
                        </div>
                        <CardHeader 
                            className="font-bold text-lg !pt-4 !pb-2 " 
                            style={{ color: data?.colors?.text_primary }}
                        >
                            {data ? (
                                <p 
                                    className="text-lg font-bold sm:pt-0 pt-2" 
                                    style={{ color: data?.colors?.text_primary }}
                                >
                                    {data?.course_title}
                                </p>
                            ) : (
                                <Skeleton className="w-[200px] h-[23px] rounded-lg" />
                            )}
                        </CardHeader>
                        <CardDescription
                            className="text-sm w-full text-center !pt-0"
                        >
                            {data ? (
                                <p className="text-lg font-bold" style={{ color: data?.colors?.text_primary }}>Acesse sua conta</p>
                            ) : (
                                <Skeleton className="w-[200px] h-[23px] rounded-lg" />
                            )}
                            {data ? (
                                <p style={{ color: data?.colors?.text_secondary }}>
                                    Preencha seus dados de acesso à plataforma.
                                </p>
                            ) : (
                                <Skeleton className="w-full h-[46px] " />
                            )}
                        </CardDescription>
                        <div className="flex flex-col gap-3 my-4 w-full">
                        {data ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <Input
                                style={{ color: data?.colors?.text_primary }}
                                placeholder="email"
                                type="email"
                                onChange={(e) => {
                                updatePayloadLogin("email", e.target.value);
                                }}
                            />
                            <Input
                                style={{ color: data?.colors?.text_primary }}
                                placeholder="password"
                                type="password"
                                onChange={(e) => {
                                updatePayloadLogin("password", e.target.value);
                                }}
                            />
                            <Button
                                disabled={
                                payloadLogin.email === "" ||
                                payloadLogin.password === "" ||
                                login.isPending
                                }
                                type="submit"
                                style={{
                                backgroundColor: data?.colors?.color_primary,
                                color: data?.colors?.text_primary,
                                }}
                                className="w-full text-black text-xs h-[40px]"
                            >
                                {login.isPending ? (
                                <div className="flex justify-center items-center">
                                    <Loading />
                                </div>
                                ) : (
                                <>
                                    Acessar sua conta
                                    <ArrowRight
                                    size={20}
                                    color={data?.colors?.text_primary}
                                    />
                                </>
                                )}
                            </Button>
                            </form>
                        ) : (
                            <>
                            <Skeleton className="w-full h-[36px] rounded-lg" />
                            <Skeleton className="w-full h-[36px] rounded-lg" />
                            <Skeleton className="w-full h-[36px] rounded-lg" />
                            </>
                        )}
                        <div>
                            {data ? (
                            <Link
                                href={`/main/${uuid}/esqueceu-senha`}
                                className="text-xs cursor-pointer w-auto"
                                style={{ color: data?.colors?.color_primary }}
                            >
                                Esqueceu sua senha?
                            </Link>
                            ) : (
                            <Skeleton className="w-[150px] h-[20px] rounded-lg" />
                            )}
                        </div>
                        </div>
                    </CardContent>
                </div>
            ):(
                <div
                className="sm:w-[440px] w-[320px] h-auto box-item"
            >
                <CardContent className="flex flex-col items-center sm:pt-4 pt-8">
                    <div className=" sm:h-[60px] w-[200px] mb-4 aspect-16/9 h-[70px] relative flex gap-2 justify-center items-center">
                        <img className="h-full" src="/img/01.png" alt="logo"/>
                        <img className="h-full" src="/img/02.png" alt="logo"/>
                    </div>
                    <CardDescription
                        className="text-sm w-full text-center"
                    >
                        <p className="text-lg font-bold text-primary">Acesse sua conta</p>
                            <p className="text-gray-500">
                                Preencha seus dados de acesso à plataforma.
                            </p>
                    </CardDescription>
                    <div className="flex flex-col gap-3 my-4 w-full">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            placeholder="email"
                            type="email"
                            onChange={(e) => {
                            updatePayloadLogin("email", e.target.value);
                            }}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            onChange={(e) => {
                            updatePayloadLogin("password", e.target.value);
                            }}
                        />
                        <Button
                            disabled={
                            payloadLogin.email === "" ||
                            payloadLogin.password === "" ||
                            login.isPending
                            }
                            type="submit"
                            className="w-full text-black text-xs h-[40px]"
                        >
                            {login.isPending ? (
                            <div className="flex justify-center items-center">
                                <Loading />
                            </div>
                            ) : (
                            <>
                                Acessar sua conta
                                <ArrowRight
                                size={20}
                                />
                            </>
                            )}
                        </Button>
                        </form>
                        <div>
                            <Link
                                href="/esqueceu-senha"
                                className="text-xs cursor-pointer w-auto text-primary"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </div>
            )}
        </>
    );
}

export default Login;