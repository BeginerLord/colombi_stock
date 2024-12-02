import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UseDeleteSuppliers, UseGetAllSuppliers } from "../../../hooks";
import { Paper } from "@mui/material";
import ActionButtons from "../../ui/buttonsAcctions";
import styles from "./tableSuppliers.module.css";

const TableSuppliers = () => {
  const { isLoading, suppliers } = UseGetAllSuppliers(0, 10, "name", "asc");
  const {  DeleteSuppliersMutation ,isPending} = UseDeleteSuppliers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: number) => {
    alert(`Edit supplier with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (dni: number) => {
    if (window.confirm(`Are you sure you want to delete supplier with DNI: ${dni}?`)) {
        DeleteSuppliersMutation(dni.toString());
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "dni", headerName: "DNI", width: 130 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row.id)}
          onDelete={() => handleDelete(params.row.dni)}
        />
      ),
    },
  ];

  const rows = suppliers?.content.map((supplier, index) => ({
    id: index,
    name: supplier.name || "",
    lastName: supplier.lastName || "",
    dni: supplier.dni || "",
    phone: supplier.phone || "",
    email: supplier.email || "",
  })) || [];

  return (
    <div className="">
      <div
        style={{
          display: "flex",
          height: "55vh",
          marginLeft: "2rem",
          marginTop: "2rem",
        }}
      >
        <Paper sx={{ height: 250, width: "60%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize={true}
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

export default TableSuppliers;