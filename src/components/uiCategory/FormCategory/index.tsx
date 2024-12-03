import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./registerCategory.module.css";
import { CategoryModelDto } from "../../../models/categoryModel";
import { TextInput } from "../../ui/inputRegister";
import ButtonComponet from "../../ui/button";
import { useCreateCategory } from "../../../hooks";
import { useEffect } from "react";

interface RegisterCategoryProps {
  selectedCategory?: CategoryModelDto | null;
  updateCategory: (category: CategoryModelDto) => Promise<void>;
  isUpdating: boolean;
}

const RegisterCategory = ({
  selectedCategory,
  updateCategory,
  isUpdating,
}: RegisterCategoryProps) => {
  const {
    isPending: isPendingCreate,
    createCategoryMutation: create,
  } = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryModelDto>();

  useEffect(() => {
    if (selectedCategory) {
      setValue("name", selectedCategory.name);
      setValue("description", selectedCategory.description);
      setValue("code", selectedCategory.code);
    }
  }, [selectedCategory, setValue]);

  const onSubmit: SubmitHandler<CategoryModelDto> = async (data) => {
    if (selectedCategory) {
      await updateCategory({ ...data, code: selectedCategory.code });
    } else {
      await create({ ...data });
    }
    reset();
  };

  const messag = "Campo obligatorio";
  const minLengthMessage = "El código debe tener al menos 4 caracteres";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CATEGORIAS </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Name" {...register("name", { required: true })} />
        {errors.name && <span>{messag} </span>}

        <TextInput
          label="Descripción"
          type="text"
          {...register("description", { required: true })}
        />
        {errors.description && <span>{messag}</span>}

        <TextInput
          label="Código manual"
          type="text"
          {...register("code", {
            required: true,
            minLength: {
              value: 4,
              message: minLengthMessage,
            },
          })}
        />
        {errors.code && <span>{errors.code.message || messag}</span>}

        <ButtonComponet name="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default RegisterCategory;
