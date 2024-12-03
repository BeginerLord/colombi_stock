import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDeleteSales, useGetSalesActive } from "../../../hooks";
import DeleteButton from "../../ui/deleteButton";

interface SaleDetail {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const BoardActiveSales = () => {
  const { salesActive, isLoading } = useGetSalesActive();
  const { deleteSalesMutation: deleteSales, isPending } = useDeleteSales();

  const handleDelete = (saleId: string) => {
    deleteSales(saleId);
  };

  const columns: GridColDef[] = [
    { field: "saleId", headerName: "VENTA ID", width: 200 },
    { field: "saleDate", headerName: "FECHA DE VENTA", width: 200 },
    { field: "totalAmount", headerName: "MONTO TOTAL", width: 150, align:'center' },
    {
      field: "details",
      headerName: "DETALLES",
      width: 500,
      renderCell: (params) => (
        <div>
          {params.value.map((detail: SaleDetail, index: number) => (
            <div key={index}>
              <strong>Product:</strong> {detail.productName},
              <strong> Quantity:</strong> {detail.quantity},
              <strong> Unit Price:</strong> {detail.unitPrice},
              <strong> Total Price:</strong> {detail.totalPrice}
            </div>
          ))}
         
        </div>
      ),
    },{
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <DeleteButton onDelete={() => handleDelete(params.row.saleId)} />
      ),
    },
  ];

  const rows = salesActive?.map((sale) => ({
    id: sale.saleId,
    saleId: sale.saleId,
    saleDate: sale.saleDate,
    totalAmount: sale.totalAmount,
    details: sale.details,
  }));

  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',width:'100%', marginTop:'3rem'}}>
      <DataGrid
        rows={rows ? [...rows] : []}
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
  );
};

export default BoardActiveSales;
