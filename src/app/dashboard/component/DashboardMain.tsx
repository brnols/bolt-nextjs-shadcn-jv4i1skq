"use client";
import { useState } from "react";
import ShoppingCarousel from "./ShoppingCarousel";
import ProductsListServices from "@/services/ProductsList";
import type { ProductDataResponse } from "@/types/productList";

export default function DashboardMain() {

    // Get Products
    const [payload] = useState<{skip:string, limit:string}>({ skip: "0", limit: "10" });
    const { data: listCourses,  } = ProductsListServices.getProductsList(payload);

    return (
        <div 
            data-testid="dashboard-main"
            className="max-w-[1300px] w-full !m-0 pl-2 flex flex-col gap-8 ">
            <div className="mt-8 mb-[50px]">
                <p>Aqui você encontra tudo que precisa e tem 
                    <span className="font-semibold text-md"> acesso às suas compras.</span>
                </p>
            </div>
            {listCourses && (
                <ShoppingCarousel list={listCourses as ProductDataResponse} />
            )}
        </div>
    );
}