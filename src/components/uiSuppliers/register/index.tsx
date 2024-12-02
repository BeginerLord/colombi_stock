import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseCreateSuppliers } from "../../../hooks/suppliers/useCreateSuppliers";
import { SuppliersModelDto } from "../../../models/suppliersModel";
import styles from "./registerSuppliers.module.css";
import { EmailInput, TextInput } from "../../ui/inputRegister";
import ButtonComponet from "../../ui/button";
const RegisterSuppliers: React.FC = () => {
  const { CreateSuppliersMutation, isPending } = UseCreateSuppliers();

  const createSuppliersSucces: SubmitHandler<SuppliersModelDto> = async (
    data
  ) => {
    await CreateSuppliersMutation({
      ...data,
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SuppliersModelDto>();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Gestión de Proveedores</h1>
      <form onSubmit={handleSubmit(createSuppliersSucces)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <TextInput
          label="Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>This field is required</span>}

        <TextInput
          type="number"
          label="DNI"
          {...register("dni", { required: true })}
        />
        {errors.dni && <span>This field is required</span>}

        <TextInput
          type="number"
          label="Phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <span>This field is required</span>}

        <EmailInput label="Email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        <ButtonComponet name="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default RegisterSuppliers;
