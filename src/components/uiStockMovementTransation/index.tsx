import { Paper, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useGetAllStockMovements } from "../../hooks";
import styles from "./stockMovement.module.css";
import { MenuItemOwner } from "../../constant";
import SideBarComponent from "../ui/sideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StockMovementTransation = () => {
  const [movementType, setMovementType] = useState("STOCK_IN");

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

  const { isLoading, stockMovements } = useGetAllStockMovements(
    0,
    10,
    "updateDate",
    "asc",
    "ACTIVE",
    movementType
  );

  const handleMovementTypeChange = (event) => {
    setMovementType(event.target.value);
  };

  useEffect(() => {
    if (movementType === "STOCK_IN") {
      toast.info("¡Stock de ingresos!");
    } else if (movementType === "STOCK_OUT") {
      toast.info("Stock de salidas!");
    }
  }, [movementType]);

  const columns: GridColDef[] = [
    { field: "code", headerName: "Código", width: 100 },
    { field: "nameProduct", headerName: "Nombre del Producto", width: 150 },
    { field: "productCode", headerName: "Código del Producto", width: 150 },
    { field: "quantity", headerName: "Cantidad", width: 150 },
    { field: "movementType", headerName: "Tipo de Movimiento", width: 200 },
    { field: "movementDate", headerName: "Fecha de Movimiento", width: 200 },
    { field: "statusEntity", headerName: "Estado", width: 150 },
  ];

  const rows =
    stockMovements?.content?.map((movement, index) => ({
      id: index,
      code: movement.code || "",
      nameProduct: movement.nameProduct || "",
      productCode: movement.productCode || "",
      quantity: movement.quantity || "",
      movementType: movement.movementType || "",
      movementDate: movement.movementDate || "",
      statusEntity: movement.statusEntity || "",
    })) || [];

  return (
    <div className="">
      <SideBarComponent menuItems={MenuItemOwner} />

      <div className={styles.nav}>
        <h1>Transacciones de Movimiento de Stock</h1>
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

      <div className={styles.list}>
        <FormControl sx={{ minWidth: 200, marginBottom: "1rem" }}>
          <InputLabel id="movement-type-label">Tipo de Movimiento</InputLabel>
          <Select
            labelId="movement-type-label"
            id="movement-type"
            value={movementType}
            label="Tipo de Movimiento"
            onChange={handleMovementTypeChange}
          >
            <MenuItem value="STOCK_IN">STOCK_IN</MenuItem>
            <MenuItem value="STOCK_OUT">STOCK_OUT</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.container}></div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "80%",
            marginTop: "3rem",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize={true}
            pageSize={20}
            rowsPerPageOptions={[10, 20, 50, 100]}
            rowBufferPx={200}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 10 : 5,
              bottom: params.isLastVisible ? 10 : 5,
            })}
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "1.3rem",
                paddingLeft: "16px",
                paddingRight: "16px",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "1.4rem",
                textAlign: "left",
                display: "flex",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                display: "block",
                width: "100%",
              },
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default StockMovementTransation;