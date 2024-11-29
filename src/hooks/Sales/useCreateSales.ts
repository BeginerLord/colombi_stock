import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSales } from "../../services/Sales";

export const useCreateSales = () => {
    const queryClient = useQueryClient();
  
    const { mutate: createSalesMutation, isPending } = useMutation({
      mutationFn: CreateSales,
  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sales"] });
      },
    });
  
    return { createSalesMutation, isPending };
  };