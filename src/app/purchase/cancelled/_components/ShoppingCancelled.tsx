"use client"
import { ShoppingCart } from "lucide-react";
import CancelledCard from "./CancelledCard";
import type { ProductListCancelled } from "@/types/productList";

export default function ShoppingCancelled({list}: { list: ProductListCancelled }) {
    
    return (
        <>
            {!list || list.items.length < 1 ? (
                <div className="flex flex-col gap-4 items-center ">
                    <div className="flex justify-center items-center w-[200px] h-[200px] bg-gray-100 rounded-full">
                        <ShoppingCart size={100} className="text-primary"/>
                    </div>
                    <p className="text-lg">Você não possui itens cancelados / reembolso</p>
                    <p className="text-sm">  Caso algum pedido seja cancelado ou entre em processo de reembolso,
                        <span className="font-semibold"> ele aparecerá aqui automaticamente</span>
                    </p>
                    {/* para quando tiver marketplace */}
                    {/* <Button>
                        Comprar um produto
                        <ArrowUpRight size={20}/>
                    </Button> */}
                </div>
            ):(
                <div className="grid grid-col-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                    {list.items.map((course) => (
                        <CancelledCard 
                            list={course} 
                            key={course.product_name}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
