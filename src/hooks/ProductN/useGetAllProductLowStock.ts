import { useQuery } from "@tanstack/react-query";
import { GetAllProductsLowStock } from "../../services/productN";

export const UseGetAllProductLowStock = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["productsLow", page, size, sortBy, direction],
    queryFn: () => GetAllProductsLowStock(page, size, sortBy, direction),
  });

  return { products, isLoading };
};