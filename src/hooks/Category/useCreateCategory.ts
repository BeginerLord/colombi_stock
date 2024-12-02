import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "../../services/Category";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: createCategoryMutation, isPending } = useMutation({
    mutationFn: CreateCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategoryMutation, isPending };
};
