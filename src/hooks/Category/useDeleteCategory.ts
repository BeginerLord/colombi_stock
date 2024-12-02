import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategoryByCode } from "../../services/Category";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutation, isPending } = useMutation({
    mutationFn: DeleteCategoryByCode,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { deleteCategoryMutation, isPending };
};