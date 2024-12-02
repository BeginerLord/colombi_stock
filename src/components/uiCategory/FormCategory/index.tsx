import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./registerCategory.module.css";
import { CategoryModelDto } from "../../../models/categoryModel";
import { TextInput } from "../../ui/inputRegister";
import ButtonComponet from "../../ui/button";
import { useCreateCategory } from "../../../hooks";

const RegisterCategory = () => {


  
  const {isPending:isPendingCreate,createCategoryMutation:create }= useCreateCategory();
  const CreateCategory: SubmitHandler<CategoryModelDto> = async (data) => {
    await create({
      ...data
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategoryModelDto>();
 
  const messag = "campo obligatorio";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CATEGORIAS </h1>
      <form onSubmit={handleSubmit(CreateCategory)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>{messag} </span>}

        <TextInput
          label="Descripcion"
           type="text"
         
          {...register("description", { required: true })}
        />
        {errors.description && <span>{messag}</span>}

        <TextInput
          label="Codigo manual"
           type="number"
          {...register("code", { required: true })}
        />
        {errors.code && <span>This field is required</span>}

        <ButtonComponet name="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default RegisterCategory;
