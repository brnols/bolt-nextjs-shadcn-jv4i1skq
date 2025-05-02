"use client";
import PurchaseCard from "./PurchaseCard";
import { useState } from "react";
import ProductsListServices from "@/services/ProductsList";


export default function PurchaseMain() {

    // Get Products
    const [payload] = useState<{skip:string, limit:string}>({ skip: "0", limit: "10" });
    const { data: listCourses,  } = ProductsListServices.getProductsList(payload);

    return (
        <div className="max-w-[1300px] w-full !m-0 flex flex-col gap-8 !pt-12">
            <p className="text-[28px] pl-4 xl:!pl-0  font-semibold">
                Minhas compras
            </p>

            {/* Hub de busca/filtrar/select - ainda nao temos isso no endpoint*/}
            {/* <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Input placeholder="Buscar comprar" className="w-[250px]"/>
                        <Button variant={"outline"} className="text-primary">
                            <ListFilter size={20} />
                            Filtrar
                        </Button>
                    </div>
                    <div>
                        <Select defaultValue="1" >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Mais recentes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Mais recente</SelectItem>
                                <SelectItem value="2">Mais antigos</SelectItem>
                                <SelectItem value="3">Ordem Alfabética (A-Z)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-col-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                {listCourses?.products && listCourses.products.length > 0 ? (
                    listCourses.products.map((course) => (
                        <PurchaseCard 
                            list={course} 
                            access={course.product.status === "active"} 
                            key={course.product.name}
                        />
                    ))
                ) : (
                    <p className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-8 text-gray-500">Nenhum curso encontrado.</p>
                )}
            </div>
        </div>
    );
}
