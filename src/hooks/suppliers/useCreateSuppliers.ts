import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveSuppliers } from "../../services/suppliers";

export const UseCreateSuppliers = () => {
  const queryClient = useQueryClient();

  const { mutate: CreateSuppliersMutatuin, isPending } = useMutation({
    mutationFn: SaveSuppliers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });

  return { CreateSuppliersMutatuin, isPending };
};
