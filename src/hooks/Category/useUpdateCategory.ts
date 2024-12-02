import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCategory } from "../../services/Category";
import { CreateCategoryModel } from "../../models/categoryModel";

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
    },
  });

  return { updateCategoryByCodeMutation, isPending };
};
