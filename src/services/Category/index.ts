import { scheduleApi } from "../../api";
import { PaginatedResponse } from "../../models";
import {
  CategoryModelDto,
  CreateCategoryModel,
} from "../../models/categoryModel";

export const CreateCategory = async (category: CreateCategoryModel) => {
  const { data } = await scheduleApi.post("/categories", category);
  return data as CreateCategoryModel;
};

export const GetAllCategories = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const url = `/categories?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;

  const { data } = await scheduleApi.get(url);

  return data as PaginatedResponse<CategoryModelDto>;
};

export const DeleteCategoryByCode = async (code: string) => {
  const { data } = await scheduleApi.delete(`/categories/${code}`);
  return data;
};

export const UpdateCategory = async (
  code: string,
  category: CreateCategoryModel
) => {
  const { data } = await scheduleApi.put(`/categories/${code}`, category);

  return data as CreateCategoryModel;
};

export const GetCategoryByCode = async (code: string) => {
  const { data } = await scheduleApi.get(`/categories/${code}`);

  return data as CategoryModelDto;
};
