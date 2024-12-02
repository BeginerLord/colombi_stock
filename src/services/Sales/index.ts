import { scheduleApi } from "../../api";
import { Sales, SalesCreate } from "../../models/salesModel";

export const CreateSales = async (sales: SalesCreate) => {
  const { data } = await scheduleApi.post("/",sales);
  return data as SalesCreate;
};
 
export const GetSalesCanceled = async (): Promise<Sales[]> => {
  const { data } = await scheduleApi.get("/canceled");
  return data as Sales[];
};

export const GetSalesActive = async (): Promise<Sales[]> => {
  const { data } = await scheduleApi.get("/active");
  return data as Sales[];
};

export const DeleteSales = async (uuid: string): Promise<void> => {
  await scheduleApi.delete(`/${uuid}`);
};
