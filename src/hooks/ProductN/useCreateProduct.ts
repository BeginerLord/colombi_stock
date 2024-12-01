import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "../../services/productN";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createProductMutation, isPending } = useMutation({
    mutationFn: CreateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProductMutation, isPending };
};

