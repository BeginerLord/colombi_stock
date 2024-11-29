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

export const GetProductByCodeLowStock = async (code: string): Promise<ProductCosts> => {
  const { data } = await scheduleApi.get(`/products/low-stock/${code}`);
  return data as ProductCosts;
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
  product: ProductModel
) => {
  const { data } = await scheduleApi.put(`/products/${code}`, product);

  return data as ProductModel;
};
