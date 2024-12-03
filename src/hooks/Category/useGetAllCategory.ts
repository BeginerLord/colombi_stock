import { useQuery } from "@tanstack/react-query";
import { GetAllCategories } from "../../services/Category";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../constant/utils";






export const useGetAllCategories = (page: number = 0, size: number = 10, sortBy: string = "name", direction: string = "asc") => {
  const { data: categories, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["categories", page, size, sortBy, direction],
    queryFn: async () => {
      try {
        const data = await GetAllCategories(page, size, sortBy, direction);
        toast.success("Categorías cargadas exitosamente");
        return data;
      } catch (err) {
        toast.error(getErrorMessage(err)); // Muestra un mensaje de error al usuario
        throw err;
      }
    },
  });

  return { categories, isLoading, isSuccess, isError, error };
};