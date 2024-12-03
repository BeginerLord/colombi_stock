import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuppliersModel } from "../../models/suppliersModel";
import { UpdateSuppliersByDni } from "../../services/suppliers";

export const useUpdateSuppliersByDni = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSuppliersByDniMutation, isLoading: isPending } = useMutation({
    mutationFn: ({
      dni,
      suppliers,
    }: {
      dni: string;
      suppliers: SuppliersModel;
    }) => UpdateSuppliersByDni(dni, suppliers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });

  return { updateSuppliersByDniMutation, isPending };
};