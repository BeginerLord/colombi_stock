import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateStockMovement } from "../../services/stockMovement";
import { StockMovement } from "../../models/stockMovement";

export const UseUpdatStockMovement = () => {
  const queryClient = useQueryClient();

  const { mutate: UpdateStockMovementMutation, isPending } = useMutation({
    mutationFn: ({
      stockMovement,
      code,
    }: {
      stockMovement: StockMovement;
      code: string;
    }) => UpdateStockMovement(stockMovement, code),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock_movement"] });
    },
  });
  return { UpdateStockMovementMutation, isPending };
};
