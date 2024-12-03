import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Button, Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useGetStockMovementsToday } from "../../hooks";
import SideBarComponent from "../ui/sideBar";
import { MenuItemOwner } from "../../constant";

import styles from "./StockDay.module.css";

const StockToday = () => {
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

  const { stockMovements, isLoading } = useGetStockMovementsToday(
    0,
    10,
    "createDate",
    "asc"
  );

  const columns: GridColDef[] = [
    { field: "product", headerName: "Producto", width: 150 },
    { field: "quantity", headerName: "Cantidad", width: 150 },
    { field: "movementType", headerName: "Tipo de Movimiento", width: 200 },
    { field: "createDate", headerName: "Fecha de Creación", width: 200 },
    { field: "statusEntity", headerName: "Estado", width: 150 },
  ];

  const rows =
    stockMovements?.content?.map((movement, index) => ({
      id: index,
      product: movement.nameProduct || "",
      quantity: movement.quantity || "",
      movementType: movement.movementType || "",
      createDate: movement.movementDate || "",
      statusEntity: movement.statusEntity || "",
    })) || [];

  return (
    <div>
      <SideBarComponent menuItems={MenuItemOwner} />
      
     <div className={styles.nav}>
     <h1 className={styles.title}>Movimiento de stock hoy</h1>
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


 
      <div className={styles.container}>
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
            }}
          />
        </Paper>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default StockToday;