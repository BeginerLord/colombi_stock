import { scheduleApi } from "../../api";
import { PaginatedResponse } from "../../models";
import {
  CategoryProductCount,
  ProductModeltDto,
  ProductCosts,
  ProductModel,
} from "../../models/productModel";

export const DeleteProductByCode = async (code: string) => {
  const { data } = await scheduleApi.delete(`/products/${code}`);
  return data;
};

 

export const GetProductByCodeLowStock = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const url = `/products/search/low-stock?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<ProductModeltDto>;
};

export const FindProductsByPriceBetween = async () => {
  const { data } = await scheduleApi.get(
    "/products/findProductsByPriceBetween"
  );

  return data as PaginatedResponse<ProductCosts>;
};

export const CountProductsByCategory = async (): Promise<
  CategoryProductCount[]
> => {
  const { data } = await scheduleApi.get("/products/countProductsByCategory");
  return data as CategoryProductCount[];
};

export const GetProductByCode = async (code: string) => {
  const { data } = await scheduleApi.get(`/products/${code}`);
  return data as ProductModeltDto;
};

export const UpdateProductByCode = async (
  code: string,
  product: ProductModeltDto
) => {
  const { data } = await scheduleApi.put(`/products/${code}`, product);
  return data as ProductModeltDto;
};

export const GetAllProducts = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const url = `/products?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<ProductModeltDto>;
};

export const CreateProduct = async (product: ProductModel) => {
  const { data } = await scheduleApi.post("/products", product);
  return data as ProductModel;
};
 