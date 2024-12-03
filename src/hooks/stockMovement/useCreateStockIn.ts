import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveInStockMovement } from "../../services/stockMovement";

export const UseCreateStockIn = () => {
  const queryClient = useQueryClient();

  const  { mutate:createStockInMutation, isPending } = useMutation({
    mutationFn: SaveInStockMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock_movement"] });
    },
  });

  return{createStockInMutation,isPending};
};
