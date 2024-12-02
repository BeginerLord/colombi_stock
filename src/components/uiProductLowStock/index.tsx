import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { ProductModeltDto } from "../../models";
import { UseGetAllProductLowStock } from "../../hooks/ProductN/useGetAllProductLowStock";

const ProductLowStock = () => {
  const { isLoading, products } = UseGetAllProductLowStock(
    0,
    10,
    "name",
    "asc"
  );
  const [filteredProducts, setFilteredProducts] = useState<ProductModeltDto[]>(
    []
  );

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.content || []);
    }
  }, [products]);

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "purchasePrice", headerName: "Purchase Price", width: 130 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "stockMin", headerName: "Stock Min", width: 100 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "codigoCategoria", headerName: "Category Code", width: 150 },
    { field: "suppliersName", headerName: "Supplier Name", width: 150 },
  ];

  const rows = filteredProducts.map((product, index) => ({
    id: index,
    code: product.code,
    name: product.name,
    description: product.description || "",
    price: product.price,
    purchasePrice: product.purchasePrice,
    stock: product.stock,
    stockMin: product.stockMin,
    unit: product.unit || "",
    codigoCategoria: product.codigoCategoria,
    suppliersName: product.suppliersName || "",
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "55vh",
          marginLeft: "2rem",
          marginTop: "2rem",
        }}
      >
        <Paper sx={{ height: "80%", width: "90%" }}>
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

export default ProductLowStock;
