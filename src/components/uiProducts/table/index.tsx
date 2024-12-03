import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UseFindProductByCode, useGetAllProducts } from "../../../hooks";
import { Paper } from "@mui/material";
import styles from "./tableProducts.module.css";
import { ProductModel } from "../../../models/productModel";
import SearchBoxComponent from "../../ui/searchBox";
import DeleteButton from "../../ui/deleteButton";
import EditButton from "../../ui/editButton";
import { UseDeleteProduct } from "../../../hooks/ProductN/useDeleteProduct";

interface TableProductsProps {
  onEditProduct: (product: ProductModel) => void;
}

const TableProducts: React.FC<TableProductsProps> = ({ onEditProduct }) => {
  const { isLoading, products } = useGetAllProducts(0, 10, "name", "asc");
  const [searchCode, setSearchCode] = useState<string>("");
  const { isLoading: isLoadingByCode, productByCode } = UseFindProductByCode(searchCode);
  const { DeleteProductMutation, isPending } = UseDeleteProduct();
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);

  const handleDelete = (code: string) => {
    if (window.confirm(`Are you sure you want to delete product with code: ${code}?`)) {
      DeleteProductMutation(code.toString());
    }
  };

  const handleEdit = (product: ProductModel) => {
    onEditProduct(product);
  };

  useEffect(() => {
    if (searchCode && productByCode) {
      setFilteredProducts(Array.isArray(productByCode) ? productByCode : [productByCode as ProductModel]);
    } else if (searchCode && !productByCode) {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(products?.content || []);
    }
  }, [searchCode, productByCode, products]);

  useEffect(() => {
    if (searchCode && !isLoadingByCode && !productByCode) {
      const timer = setTimeout(() => {
        setSearchCode('');
        setFilteredProducts(products?.content || []);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [searchCode, isLoadingByCode, productByCode, products]);

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
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <>
          <DeleteButton onDelete={() => handleDelete(params.row.code)} />
          <EditButton onEdit={() => handleEdit(params.row)} />
        </>
      ),
    },
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
    <div className="">
      <div className={styles.container_search}>
        <SearchBoxComponent placeholder="Search by Code" setInfo={setSearchCode} />
      </div>
      <div style={{ display: "flex", height: "55vh", marginLeft: "2rem", marginTop: "2rem" }}>
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

export default TableProducts;