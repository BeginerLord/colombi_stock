import { useQuery } from "@tanstack/react-query";
import { FindProductsByPriceBetween } from "../../services/productN";
import { PaginatedResponse } from "../../models";
import { ProductCosts } from "../../models/productModel";


export const useFindProductsByPriceBetween = () => {
  const { data: products, isLoading } = useQuery<PaginatedResponse<ProductCosts>>({
    queryKey: ["productsByPrice"],
    queryFn: FindProductsByPriceBetween,
  });

  return { products, isLoading };
};