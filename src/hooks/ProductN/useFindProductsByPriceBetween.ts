import { useQuery } from "@tanstack/react-query";
import { FindProductsByPriceBetween } from "../../services/productN";
import { PaginatedResponse } from "../../models";
import { ProductCosts } from "../../models/productModel";

export const useFindProductsByPriceBetween = (minPrice: number, maxPrice: number) => {
  const { data: products, isLoading } = useQuery<PaginatedResponse<ProductCosts>>({
    queryKey: ["productsByPrice", minPrice, maxPrice],
    queryFn: () => FindProductsByPriceBetween(minPrice, maxPrice),
  });

  return { products, isLoading };
};