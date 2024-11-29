import { useQuery } from "@tanstack/react-query";
import { CountProductsByCategory } from "../../services/productN";
import { CategoryProductCount } from "../../models/productModel";

export const useCountProductsByCategory = () => {
    const { data: categoryCounts, isLoading } = useQuery<CategoryProductCount[]>({
      queryKey: ["categoryCounts"],
      queryFn: CountProductsByCategory,
    });
  
    return { categoryCounts, isLoading };
  };