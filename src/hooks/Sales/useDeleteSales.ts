import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSales } from "../../services/Sales";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useDeleteSales = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSalesMutation, isPending } = useMutation({
    mutationFn: DeleteSales,

    onSuccess: () => {
      // Invalidar la caché de las ventas y mostrar el mensaje de éxito
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      toast.success("Venta eliminada exitosamente!");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { deleteSalesMutation, isPending };
};
