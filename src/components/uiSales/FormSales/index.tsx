import { SubmitHandler, useForm } from "react-hook-form";
import { ProductModeltDto, SalesCreate } from "../../../models";
import ButtonComponet from "../../ui/button";
import styles from "./form.module.css";
import { useCreateSales, useGetAllProducts } from "../../../hooks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

const  ResgisterSale = () => {
  const { createSalesMutation: create, isPending } = useCreateSales();
  const { products, isLoading } = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState<ProductModeltDto[]>(
    []
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedProduct, setSelectedProduct] =
    useState<ProductModeltDto | null>(null);

  const createSales: SubmitHandler<SalesCreate> = async () => {
    const salesData: SalesCreate[] = selectedProducts.map((product) => ({
      codeProduct: product.code,
      quantity: quantities[product.code].toString(),
    }));

    // Llamar a la mutación para crear la venta
    create(salesData, {
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

  const handleAddProduct = () => {
    if (
      selectedProduct &&
      quantities[selectedProduct.code] <= selectedProduct.stock
    ) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setSelectedProduct(null);
    }
  };

  interface ProductChangeEvent {
    target: {
      value: string;
    };
  }

  const handleProductChange = (event: ProductChangeEvent) => {
    const product =
      products?.content.find((p) => p.code === event.target.value) || null;
    setSelectedProduct(product);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (selectedProduct) {
      setQuantities({
        ...quantities,
        [selectedProduct.code]: Number(event.target.value),
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> GENERAR VENTA</h1>
      <form onSubmit={handleSubmit(createSales)}>
      <FormControl sx={{ width: "300px", marginRight: "16px" }}>
          <InputLabel id="code-product-label">codigo del producto</InputLabel>
          <Select
            labelId="code-product-label"
            label="codigo del producto"
            value={selectedProduct ? selectedProduct.code : ""}
            onChange={handleProductChange}
          >
            {products?.content.map((product) => (
              <MenuItem key={product.code} value={product.code}>
              nombre : {product.name}  codigo :{product.code}
              </MenuItem>
            )) || []}
          </Select>
          {errors.codeProduct && <span>campo requerido</span>}
        </FormControl>

        {selectedProduct && (
          <div>
            <div className={styles.card}>
              <p>Nombre: {selectedProduct.name}</p>
              <p>Descripción: {selectedProduct.description}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Precio: {selectedProduct.price}</p>
            </div>
            <TextField
              label="Cantidad"
              type="number"
              value={quantities[selectedProduct.code] || ""}
              onChange={handleQuantityChange}
              error={quantities[selectedProduct.code] > selectedProduct.stock}
              helperText={
                quantities[selectedProduct.code] > selectedProduct.stock
                  ? <span style={{ fontSize: '15px' }}>Cantidad excede el stock disponible</span>
                  : ""
              }
             inputProps={{ min: 0 }} // Agregado para evitar valores negativos
            />
            <Button onClick={handleAddProduct}>Agregar</Button>
          </div>
        )}

        <ul>
          {selectedProducts.map((product) => (
            <li key={product.code}>
            codigo:  {product.code} | unidades pedidas: {quantities[product.code]} 
            </li>
          ))}
        </ul>
<div className={styles.container_button}>
<ButtonComponet name="Confirmar venta" type="submit" />
</div>
        
      </form>
    </div>
  );
};

export default ResgisterSale;