"use client"
import ShoppingCancelled from "./ShoppingCancelled";
import { useState } from "react";
import ProductsListServices from "@/services/ProductsList";


export default function CancelledMain() {
  // Payload 
  const [payload] = useState({
    start_date: "2025-01-01",
    end_date: new Date(2025, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0],
    skip: "0", 
    limit: "100", 
    status: ""
  });
  
  // Get Products Cancelled/Refund
  const { data: listCourses,  } = ProductsListServices.getProductsListCancelled(payload);

  return (
    <div className="max-w-[1300px] w-full !m-0 pl-2 flex flex-col gap-8 !pt-12">
      <h1 className="text-3xl font-medium text-gray-800 mb-6">Compras canceladas/Reembolsos</h1>
      {listCourses && listCourses.items.length > 0 ? 
        ( 
          <ShoppingCancelled list={listCourses} />
        ):(
          null
        )
      }
    </div>
  );
}