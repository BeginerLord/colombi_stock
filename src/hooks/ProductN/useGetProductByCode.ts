import { useQuery } from "@tanstack/react-query";
import { GetProductByCode } from "../../services/productN";

export const UseFindProductByCode = () => {
  const { data: productByCode, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => GetProductByCode,
  });

  return { productByCode, isLoading };
};
