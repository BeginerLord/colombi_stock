import { scheduleApi } from "../../api";
import { PaginatedResponse } from "../../models";
import { StockMovementModelDto } from "../../models/stockMoventN";

export const GetStockMovements = async (): Promise<
  PaginatedResponse<StockMovementModelDto>
> => {
  const { data } = await scheduleApi.get("/stock_movement");
  return data as PaginatedResponse<StockMovementModelDto>;
};

export const GetTodayStockMovements = async (): Promise<
  PaginatedResponse<StockMovementModelDto>
> => {
  const { data } = await scheduleApi.get("/stock_movement/today");
  return data as PaginatedResponse<StockMovementModelDto>;
};
