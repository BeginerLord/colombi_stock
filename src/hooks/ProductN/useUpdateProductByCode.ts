import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductByCode } from "../../services/productN";
import { ProductModeltDto } from "../../models/productModel";

export const useUpdateProductByCode = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProductByCodeMutation,  isPending } = useMutation({
    mutationFn: ({
      code,
      product,
    }: {
      code: string;
      product: ProductModeltDto;
    }) => UpdateProductByCode(code, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProductByCodeMutation, isPending };
};