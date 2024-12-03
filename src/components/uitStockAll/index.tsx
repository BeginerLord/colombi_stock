import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
 import { Paper } from "@mui/material";
import { useGetAllStockMovements } from "../../hooks";

const StockAll = () => {
  const { isLoading, stockMovements } = useGetAllStockMovements(
    0,
    10,
    "updateDate",
    "asc",
    "ACTIVE"
  );

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
      <h1>Todos los movimientos de stock</h1>
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
  );
};

export default StockAll;