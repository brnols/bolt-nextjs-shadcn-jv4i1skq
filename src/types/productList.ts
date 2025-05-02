export type ProductDataResponse = {
    products: ProductItem[];
};

export type ProductItem = {
    id: number;
    product_id: string;
    order_id: string;
    created_at: string;
    updated_at: string;
    product: ProductDetails;
    recurrence_pending: boolean;
};

export type ProductDetails = {
    uuid: string;
    name: string;
    price: number;
    description: string;
    background_image: string;
    status: string;
    currency: string;
    support_name: string;
    support_email: string;
    phone: string;
    category: string;
    language: string;
    recurrence: boolean;
    refund_deadline: string;
};

export type ProductItemCancelled = {
    id: number;
    product_id: string;
    order_id: string;
    price: number;
    status: "active" | "inactive";
    refund_status: "pending" | "paid" | "failed" | null;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    product_name: string;
    product_image: string;
    reason: string | null;
    feedback: string | null;
    transaction_id: string | null;
    order_uuid: string;
};

export type ProductListCancelled = {
    items: ProductItemCancelled[];
    total: number;
    page: number;
    pages: number;
    size: number;
};

export type ProductInfo = {
    amount: number;
    name: string;
    product_owner: string;
    product_owner_email: string;
    payment_method: string; 
    product_image: string;
    product_tag: string;
    currency: string;
    category: string;
    refund_status: string | null;
    refund_deadline: string;
    created_at: string;
};
