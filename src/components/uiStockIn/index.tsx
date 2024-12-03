import React from "react";
import { UseCreateStockIn, useGetAllProducts } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { StockMovementDto } from "../../models";
import { SelectInput, TextInput } from "../ui/inputRegister";
import styles from "./StockIn.module.css";
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


<TextInput label="Description" {...register("description", { required: true })} />
{errors.description && <span>This field is required</span>}
      <SelectInput
        label="quantity"
        {...register("quantity", { required: true })}
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
