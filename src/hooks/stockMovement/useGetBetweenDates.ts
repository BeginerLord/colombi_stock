import { useQuery } from "@tanstack/react-query";

import { PaginatedResponse } from "../../models";
import { StockMovementModelDto } from "../../models/stockMoventN";
import { GetStockMovementsByDateRange } from "../../services/stockMovement";


export const useGetStockMovementsByDateRange = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "movementDate",
  direction: string = "asc",
  statusEntity: 'ACTIVE' | 'INACTIVE',
  startDate: string,
  endDate: string
) => {
  const { data: stockMovements, isLoading } = useQuery<PaginatedResponse<StockMovementModelDto>>({
    queryKey: ["stockMovementsByDateRange", page, size, sortBy, direction, statusEntity, startDate, endDate],
    queryFn: () => GetStockMovementsByDateRange(page, size, sortBy, direction, statusEntity, startDate, endDate),
  });

  return { stockMovements, isLoading };
};