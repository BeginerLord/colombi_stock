import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateStockMovement } from "../../services/stockMovement";
import { StockMovement } from "../../models/stockMovement";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";

export const useUpdateStockMovement = () => {
  const queryClient = useQueryClient();

  const { mutate: updateStockMovementMutation, isPending } = useMutation({
    mutationFn: ({
      stockMovement,
      code,
    }: {
      stockMovement: StockMovement;
      code: string;
    }) => UpdateStockMovement(stockMovement, code),

    onSuccess: () => {
      // Invalidar la caché y mostrar un mensaje de éxito
      queryClient.invalidateQueries({ queryKey: ["stock_movement"] });
      toast.success("Movimiento de stock actualizado exitosamente!");
    },

    onError: (error) => {
      // Manejo de errores utilizando getErrorMessage y mostrar mensaje de error
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { updateStockMovementMutation, isPending };
};
