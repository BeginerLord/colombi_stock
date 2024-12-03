import { scheduleApi } from "../../api";
import { PaginatedResponse } from "../../models";
import { StockMovement } from "../../models/stockMovement";
import { StockMovementModelDto } from "../../models/stockMoventN";

export const UpdateStockMovement = async (
  stockMovement: StockMovement,
  code: string
) => {
  const { data } = await scheduleApi.put(
    `/stock_movement/update-stock/${code}`,
    stockMovement
  );

  return data as StockMovement;
};

export const SaveOutStockMovement = async (stockMovement: StockMovement) => {
  const { data } = await scheduleApi.post(
    `/stock_movement/stock-out`,
    stockMovement
  );

  return data as StockMovement;
};

export const SaveInStockMovement = async (stockMovement: StockMovement) => {
  const { data } = await scheduleApi.post(
    `/stock_movement/stock-in`,
    stockMovement
  );

  return data as StockMovement;
};

export const GetStockMovementByCode = async (
  code: string,
  status: "ACTIVE" | "INACTIVE"
) => {
  const { data } = await scheduleApi.get(`/stock_movement/`, {
    params: { code, status },
  });

  return data as StockMovement;
};

export const GetAllStockMovements = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "movementDate",
  direction: string = "asc",
  statusEntity: "ACTIVE" | "INACTIVE",
  movementType: "STOCK_IN" | "STOCK_OUT"
) => {
  const url = `/stock_movement/movement?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${statusEntity}&movementType=${movementType}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<StockMovementModelDto>;
};



export const GetStockMovementsByDateRange = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "movementDate",
  direction: string = "asc",
  statusEntity: 'ACTIVE' | 'INACTIVE',
  startDate: string,
  endDate: string
) => {
  const url = `/stock_movement/date-range?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${statusEntity}&startDate=${startDate}&endDate=${endDate}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<StockMovementModelDto>;
};