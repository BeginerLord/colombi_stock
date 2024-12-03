import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseCreateSuppliers } from "../../../hooks";
import { SuppliersModelDto } from "../../../models/suppliersModel";
import styles from "./registerSuppliers.module.css";
import { EmailInput, TextInput } from "../../ui/inputRegister";
import ButtonComponent from "../../ui/button";

interface RegisterSuppliersProps {
  selectedSupplier?: SuppliersModelDto | null;
  updateSupplier: (supplier: SuppliersModelDto) => Promise<void>;
  isUpdating: boolean;
}

const RegisterSuppliers: React.FC<RegisterSuppliersProps> = ({ selectedSupplier, updateSupplier, isUpdating }) => {
  const { CreateSuppliersMutation, isPending: isPendingCreate } = UseCreateSuppliers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SuppliersModelDto>();

  useEffect(() => {
    if (selectedSupplier) {
      setValue("name", selectedSupplier.name);
      setValue("lastName", selectedSupplier.lastName);
      setValue("dni", selectedSupplier.dni);
      setValue("phone", selectedSupplier.phone);
      setValue("email", selectedSupplier.email);
    }
  }, [selectedSupplier, setValue]);

  const createSuppliersSuccess: SubmitHandler<SuppliersModelDto> = async (data) => {
    try {
      if (selectedSupplier) {
        await updateSupplier(data);
      } else {
        await CreateSuppliersMutation({
          ...data,
        });
      }
      reset();
    } catch (error) {
      console.error("Failed to submit supplier:", error);
    }
  };

  const message = "This field is required";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{selectedSupplier ? "Actualizar Proveedor" : "Registro de Proveedor"}</h1>
      <form onSubmit={handleSubmit(createSuppliersSuccess)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>{message}</span>}

        <TextInput label="Last Name" {...register("lastName", { required: true })} />
        {errors.lastName && <span>{message}</span>}

        <TextInput type="number" label="DNI" {...register("dni", { required: true })} />
        {errors.dni && <span>{message}</span>}

        <TextInput type="number" label="Phone" {...register("phone", { required: true })} />
        {errors.phone && <span>{message}</span>}

        <EmailInput label="Email" {...register("email", { required: true })} />
        {errors.email && <span>{message}</span>}

        <ButtonComponent name={selectedSupplier ? "Actualizar" : "Enviar"} type="submit" disabled={isPendingCreate || isUpdating} />
      </form>
    </div>
  );
};

export default RegisterSuppliers;