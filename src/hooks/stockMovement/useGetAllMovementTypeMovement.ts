import { useQuery } from "@tanstack/react-query";
import { GetAllStockMovements } from "../../services/stockMovement";


export const useGetAllStockMovements = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "movementDate",
  direction: string = "asc",
  status: 'ACTIVE' | 'INACTIVE',
  movementType: 'STOCK_IN' | 'STOCK_OUT'
) => {
  const { data: stockMovements, isLoading } = useQuery({
    queryKey: ["stockMovements", page, size, sortBy, direction, status, movementType],
    queryFn: () => GetAllStockMovements(page, size, sortBy, direction, status, movementType),
  });

  return { stockMovements, isLoading };
};