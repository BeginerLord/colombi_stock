import { useQuery } from "@tanstack/react-query";
import { GetStockMovementsForTransation } from "../../services/StockN";

export const useGetAllStockMovements = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "updateDate",
  direction: string = "asc",
  status: "ACTIVE",
  movementType: "STOCK_IN" | "STOCK_OUT"
) => {
  const { data: stockMovements, isLoading } = useQuery({
    queryKey: [
      "stockMovements",
      page,
      size,
      sortBy,
      direction,
      status,
      movementType,
    ],
    queryFn: () =>
      GetStockMovementsForTransation(
        page,
        size,
        sortBy,
        direction,
        status,
        movementType
      ),
  });

  return { stockMovements, isLoading };
};
