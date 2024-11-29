import { scheduleApi } from "../../api";
import { Sales, SalesCreate } from "../../models/salesModel";

export const CreateSales = async () => {
  const { data } = await scheduleApi.post("/");
  return data as SalesCreate;
};

export const GetSalesCanceled = async (): Promise<Sales[]> => {
  const { data } = await scheduleApi.get("/canceled");
  return data as Sales[];
};

export const GetSalesActive = async (): Promise<Sales[]> => {
  const { data } = await scheduleApi.get("/");
  return data as Sales[];
};

export const DeleteSales = async (uuid: string): Promise<void> => {
  await scheduleApi.delete(`/${uuid}`);
};
