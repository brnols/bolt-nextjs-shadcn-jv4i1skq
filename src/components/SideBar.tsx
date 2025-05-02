"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { House, ShoppingCart, ChartLine, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, createContext, useState, type ReactNode, useRef, useEffect } from "react";

type SidebarContextType = {
    expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarItemProps = {
    icon?: ReactNode;
    text?: string;
    href?: string;
    alert?: boolean;
    disabled?: boolean;
    content?: ReactNode;
    hoverContent?: ReactNode;
};
 

const paths = [
    "/",
    "/login",
    "/esqueceu-senha",
];

export default function SideBar({ children }: React.PropsWithChildren) {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();
    const asideRef = useRef<HTMLElement | null>(null);


    useClickOutside(asideRef, () => setExpanded(false));
    
    useEffect(() => {
        setExpanded(false);
    }, []);

    if (paths.includes(pathname)) return children;
        return (
            <div data-testid="sidebar" className="grid grid-cols-[auto_1fr] max-[760px]:grid-cols-1 !overflow-hidden">
                <aside
                    ref={asideRef}
                    className={`h-full bg-[#1f1f21] max-[760px]:fixed max-[760px]:top-0 max-[760px]:left-0 max-[760px]:z-10 transition-all duration-300 ease-in-out ${
                        expanded
                            ? "w-[300px] max-[760px]:w-[280px] max-[760px]:translate-x-0"
                            : "w-[70px] max-[760px]:w-[280px] max-[760px]:translate-x-[-100%]"
                    }`}
                >
                    <nav className="h-full flex flex-col border-r shadow-sm">
                        <div className={"p-4 pt-4 pb-2 flex gap-4 items-center"}>
                            <div className="cursor-pointer max-[760px]:hidden text-slate-50 rounded-lg">
                                <button
                                    type="button"
                                    className="flex justify-center items-center w-9 h-10 text-primary"
                                    onClick={() => setExpanded((curr) => !curr)}
                                >
                                    <Menu />
                                </button>
                            </div>
                        </div>

                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 px-3">
                                <SidebarItem
                                    icon={<House size={20} />}
                                    text={"Início"}
                                    href="/dashboard"
                                />
                                <SidebarItem
                                    icon={<ShoppingCart size={20} />}
                                    text={"Minhas compras"}
                                    href="/purchase"
                                />
                                <SidebarItem
                                    icon={
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fal"
                                            data-icon="cart-xmark"
                                            className="w-[20px] h-[20px] svg-inline--fa fa-cart-xmark"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M0 16C0 7.2 7.2 0 16 0H53.9c22.8 0 42.5 16 47 38.4L145.4 256H466.5c14.7 0 27.5-10 31-24.2L544.5 44.1c2.1-8.6 10.8-13.8 19.4-11.6s13.8 10.8 11.6 19.4L528.6 239.5C521.5 268 495.9 288 466.5 288H152l7.9 38.4c3 14.9 16.1 25.6 31.4 25.6H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H191.2c-30.4 0-56.6-21.4-62.7-51.2L69.6 44.8C68 37.3 61.5 32 53.9 32H16C7.2 32 0 24.8 0 16zM192 480a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-80a56 56 0 1 1 0 112 56 56 0 1 1 0-112zm280 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm-80 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM379.3 91.3L342.6 128l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L320 150.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L297.4 128 260.7 91.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L320 105.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                            />
                                        </svg>
                                    }
                                    text={"Canceladas/Reembolsos"}
                                    href="/purchase/cancelled"
                                />
                                <SidebarItem
                                    icon={<ChartLine size={20} />}
                                    text={"Gerenciar meu negócio"}
                                    href="https://paycentral.com.br/dashboard"
                                />
                            </ul>
                        </SidebarContext.Provider>
                    </nav>
                </aside>
                <div className="transition-all duration-300 ease-in-out h-[calc(100vh-50px)] overflow-y-auto ">
                    <div
                        className={`max-[760px]:flex hidden fixed top-2 left-4 w-10 h-10 items-center justify-center bg-primary text-slate-50 duration-300 ease-in-out z-10 rounded-lg shadow-lg ${
                            expanded ? "translate-x-[280px]" : "translate-x-0"
                        }`}
                    >
                        {expanded ? (
                                <button
                                    type="button"
                                    className="flex gap-2"
                                    onClick={() => setExpanded((curr) => !curr)}
                                >
                                    <img
                                        src="/img/01.png"
                                        alt="logo pay_central"
                                        className="h-[30px]"
                                    />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setExpanded((curr) => !curr)}
                                >
                                    <img
                                        src="/img/01.png"
                                        alt="logo pay_central"
                                        className="h-[30px]"
                                    />
                                </button>
                            )}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
}

export function SidebarItem({ icon, text, href, alert, disabled = false, content, hoverContent}: SidebarItemProps) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }

    const { expanded } = context;
    const { push } = useRouter();
    const pathname = usePathname();
    const isActive = pathname === href;

    if (disabled) return content;
        return (
                <li
                    onClick={() => {if (href) push(href)}}
                    onKeyUp={(e) => {if ((e.key === 'Enter' || e.key === ' ') && href) {push(href)}}}
                    className={`
                        relative flex items-center py-2 px-3 my-1
                        font-medium text-md rounded-md cursor-pointer
                        transition-colors group
                        ${isActive ? "text-zinc-50 bg-primary": "hover:bg-zinc-900 text-gray-500"}
                    `}
                >
                {icon}
                <span
                    className={`
                    overflow-hidden transition-all whitespace-nowrap text-ellipsis
                    ${expanded ? "w-52 ml-3" : "w-0"}
                `}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                            expanded ? "" : "top-2"
                        }`}
                    />
                )}

                {!expanded && !hoverContent && (
                    <div
                        className={`
                        max-[760px]:hidden absolute left-full rounded-md px-2 py-1 ml-6
                        bg-zinc-900 text-zinc-200 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        whitespace-nowrap z-10
                    `}
                    >
                        {text}
                    </div>
                )}
                {!expanded && hoverContent && (
                    <div
                        className="
                        max-[760px]:hidden absolute left-full bottom-100px rounded-md px-2 py-1 ml-6
                        bg-zinc-900 text-zinc-200 text-sm
                        invisible opacity-20 -translate-x-3 transition-all delay-500
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-0
                        whitespace-nowrap z-10"
                    >
                        {hoverContent}
                    </div>
                )}
            </li>
        );
}
