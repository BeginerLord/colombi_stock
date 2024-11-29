import { useQuery } from "@tanstack/react-query";
import { GetStockMovements } from "../../services/StockN";
import { PaginatedResponse } from "../../models";
import { StockMovementModelDto } from "../../models/stockMoventN";

export const useGetStockMovements = () => {
    const { data: stockMovements, isLoading } = useQuery<PaginatedResponse<StockMovementModelDto>>({
      queryKey: ["stockMovements"],
      queryFn: GetStockMovements,
    });
  
    return { stockMovements, isLoading };
  };