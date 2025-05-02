export const API_URL = "https://clients.paycentral.com.br";

export function LOGIN_POST() {
    return {
        url: `${API_URL}/api/v1/auth/login`
    };
}

export function LOGOUT_POST() {
    return {
        url: `${API_URL}/api/v1/auth/logout`,
    };
}

export function REFRESH_POST() {
    return {
        url: `${API_URL}/api/v1/auth/refresh`
    };
}
export function THEME_GET(id:string) {
    return {
        url: `${API_URL}/api/v1/products/theme/${id}`,
    };
}
export function MODULOS_GET(id:string) {
    return {
        url: `${API_URL}/api/v1/modulos/product/${id}`,
    };
}

export function MODULO_GET(id:string) {
    return {
        url: `${API_URL}/api/v1/modulos/${id}`,
    };
}

export function USER_POST() {
    return {
        url: `${API_URL}/api/v1/clients/get-me`,
    };
}

export function PRODUCT_GET(id:string) {
    return {
        url: `${API_URL}/api/v1/products/${id}`,
    };
}

// export function GET_PRODUCTS(params: {skip: string, limit: string}) {
//     return {
//         url: `${API_URL}`,
//     };
// }