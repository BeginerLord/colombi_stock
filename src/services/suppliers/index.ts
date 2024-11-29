import { scheduleApi } from "../../api";
import { PaginatedResponse } from "../../models";
import { SuppliersModel, SuppliersModelDto } from "../../models/suppliersModel";

export const UpdateSuppliersByDni = async (
  dni: string,
  suppliers: SuppliersModel
) => {
  const { data } = await scheduleApi.put(`/suppliers/${dni}`, suppliers);

  return data as SuppliersModel;
};

export const DeleteSuppliersByDni = async (dni: string) => {
  const { data } = await scheduleApi.delete(`/suppliers/${dni}`);

  return data;
};

export const GetAllSuppliers = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const url = `/suppliers?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<SuppliersModelDto>;
};

export const SaveSuppliers = async (suppliers: SuppliersModel) => {
  const { data } = await scheduleApi.post("/suppliers", suppliers);

  return data as SuppliersModel;
};

export const GetSuppliersByEmail = async (email: string) => {
  const { data } = await scheduleApi.get(`/suppliers/${email}`);

  return data as SuppliersModelDto;
};
