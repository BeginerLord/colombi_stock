import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  SaveOutStockMovement } from "../../services/stockMovement";

export const UseCreateStockOut = () => {
  const queryClient = useQueryClient();

  const { mutate: CreateStockOut, isPending } = useMutation({
    mutationFn: SaveOutStockMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock_movement"] });
    },
  });

  return{CreateStockOut,isPending};
};
