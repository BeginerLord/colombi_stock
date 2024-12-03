import { useQuery } from "@tanstack/react-query";
import { GetProductByCodeLowStock } from "../../services/productN";

export const UseGetProductByCodeLowStock = () => {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    refetchInterval: 3000,
    queryFn: () => GetProductByCodeLowStock(),
  });

  return { product, isLoading };
};
