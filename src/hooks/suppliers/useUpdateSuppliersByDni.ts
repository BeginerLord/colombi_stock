import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuppliersModel } from "../../models/suppliersModel";
import { UpdateSuppliersByDni } from "../../services/suppliers";

export const useUpdateSuppliersByDni = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSuppliersByDniMutation, isPending } = useMutation({
    mutationFn: ({
      dni,
      suppliers,
    }: {
      dni: string;
      suppliers: SuppliersModel;
    }) => UpdateSuppliersByDni(dni, suppliers), // Asegúrate de que la función acepte estos parámetros
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] }); // Inválida la cache relacionada con 'suppliers'
    },
  });

  return { updateSuppliersByDniMutation, isPending };
};
