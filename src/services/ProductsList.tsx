import { fetchProductList, getProductInfo, getProductListCancelled } from "@/actions/productsList";
import { useMutation, useQuery } from "@tanstack/react-query";


const ProductsListServices = {
    getProductsList: (payload:{ skip: string, limit: string }) => {
        return useQuery({
            queryKey: ["productsList"],
            queryFn: async () => fetchProductList(payload),
        });
    },
    getProductsListCancelled: (payload:{start_date:string, end_date:string, skip: string, limit: string, status?:string, product_name?:string, refund_status?:string}) => {
        return useQuery({
            queryKey: ["productsListCancelled"],
            queryFn: async () => getProductListCancelled(payload),
        });
    },
    getProductInfo: (uuid:string) => {
        return useMutation({
            mutationKey: ["ProductInfo", uuid],
            mutationFn: async () => getProductInfo(uuid),
        });
    },
};

export default ProductsListServices;