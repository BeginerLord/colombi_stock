import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuppliersModel } from "../../models/suppliersModel";
import { UpdateSuppliersByDni } from "../../services/suppliers";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";

export const useUpdateSuppliersByDni = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSuppliersByDniMutation, isLoading: isPending } =
    useMutation({
      mutationFn: ({
        dni,
        suppliers,
      }: {
        dni: string;
        suppliers: SuppliersModel;
      }) => UpdateSuppliersByDni(dni, suppliers),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });

        // Mostrar mensaje de éxito cuando el proveedor se actualice correctamente
        toast.success("Proveedor actualizado exitosamente.");
      },

      onError: (error) => {
        // Manejo del error utilizando getErrorMessage
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      },
    });

  return { updateSuppliersByDniMutation, isPending };
};
