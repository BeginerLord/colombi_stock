import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  UseDeleteSuppliers,
  UseGetAllSuppliers,
  UseGetSuppliersByEmail,
  useUpdateSuppliersByDni,
} from "../../../hooks";
import { Paper } from "@mui/material";
import styles from "./tableSuppliers.module.css";
import DeleteButton from "../../ui/deleteButton";
import SearchBoxComponent from "../../ui/searchBox";
import { SuppliersModelDto } from "../../../models";
import EditButton from "../../ui/editButton";
 
interface TableSuppliersProps {
  onEditSupplier: (supplier: SuppliersModelDto) => void;
}

const TableSuppliers: React.FC<TableSuppliersProps> = ({ onEditSupplier }) => {
  const { isLoading, suppliers } = UseGetAllSuppliers(0, 10, "name", "asc");
  const { DeleteSuppliersMutation, isPending: isPendingD } = UseDeleteSuppliers();
  const { updateSuppliersByDniMutation, isPending: isPendingUpdate } = useUpdateSuppliersByDni();
  const [email, setEmail] = useState<string>("");
  const [filteredSuppliers, setFilteredSuppliers] = useState<SuppliersModelDto[] | null>(null);
 
  const { isLoading: isUserEmail, suppliersByEmail } = UseGetSuppliersByEmail(email);
  const handleEditSuppliers = (suppliers: SuppliersModelDto) => {
    onEditSupplier(suppliers);
  };

  useEffect(() => {
    if (email && suppliersByEmail) {
      setFilteredSuppliers(Array.isArray(suppliersByEmail) ? suppliersByEmail : [suppliersByEmail]);
    } else if (email && !suppliersByEmail) {
      setFilteredSuppliers([]);
    } else {
      setFilteredSuppliers(suppliers?.content ? suppliers.content : []);
    }
  }, [email, suppliersByEmail, suppliers]);

  useEffect(() => {
    if (email && !isUserEmail && !suppliersByEmail) {
      const timer = setTimeout(() => {
        setEmail("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [email, isUserEmail, suppliersByEmail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (dni: string) => {
    if (window.confirm(`Are you sure you want to delete supplier with DNI: ${dni}?`)) {
      DeleteSuppliersMutation(dni.toString());
    }
  };

  const handleEdit = (supplier: SuppliersModelDto) => {
    onEditSupplier(supplier);
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
        <>
          <DeleteButton onDelete={() => handleDelete(params.row.dni)} />
          <EditButton onEdit={() => handleEdit(params.row)}/>
        </>
      ),
    },
  ];

  const rows =
    filteredSuppliers?.map((supplier, index) => ({
      id: index,
      name: supplier.name || "",
      lastName: supplier.lastName || "",
      dni: supplier.dni || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
    })) || [];

  return (
    <div className="">
      <div className={styles.container_search}>
        <SearchBoxComponent setInfo={setEmail} placeholder={"buscar proveedores por email"} />
      </div>

      <div style={{ display: "flex", height: "55vh", marginLeft: "2rem", marginTop: "2rem" }}>
        <Paper sx={{ height: 250, width: "70%" }}>
          <DataGrid
            rows={[...rows]}
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