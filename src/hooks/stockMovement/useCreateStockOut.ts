import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveOutStockMovement } from "../../services/stockMovement";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useCreateStockOut = () => {
  const queryClient = useQueryClient();

  const { mutate: createStockOut, isPending } = useMutation({
    mutationFn: SaveOutStockMovement,

    onSuccess: () => {
      // Invalidar la caché de movimientos de stock y mostrar mensaje de éxito
      queryClient.invalidateQueries({ queryKey: ["stock_movement"] });
      toast.success("Movimiento de salida de stock registrado exitosamente!");
    },

    onError: (error) => {
      // Manejo de errores utilizando getErrorMessage y mostrar mensaje de error
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { createStockOut, isPending };
};
