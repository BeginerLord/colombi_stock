import React from "react";
import { UseCreateStockIn, useGetAllProducts } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { StockMovementDto } from "../../models";
import { SelectInput } from "../ui/inputRegister";

const StockIn = () => {
  const { CreateStockInMutation, isPending } = UseCreateStockIn();
  const { isLoading: isLoadingProduct, products } = useGetAllProducts(
    0,
    10,
    "name",
    "asc"
  );

  const createStockInSucces: SubmitHandler<StockMovementDto> = async (data) => {
    await CreateStockInMutation({
      ...data,
      productCode: data.productCode,
      quantity: data.quantity,
      description: data.description,
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockMovementDto>();

  return (
    <div>
      <SelectInput
        label="producto"
        {...register("productCode", { required: true })}
        options={
          products?.content.map((product) => ({
            value: product.code,
            label: product.name,
          })) || []
        }
      />
      {errors.productCode && <span>This field is required</span>}
    </div>
  );
};

export default StockIn;
