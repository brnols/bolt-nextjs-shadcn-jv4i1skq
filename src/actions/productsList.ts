"use server";

import api from "@/lib/axiosInstances";
import type { ProductDataResponse, ProductInfo, ProductListCancelled } from "@/types/productList";

export const fetchProductList = async (params: {skip: string, limit: string, status?:string}) => {
    const response = await api.get<ProductDataResponse>(`/api/v1/clients/get_products?skip=${params.skip}&limit=${params.limit}${params.status? `&status=${params.status}`: ""}`);
    return response.data;
};

export const getProductListCancelled = async (params: {start_date:string, end_date:string, skip: string, limit: string, status?:string, product_name?:string, refund_status?:string}) => {
    const response = await api.get<ProductListCancelled>(`/api/v1/clients/history/refund?start_date=${params.start_date}&end_date=${params.end_date}&skip=${params.skip}&limit=${params.limit}${params.status ? `&status=${params.status}` : ""}${params.product_name ? `&product_name=${params.product_name}` : ""}${params.refund_status ? `&refund_status=${params.refund_status}` : ""}`);
    return response.data;
};

export const getProductInfo = async (uuid:string) => {
    const response = await api.get<ProductInfo>(`/api/v1/clients/item-info/${uuid}`);
    return response.data;
};