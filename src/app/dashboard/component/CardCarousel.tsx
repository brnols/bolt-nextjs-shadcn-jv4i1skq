import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import CardDescription from "./CardDescription";
import { useState } from "react";
import { formatStatus } from "@/utils/formatStatus";
import type { ProductItem } from "@/types/productList";


export default function CardCarousel({ list, access, className="" }: { list: ProductItem, access: boolean, className?:string }) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (value:boolean) => {
        setOpen(value)
    }
    return (
        <div className={`${className} w-[320px] !flex flex-col box-item !p-0 !rounded-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl`}>
            <img src={list.product.background_image} alt="img produto" className="object-cover aspect-[1/1] w-[320px] rounded-t-lg" />
            <div className="flex flex-col gap-2 px-4 py-2">
                <p className="text-sm text-gray-400">{list.product.category}</p>
                <div className="w-full flex flex justify-between items-center">
                    <div className="h-[40px]">
                        <p 
                            title={list.product.name}
                            className="cursor-default text-md font-semibold leading-tight line-clamp-2"
                        >
                            {list.product.name}
                        </p>
                    </div>
                    <div className="h-[40px] flex justify-end items-center w-auto">
                        {formatStatus(list.product.status)}
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button 
                        variant={"outline"} 
                        className="text-sm font-normal w-full"
                        onClick={() => {setOpen(!open)}}
                    >
                        Detalhes
                    </Button>
                    {access && (
                        <Button
                            disabled={list.product.status !== "active"}
                            className="text-sm font-normal"
                            onClick={() => {window.open(`/main/${list.product_id}`, '_blank')}}
                        >
                            Acessar 
                            <ArrowUpRight size={20} />
                        </Button>
                    )}
                </div>
            </div>
            <CardDescription list={list} open={open} close={handleClose} />
        </div>
    );
}