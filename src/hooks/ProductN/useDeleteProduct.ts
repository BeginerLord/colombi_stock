import { useMutation, useQueryClient } from "@tanstack/react-query";
 import { DeleteProductByCode } from "../../services/productN";

export const UseDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: DeleteProductMutation } = useMutation({
    mutationFn: DeleteProductByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { DeleteProductMutation, isPending };
};
