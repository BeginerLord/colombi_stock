import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategoryByCode } from "../../services/Category";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutation, isLoading } = useMutation({
    mutationFn: DeleteCategoryByCode,

    onSuccess: () => {
      // Invalidar la caché de categorías tras una eliminación exitosa
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("¡Categoría eliminada exitosamente!");
    },

    onError: (error) => {
      // Obtener el mensaje de error utilizando `getErrorMessage`
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { deleteCategoryMutation, isLoading };
};
