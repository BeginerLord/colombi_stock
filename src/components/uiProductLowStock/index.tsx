 import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { UseGetProductByCodeLowStock } from '../../hooks';
import { ProductModeltDto } from '../../models';

import styles from "./productLow.module.css";
import SideBarComponent from "../ui/sideBar";
import { MenuItemOwner } from "../../constant";
 const ProductLowStock = () => {
  const { product, isLoading: isLoadingProducts } = UseGetProductByCodeLowStock();
  
  if (isLoadingProducts) {
    return <div>Loading...</div>;
  }

  if (!product || product.content.length === 0) {
    return <div>No low stock products found</div>;
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "purchasePrice", headerName: "Purchase Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "stockMin", headerName: "Minimum Stock", width: 150 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "code", headerName: "Product Code", width: 150 },
    { field: "codigoCategoria", headerName: "Category Code", width: 150 },
     { field: "suppliersName", headerName: "Supplier Name", width: 150 },
  ];

  const rows = product.content.map((product: ProductModeltDto, index: number) => ({
    id: index,
    name: product.name,
    description: product.description,
    price: product.price,
    purchasePrice: product.purchasePrice,
    stock: product.stock,
    stockMin: product.stockMin,
    unit: product.unit,
    code: product.code,
    codigoCategoria: product.codigoCategoria,
     suppliersName: product.suppliersName,
  }));

  return (
    <div >
                  <SideBarComponent menuItems={MenuItemOwner} />

    <div className={styles.container}>

    <h1>Productos bajo stock</h1>
    <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '80%', marginTop: '3rem' }}>
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
}

export default ProductLowStock;