import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProductByCode, useGetAllCategories, UseGetAllSuppliers, UseFindProductByCode } from "../../../hooks";
import { TextInput, SelectInput } from "../../ui/inputRegister";
import ButtonComponent from "../../ui/button";
import { ProductModeltDto } from "../../../models";

import styles from "./EditProduct.module.css";

interface EditProductProps {
  productCode: string;
  onClose: () => void; // Prop para cerrar el formulario de edición
}

const EditProduct: React.FC<EditProductProps> = ({ productCode, onClose }) => {
  const { updateProductByCodeMutation, isPending: isPendingUpdate } = useUpdateProductByCode();
  const { isLoading: isLoadingSuppliers, suppliers } = UseGetAllSuppliers(0, 10, "name", "asc");
  const { isLoading: isLoadingCategories, categories } = useGetAllCategories(0, 10, "name", "asc");
  const { isLoading: isLoadingProduct, productByCode } = UseFindProductByCode(productCode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductModeltDto>();

  useEffect(() => {
    if (productByCode) {
      setValue("name", productByCode.name);
      setValue("description", productByCode.description);
      setValue("price", productByCode.price);
      setValue("purchasePrice", productByCode.purchasePrice);
      setValue("stock", productByCode.stock);
      setValue("stockMin", productByCode.stockMin);
      setValue("unit", productByCode.unit);
      setValue("code", productByCode.code);
      setValue("codigoCategoria", productByCode.codigoCategoria);
      setValue("dni_provedor", productByCode.dni_provedor);
    }
  }, [productByCode, setValue]);

  const updateProductSuccess: SubmitHandler<ProductModeltDto> = async (data) => {
    await updateProductByCodeMutation({
      code: productCode,
      product: data,
    });
    reset();
    onClose(); // Cierra el formulario de edición después de actualizar el producto
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Producto</h1>
      <form onSubmit={handleSubmit(updateProductSuccess)}>
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

        <TextInput label="Code" {...register("code", { required: true })} disabled />
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

        <ButtonComponent name="Actualizar" type="submit" />
      </form>
    </div>
  );
};

export default EditProduct;