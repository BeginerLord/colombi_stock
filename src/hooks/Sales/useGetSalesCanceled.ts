import { useQuery } from "@tanstack/react-query";
import { GetSalesCanceled } from "../../services/Sales";

export const useGetSalesCanceled = () => {
    const { data: salesCanceled, isLoading } = useQuery({
      queryKey: ["salesCanceled"],
      queryFn: GetSalesCanceled,
    });
  
    return { salesCanceled, isLoading };
  };