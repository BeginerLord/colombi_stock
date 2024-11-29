import { useQuery } from "@tanstack/react-query";
import { GetProductByCode } from "../../services/productN";

export const useGetProductByCode = (code: string) => {
    const { data: product, isLoading } = useQuery({
      queryKey: ["product", code],
      queryFn: () => GetProductByCode(code),
      enabled: !!code,
    });
  
    return { product, isLoading };
  };