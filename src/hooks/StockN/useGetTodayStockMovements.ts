import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../models";
import { StockMovementModelDto } from "../../models/stockMoventN";
import { GetTodayStockMovements } from "../../services/StockN";

export const useGetTodayStockMovements = () => {
    const { data: todayStockMovements, isLoading } = useQuery<PaginatedResponse<StockMovementModelDto>>({
      queryKey: ["todayStockMovements"],
      queryFn: GetTodayStockMovements,
    });
  
    return { todayStockMovements, isLoading };
  };