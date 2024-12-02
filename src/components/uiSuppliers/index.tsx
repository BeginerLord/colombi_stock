import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EmailInput, TextInput } from "../ui/inputRegister";
import ButtonComponent from "../ui/button";
import styles from "./registerSuppliers.module.css";

interface FormValues {
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
}

const RegisterSuppliers: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Proveedores</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
        
        <TextInput label="Last Name" {...register("lastName", { required: true })} />
        {errors.lastName && <span>This field is required</span>}
        
        <TextInput label="DNI" {...register("dni", { required: true })} />
        {errors.dni && <span>This field is required</span>}
        
        <TextInput label="Phone" {...register("phone", { required: true })} />
        {errors.phone && <span>This field is required</span>}
        
        <EmailInput label="Email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
        
        <ButtonComponent name="Enviar" onClick={() => {}} key="submit" />
      </form>
    </div>
  );
};

export default RegisterSuppliers;