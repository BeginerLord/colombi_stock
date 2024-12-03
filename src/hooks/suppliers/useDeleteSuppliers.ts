import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSuppliersByDni } from "../../services/suppliers";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";

export const UseDeleteSuppliers = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: DeleteSuppliersMutation } = useMutation({
    mutationFn: DeleteSuppliersByDni,

    onSuccess: () => {
      // Invalidar las consultas de proveedores para que los datos se actualicen
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });

      // Mostrar mensaje de éxito cuando se elimine correctamente
      toast.success("Proveedor eliminado exitosamente.");
    },

    onError: (error) => {
      // Manejo del error utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { DeleteSuppliersMutation, isPending };
};
