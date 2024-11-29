import { scheduleApi } from "../../api"
import { PaginatedResponse } from "../../models";
import { CategoryProductCount, ProductCosts } from "../../models/productModel";


export const DeleteProductByCode = async (code: string)=>{

    const {data} = await scheduleApi.delete(`/products/${code}`);
    return data;
}

export const GetProductByCode = async (code: string): Promise<ProductCosts> => {
    const { data } = await scheduleApi.get(`/products/low-stock/${code}`);
    return data as ProductCosts;
};

export const FindProductsByPriceBetween = async ()=>{

    const {data} = await scheduleApi.get("/products/findProductsByPriceBetween");

    return data as PaginatedResponse<ProductCosts>;
}

export const CountProductsByCategory = async (): Promise<CategoryProductCount[]> => {
    const { data } = await scheduleApi.get("/products/countProductsByCategory");
    return data as CategoryProductCount[];
};