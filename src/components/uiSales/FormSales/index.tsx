import { SubmitHandler, useForm } from "react-hook-form";
import { SalesCreate } from "../../../models";
import ButtonComponet from "../../ui/button";
import { TextInput } from "../../ui/inputRegister";
import styles from "./form.module.css";
import { useCreateSales } from "../../../hooks";
const ResgisterSale = () => {
  const { createSalesMutation: create, isPending } = useCreateSales();

  const createSales: SubmitHandler<SalesCreate> = async (data) => {
    // Llamar a la mutación para crear la venta
    create([data], {
      onSuccess: (blob) => {
        // Verificar si la respuesta es un Blob válido
        if (blob instanceof Blob) {
          // Crear un enlace para descargar el PDF
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "factura.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url); // Liberar el objeto URL
        }
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SalesCreate>();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> GENERAR VENTA</h1>
      <form onSubmit={handleSubmit(createSales)}>
        <TextInput
          label="codigo del producto"
          {...register("codeProduct", { required: true })}
        />
        {errors.codeProduct && <span>campo requerido</span>}

        <TextInput
          label="Cantidad a llevar"
          {...register("quantity", { required: true })}
        />
        {errors.quantity && <span>campo requerido</span>}

        <ButtonComponet name="Confirmar venta" type="submit" />
      </form>
    </div>
  );
};

export default ResgisterSale;
