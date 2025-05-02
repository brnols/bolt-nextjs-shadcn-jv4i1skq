"use client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import MeUserServices from "@/services/meUser";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import toast from "react-hot-toast";
import { useState } from "react";

interface HeaderBarDashProps {
    children: React.ReactNode;
}

export default function HeaderBarDash({children}: HeaderBarDashProps) {

    // Get Data User
    const { data: userData } = MeUserServices.getMeUser();

    // System de logout
    const { mutate: logout } = MeUserServices.postLogout();
    const handleLogout = () => {
        logout();
        toast.success("Logout realizado com sucesso!");
        window.location.href = '/login/dashboard';
    }

    // System PopUp
    const [open, setOpen] = useState<boolean>(false);    
    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <>
            <AlertDialog open={open} onOpenChange={handleOpen}>
                <div data-testid="header-bar-dash" className="w-full h-[50px] bg-[#1f1f21] flex items-center justify-between px-4 border-b border-slate-600 shadow-sm">
                    <div className="flex gap-2">
                        <img
                            src="/img/01.png"
                            alt="logo pay_central"
                            className="h-[30px]"
                        />
                        <img
                            src="/img/03.png"
                            alt=""
                            className="h-[30px]"
                        />
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                            <div className="relative group">
                                <div 
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 scale-[1.8] transition-all duration-300 ease-out"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(246, 116, 53, 0.7) 0%, rgba(239,68,68,0) 70%)'
                                    }}
                                />
                                <Avatar className="w-[30px] h-[30px]">
                                    <AvatarImage src="" alt="img de perfil"/>
                                    <AvatarFallback className="text-primary">
                                        {(() => {
                                            if (userData?.name) {
                                                const names = userData.name.split(" ");
                                                return names.length >= 2 ? names[0][0] + names[1][0] : names[0].substring(0, 2);
                                            }
                                            return "";
                                        })()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="flex items-center gap-4 py-[24px] px-[8px]">
                                <div className="relative group">
                                    <div 
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 scale-[1.6] transition-all duration-300 ease-out"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(246, 116, 53, 0.7) 0%, rgba(239,68,68,0) 70%)'
                                        }}
                                    />
                                    <Avatar className="w-[40px] h-[40px] relative">
                                        <AvatarImage src="" alt="img de perfil" />
                                        <AvatarFallback className="text-primary">
                                        {(() => {
                                            if (userData?.name) {
                                                const names = userData.name.split(" ");
                                                return names.length >= 2 ? names[0][0] + names[1][0] : names[0].substring(0, 2);
                                            }
                                            return "";
                                        })()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                    <div>
                                        <p className="!text-md !font-normal text-gray-800">{userData?.name}</p>
                                        <p className="!text-sm !font-normal text-gray-600">{userData?.email}</p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuItem>
                                    <button 
                                        type="button"
                                        className="flex items-center gap-2 w-full"
                                        onClick={() => {
                                            handleOpen();
                                        }}
                                    >
                                        <LogOut size={24} />
                                        <p className="text-lg">Sair</p>
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza de que deseja fazer logout?</AlertDialogTitle>
                                <AlertDialogDescription>Sua sessão será encerrada agora!</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>{handleLogout()}}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </div>
                </div>
            </AlertDialog>
            {children}
        </>
    );
}
