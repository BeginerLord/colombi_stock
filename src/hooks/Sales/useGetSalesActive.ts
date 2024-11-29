import { useQuery } from "@tanstack/react-query";
import { GetSalesActive } from "../../services/Sales";

export const useGetSalesActive = () => {
    const { data: salesActive, isLoading } = useQuery({
      queryKey: ["salesActive"],
      queryFn: GetSalesActive,
    });
  
    return { salesActive, isLoading };
  };
