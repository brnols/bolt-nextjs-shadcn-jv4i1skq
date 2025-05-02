import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { formatStatus } from "@/utils/formatStatus";
import PurchaseDescription from "./PurchaseDescription";
import { Sheet } from "@/components/ui/sheet";
import type { ProductItem } from "@/types/productList";


export default function CardCarousel({ list, access, className="" }: { list: ProductItem, access: boolean, className?:string }) {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <div 
                onClick={() => {window.open(`/main/${list.product_id}`, '_blank')}}
                className={`${className} w-[320px] cursor-pointer !flex flex-col box-item !p-0 !rounded-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl`}
            >
                <img src={list.product.background_image} alt="img produto" className="object-cover aspect-[1/1] w-[320px] rounded-t-lg" />
                <div className="flex flex-col gap-2 px-4 py-2">
                    <p className="text-sm text-gray-400">{list.product.category}</p>
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <p className="text-md font-semibold leading-tight">
                                {list.product.name.length > 40 ? `${list.product.name.slice(0, 40)}...` : list.product.name}
                            </p>
                        </div>
                        <div className=" flex justify-end w-auto">
                            {formatStatus(list.product.status)}
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                        <Button 
                            variant={"outline"} 
                            className="text-sm font-normal w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(!open)
                            }}
                        >
                            Detalhes
                        </Button>
                        {access && (
                            <Button
                                disabled={list.product.status !== "active"}
                                className="text-sm font-normal"
                                onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/main/${list.product_id}`, '_blank')
                            }}
                            >
                                Acessar 
                                <ArrowUpRight size={20} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <PurchaseDescription product={list}/>
        </Sheet>
    );
}