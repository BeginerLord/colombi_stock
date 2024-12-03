import { SubmitHandler, useForm } from "react-hook-form";
import { ProductModeltDto, SalesCreate } from "../../../models";
import ButtonComponet from "../../ui/button";
import styles from "./form.module.css";
import { useCreateSales, useGetAllProducts } from "../../../hooks";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";

const ResgisterSale = () => {
  const { createSalesMutation: create, isPending } = useCreateSales();
  const { products, isLoading } = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState<ProductModeltDto[]>(
    []
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedProduct, setSelectedProduct] =
    useState<ProductModeltDto | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<SalesCreate>();

  const createSales: SubmitHandler<SalesCreate> = async () => {
    if (selectedProducts.length === 0) {
      alert("Debe agregar al menos un producto antes de confirmar la venta.");
      return;
    }

    const salesData: SalesCreate[] = selectedProducts.map((product) => ({
      codeProduct: product.code,
      quantity: quantities[product.code].toString(),
    }));

    create(salesData, {
      onSuccess: (blob) => {
        if (blob instanceof Blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "factura.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }

        setSelectedProducts([]);
        setQuantities({});
        setSelectedProduct(null);
        reset(); 
        alert("¡Venta registrada exitosamente!");
      },
      onError: () => {
        alert("Hubo un problema al registrar la venta. Intente nuevamente.");
      },
    });
  };

  const handleAddProduct = () => {
    if (
      selectedProduct &&
      quantities[selectedProduct.code] &&
      quantities[selectedProduct.code] <= selectedProduct.stock
    ) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setSelectedProduct(null);
    } else {
      alert("Por favor ingrese una cantidad válida.");
    }
  };

  const handleRemoveProduct = (code: string) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.code !== code)
    );
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[code];
    setQuantities(updatedQuantities);
  };

  const handleProductChange = (event: { target: { value: string } }) => {
    const product =
      products?.content.find((p) => p.code === event.target.value) || null;
    setSelectedProduct(product);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = Number(event.target.value);
    if (selectedProduct && value >= 0 && value <= selectedProduct.stock) {
      setQuantities({
        ...quantities,
        [selectedProduct.code]: value,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GENERAR VENTA</h1>
      <form onSubmit={handleSubmit(createSales)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="code-product-label">
                Seleccionar Producto
              </InputLabel>
              <Select
                labelId="code-product-label"
                value={selectedProduct ? selectedProduct.code : ""}
                onChange={handleProductChange}
              >
                {products?.content.map((product) => (
                  <MenuItem key={product.code} value={product.code}>
                    {product.name} - Stock: {product.stock}
                  </MenuItem>
                )) || []}
              </Select>
            </FormControl>
          </Grid>
          {selectedProduct && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedProduct.description}
                  </Typography>
                  <Typography variant="body2">
                    Precio: {selectedProduct.price}
                  </Typography>
                  <Typography variant="body2">
                    Stock: {selectedProduct.stock}
                  </Typography>
                  <TextField
                    label="Digite la Cantidad"
                    type="number"
                    value={quantities[selectedProduct.code] || ""}
                    onChange={handleQuantityChange}
                    error={quantities[selectedProduct.code] > selectedProduct.stock}
                    helperText={
                      quantities[selectedProduct.code] > selectedProduct.stock
                        ? "Cantidad excede el stock disponible"
                        : ""
                    }
                    inputProps={{
                      min: 0,
                      max: selectedProduct.stock,
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                    disabled={
                      !quantities[selectedProduct.code] ||
                      quantities[selectedProduct.code] > selectedProduct.stock
                    }
                  >
                    Agregar Producto
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProducts.map((product) => (
                <TableRow key={product.code}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{quantities[product.code]}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveProduct(product.code)}
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
  <ButtonComponet
    name="Confirmar venta"
    type="submit"
    disabled={selectedProducts.length === 0}
  />
</div>

      </form>
    </div>
  );
};

export default ResgisterSale;
