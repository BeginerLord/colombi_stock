import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../../constant/utils";
import { GetAllCategories } from "../../services/Category";
import { toast } from "react-toastify";



export const useGetAllCategories = (page: number = 0, size: number = 10, sortBy: string = "name", direction: string = "asc") => {
  const { data: categories, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["categories", page, size, sortBy, direction],
    queryFn: () => GetAllCategories(page, size, sortBy, direction),
    onError: (err) => {
      toast.error(getErrorMessage(err)); // Muestra un mensaje de error al usuario
    },
    onSuccess: () => {
      toast.success("Categorías cargadas exitosamente");
    },
  });

  return { categories, isLoading, isSuccess, isError, error };
};