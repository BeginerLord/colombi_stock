import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveSuppliers } from "../../services/suppliers";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";
 
export const UseCreateSuppliers = () => {
  const queryClient = useQueryClient();

  const { mutate: CreateSuppliersMutation, isPending } = useMutation({
    mutationFn: SaveSuppliers,

    onSuccess: () => {
      // Invalidar las consultas de proveedores para asegurarse de que los datos se actualicen
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });

      // Mostrar un mensaje de éxito cuando el proveedor se cree correctamente
      toast.success("Proveedor creado exitosamente.");
    },

    onError: (error) => {
      // Manejo de errores utilizando getErrorMessage
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  return { CreateSuppliersMutation, isPending };
};
