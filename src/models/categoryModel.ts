export interface CreateCategoryModel{
    name: string;
    description: string;
    code: string;
}

export type CategoryModelDto = Omit<CreateCategoryModel,"id">;

export type UpdateCategoryModel = Partial<CreateCategoryModel>;

