import { useQuery } from "@tanstack/react-query";
import {  GetTodayStockMovements } from "../../services/StockN";
import { PaginatedResponse } from "../../models";
import { StockMovementModelDto } from "../../models/stockMoventN";

export const useGetStockMovementsToday = (page:number=0,size:number=10,sortBy:string="createDate" ,direction:string="asc") => {
    const { data: stockMovements, isLoading } = useQuery<PaginatedResponse<StockMovementModelDto>>({
      queryKey: ["stockMovements", page, size, sortBy, direction],
      queryFn:() =>GetTodayStockMovements(page, size, sortBy, direction),
    });
  
    return { stockMovements, isLoading };
  };

