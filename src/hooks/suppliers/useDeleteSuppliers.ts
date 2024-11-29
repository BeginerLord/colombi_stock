import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSuppliersByDni } from "../../services/suppliers";

export const UseDeleteSuppliers = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: DeleteSuppliersMutation } = useMutation({
    mutationFn: DeleteSuppliersByDni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });

  return { DeleteSuppliersMutation, isPending };
};
