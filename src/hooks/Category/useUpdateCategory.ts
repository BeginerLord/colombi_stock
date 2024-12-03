import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCategory } from "../../services/Category";
import { CreateCategoryModel } from "../../models/categoryModel";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const useUpdateCategoryByCode = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCategoryByCodeMutation, isPending } = useMutation({
    mutationFn: ({
      code,
      category,
    }: {
      code: string;
      category: CreateCategoryModel;
    }) => UpdateCategory(code, category),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría actualizada correctamente.");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { updateCategoryByCodeMutation, isPending };
};
