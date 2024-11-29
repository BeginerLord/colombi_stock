import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSales } from "../../services/Sales";

export const useDeleteSales = () => {
    const queryClient = useQueryClient();
  
    const { mutate: deleteSalesMutation, isPending } = useMutation({
      mutationFn: DeleteSales,
  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sales"] });
      },
    });
  
    return { deleteSalesMutation, isPending };
  };