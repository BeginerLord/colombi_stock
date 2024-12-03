import { useQuery } from "@tanstack/react-query";
import { GetProductByCode } from "../../services/productN";

export const UseFindProductByCode = (code: string) => {
  const { data: productByCode, isLoading } = useQuery({
    queryKey: ["product",code],
    queryFn: () => GetProductByCode(code),
  });

  return { productByCode, isLoading };
};
