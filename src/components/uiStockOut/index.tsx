import React from "react";
import {   useCreateStockOut, useGetAllProducts } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { StockMovementDto } from "../../models";
import { SelectInput, TextInput } from "../ui/inputRegister";
import styles from "./StockOut.module.css";
import ButtonComponet from "../ui/button";
import SideBarComponent from "../ui/sideBar";
import { MenuItemOwner } from "../../constant";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const StockOut = () => {
  const { createStockOut, isPending } = useCreateStockOut();

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleClick = (path: string, message: string) => {
    navigate(path);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };
  const { isLoading: isLoadingProduct, products } = useGetAllProducts(
    0,
    10,
    "name",
    "asc"
  );

  const createStockInSucces: SubmitHandler<StockMovementDto> = async (data) => {
    await createStockOut({
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
    <div className={styles.container}>
                      <SideBarComponent menuItems={MenuItemOwner} />

      




      <div className={styles.nav}>
     <h1 className={styles.title}>Registro de salidas</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button onClick={() => handleClick('/stock-in', 'Registro de entradas')}>
          Registro de entradas
        </Button>
        <Button onClick={() => handleClick('/stock-out', 'Registro de salidas')}>
          Registro de salidas
        </Button>
        <Button onClick={() => handleClick('/stock-day', 'Movimientos del día')}>
          Movimientos del día
        </Button>
        <Button onClick={() => handleClick('/stock-trans', 'Transacciones de stock')}>
          Transacciones de stock
        </Button>
      </div>
     </div>





      <form onSubmit={handleSubmit(createStockInSucces)}>


<TextInput  label="description" type="text" {...register("description", { required: true, valueAsNumber: true })} />
{errors.description && <span>This field is required</span>}


<TextInput  label="quantity" type="number" min={0} {...register("quantity", { required: true, valueAsNumber: true })} />
{errors.quantity && <span>This field is required</span>}
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
     
      <ButtonComponet name={"Enviar"} type="submit" />

      </form>
    </div>
  );
};

export default StockOut;
