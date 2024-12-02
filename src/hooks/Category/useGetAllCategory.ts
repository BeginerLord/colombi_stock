import { useQuery } from "@tanstack/react-query";
import { GetAllCategories } from "../../services/Category";


export const useGetAllCategories = (page: number = 0, size: number = 10, sortBy: string = "name", direction: string = "asc") => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", page, size, sortBy, direction],
    queryFn: () => GetAllCategories(page, size, sortBy, direction),
  });

  return { categories, isLoading };
};