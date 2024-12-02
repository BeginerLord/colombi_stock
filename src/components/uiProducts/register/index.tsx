import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateProduct, useGetAllCategories, UseGetAllSuppliers } from "../../../hooks";
import { TextInput, SelectInput } from "../../ui/inputRegister";
import ButtonComponent from "../../ui/button";
import { ProductModeltDto } from "../../../models";

import styles from "./RegisterProducts.module.css";

const RegisterProduct: React.FC = () => {
  const { createProductMutation, isPending: isPendingProduct } = useCreateProduct();

  const { isLoading: isLoadingSuppliers, suppliers } = UseGetAllSuppliers(0, 10, "name", "asc");
  const { isLoading: isLoadingCategories, categories } = useGetAllCategories(0, 10, "name", "asc");

  const createProductSuccess: SubmitHandler<ProductModeltDto> = async (data) => {
    await createProductMutation({
      ...data,
      price: data.price,
      purchasePrice: data.purchasePrice,
      stock: data.stock,
      stockMin: data.stockMin,
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductModeltDto>();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Producto</h1>
      <form onSubmit={handleSubmit(createProductSuccess)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <TextInput label="Description" {...register("description", { required: true })} />
        {errors.description && <span>This field is required</span>}

        <TextInput label="Price" type="number" {...register("price", { required: true })} />
        {errors.price && <span>This field is required</span>}

        <TextInput label="Purchase Price" type="number" {...register("purchasePrice", { required: true })} />
        {errors.purchasePrice && <span>This field is required</span>}

        <TextInput label="Stock" type="number" {...register("stock", { required: true })} />
        {errors.stock && <span>This field is required</span>}

        <TextInput label="Stock Min" type="number" {...register("stockMin", { required: true })} />
        {errors.stockMin && <span>This field is required</span>}

        <TextInput label="Unit" {...register("unit", { required: true })} />
        {errors.unit && <span>This field is required</span>}

        <TextInput label="Code" {...register("code", { required: true })} />
        {errors.code && <span>This field is required</span>}

        <SelectInput
          label="Codigo Categoria"
          {...register("codigoCategoria", { required: true })}
          options={categories?.content.map((category) => ({
            value: category.code,
            label: category.name,
          })) || []}
        />
        {errors.codigoCategoria && <span>This field is required</span>}

        <SelectInput
          label="DNI Provedor"
          {...register("dni_provedor", { required: true })}
          options={suppliers?.content.map((supplier) => ({
            value: supplier.dni,
            label: `${supplier.name} ${supplier.lastName}`,
          })) || []}
        />
        {errors.dni_provedor && <span>This field is required</span>}

        <ButtonComponent name="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default RegisterProduct;