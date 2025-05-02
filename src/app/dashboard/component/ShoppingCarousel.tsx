"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ShoppingCart } from "lucide-react";
import CardCarousel from "./CardCarousel";
import type { ProductDataResponse } from "@/types/productList";

export default function ShoppingCarousel({list}: { list: ProductDataResponse }) {
    return (
        <>
            {!list?.products || list.products.length < 1 ? (
                <div className="flex flex-col gap-4 items-center ">
                    <div className="flex justify-center items-center w-[200px] h-[200px] bg-gray-100 rounded-full">
                        <ShoppingCart size={100} className="text-primary"/>
                    </div>
                    <p className="text-lg">Suas compras vão aparecer aqui</p>
                    <p className="text-sm">Acesse o Marketplace, encontre os produtos que você procura e
                        <span className="font-semibold"> faça sua primeira compra</span>
                    </p>
                    <Button>
                        Comprar um produto
                        <ArrowUpRight size={20}/>
                    </Button>
                </div>
            ):(
                <div className="h-auto bg--200">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold ">Minhas compras</p>
                        <div className="flex items-center gap-2 text-primary">
                            <a href="/purchase" className="cursor-pointer">Mostrar todas</a>
                            <ArrowRight size={20}/>
                        </div>
                    </div>
                    <div className="grid grid-col-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                        {[...list.products]
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .slice(0, 4)
                            .map((course) => (
                                <CardCarousel 
                                    list={course} 
                                    access={course.product.status === "active"} 
                                    key={course.product.name}
                                />
                            ))}
                    </div>
                </div>    
            )}
        </>
    );
}
