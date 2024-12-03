import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductByCode } from "../../services/productN";
import { ProductModeltDto } from "../../models/productModel";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useUpdateProductByCode = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProductByCodeMutation, isPending } = useMutation({
    mutationFn: ({
      code,
      product,
    }: {
      code: string;
      product: ProductModeltDto;
    }) => UpdateProductByCode(code, product),

    onSuccess: () => {
      // Invalidar las consultas de productos para asegurarse de que los datos se actualicen
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Mostrar un mensaje de éxito cuando el producto se actualice correctamente
      toast.success("Producto actualizado exitosamente.");
    },

    onError: (error) => {
      // Manejo de errores utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { updateProductByCodeMutation, isPending };
};
