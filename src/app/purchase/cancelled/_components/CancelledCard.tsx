import { formatStatus } from "@/utils/formatStatus";
import { useState } from "react";
import CancelledDescription from "./CancelledDescription";
import { Sheet } from "@/components/ui/sheet";
import type { ProductItemCancelled } from "@/types/productList";


export default function CancelledCard({ list, className="" }: { list: ProductItemCancelled, className?:string }) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <button 
                type="button"
                onClick={()=>{setOpen(!open)}}
                className={`${className} !z-0 cursor-pointer w-[320px] !flex flex-col box-item !p-0 !rounded-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl`}
            >
                <img src={list.product_image} alt="img produto" className="bg-red-500 object-cover aspect-[1/1] w-[320px] rounded-t-lg  opacity-60" />  
                <div className="flex items-start w-[320px] flex-col gap-1 px-4 pt-2 pb-4">
                    <p className="text-sm text-gray-400">Curso online</p>
                    <p 
                        title={list.product_name}
                        className="text-md font-semibold leading-tight line-clamp-1 cursor-default"
                    >
                        {list.product_name}
                    </p>
                    {formatStatus("canceled")}
                </div>
            </button>
            <CancelledDescription product={list}/>
        </Sheet>
    );
}