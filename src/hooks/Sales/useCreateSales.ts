import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSales } from "../../services/Sales";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useCreateSales = () => {
  const queryClient = useQueryClient();

  const { mutate: createSalesMutation, isPending } = useMutation({
    mutationFn: CreateSales,

    onSuccess: () => {
      // Invalidar la caché de las ventas y mostrar el mensaje de éxito
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      toast.success("Venta creada exitosamente!");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { createSalesMutation, isPending };
};
