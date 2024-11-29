import { useQuery } from "@tanstack/react-query";
import { GetProductByCodeLowStock } from "../../services/productN";

export const UseGetProductByCodeLowStock = (code: string) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", code],
    queryFn: () => GetProductByCodeLowStock(code),
    enabled: !!code,
  });

  return { product, isLoading };
};
