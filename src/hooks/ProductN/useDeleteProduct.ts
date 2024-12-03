import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProductByCode } from "../../services/productN";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const UseDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: DeleteProductMutation } = useMutation({
    mutationFn: DeleteProductByCode,
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto eliminado correctamente.");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { DeleteProductMutation, isPending };
};
