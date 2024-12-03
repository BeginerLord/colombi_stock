import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "../../services/productN";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createProductMutation, isPending } = useMutation({
    mutationFn: CreateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado correctamente.");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { createProductMutation, isPending };
};
