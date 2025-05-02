/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import type React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import logoutPost from '@/actions/logoutPost';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import themeGet from '@/actions/themeGet';
import userPost from '@/actions/userPost';

type HeaderBarProps = {
  children: React.ReactNode;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ children }) => {
  const pathname = usePathname();
  const { uuid } = useParams();
  const router = useRouter();

  const hideSidebarRoutes = ['/login', '/esqueceu-senha', '/dashboard', '/main'];
  if (hideSidebarRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Pega as inicial do nome
  const initialName = (name: string | undefined): string => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  // Get user
  const {data: userData} = useQuery({
    queryKey: ['user'], 
    queryFn: () => userPost(),
    refetchInterval: 1000 * 60 * 60,
  });

  // Get theme
  const { data: themeData,  } = useQuery({
      queryKey: ['theme', uuid], 
      queryFn: () => themeGet(uuid as string),
      enabled: uuid !== "dashboard" && uuid !== null,
  });

  // sistema de logout 
  const logout = useMutation({
    mutationFn: logoutPost,
    onSuccess: () => {
      router.push("/login");
    }
  });
    
  return (
    <div>
      {/* Header */}
      <div
        className="box-item !flex !rounded-none w-full h-[50px] px-5 flex justify-between items-center"
        style={{ backgroundColor: themeData?.data?.colors.background_primary }}
      >
        {themeData?.data ? (
          <div className="flex justify-center gap-4 ms:gap-16 items-center">
            <img
              src={themeData?.data?.logo_img}
              alt="logo"
              className="h-[29px] aspect-16/9"
            />
            <div
              className="flex gap-4 text-sm font-bold"
              style={{ color: themeData?.data?.colors.text_primary }}
            >
              <Link href={`/main/${uuid}`}>Inicio</Link>
              {themeData?.data.link_community && (
                <a 
                  href={`https://${themeData?.data.link_community}`}
                  style={{ color: themeData?.data?.colors.text_primary}}
                >
                  Comunidade
                </a>
              )}
              {themeData?.data.link_support && 
                <a 
                  href={`https://${themeData?.data.link_support}`}
                >
                  Suporte
                </a>
              }
            </div>
          </div>
        ) : (
          <Skeleton className="aspect-[1920/595] h-[30px] rounded" />
        )}
        <div className="flex gap-6 items-center">
          <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className="flex border justify-center items-center rounded-3xl gap-4 px-1 sm:px-2 py-1"
                style={{
                  backgroundColor: themeData?.data?.colors.background_primary,
                  borderColor: themeData?.data?.colors.text_primary,
                }}
              >
                <span
                  className="truncate max-w-[70px] text-ellipsis overflow-hidden whitespace-nowrap hidden md:block text-xs"
                  style={{ color: themeData?.data?.colors.text_primary }}
                >
                  {userData?.data? userData.data.name : <Skeleton className="w-[70px] h-[16px] rounded-lg" />}
                </span>
                <Avatar className="w-[25px] h-[25px]">
                  <AvatarFallback className="text-xs">
                    {userData?.data? initialName(userData.data.name) : <Skeleton className="w-full h-full rounded-lg" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <DropdownMenuContent
                className="z-50 flex items-center rounded w-[100px]"
                style={{ backgroundColor: themeData?.data?.colors.background_secondary }}
              >
                <AlertDialogTrigger>
                  <DropdownMenuItem
                    className="cursor-pointer text-xs w-[115px]"
                    style={{ color: themeData?.data?.colors.text_primary }}
                  >
                    Sair
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
              
              {/* popUp logout */}
            <AlertDialogContent style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                <AlertDialogHeader>
                    <AlertDialogTitle style={{color:themeData?.data?.colors.text_primary}}>Tem certeza de que deseja fazer logout?</AlertDialogTitle>
                    <AlertDialogDescription style={{color:themeData?.data?.colors.text_secondary}}>Sua sessão será encerrada agora!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel style={{backgroundColor: themeData?.data?.colors.color_primary, color:themeData?.data?.colors.text_primary}}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction style={{backgroundColor: themeData?.data?.colors.background_primary, color:themeData?.data?.colors.text_primary}} onClick={()=>{logout.mutate()}}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
          
        </div>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default HeaderBar;
