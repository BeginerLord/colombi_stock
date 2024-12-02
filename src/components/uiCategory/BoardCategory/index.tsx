import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDeleteCategory, useGetAllCategories } from "../../../hooks";
import styles from "./board.module.css";
import DeleteButton from "../../ui/deleteButton";
import { Paper } from "@mui/material";
import EditButton from "../../ui/editButton";

const BoardCategory = () => {
    const { categories, isLoading:isLoadingCategies}=useGetAllCategories();
    const { deleteCategoryMutation:deleteCategory, isPending:isPendingDelete}=useDeleteCategory();
    const handleDelete =(code:string)=>{
        deleteCategory(code);
    }

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", width: 150 },
        { field: "description", headerName: "Descripcion", width: 450 },
        { field: "code", headerName: "Codigo", width: 150 },
        {
          field: "Acciones",
          headerName: "Actions",
          width: 450,
          renderCell: (params) => (
            <div>
              <DeleteButton onDelete={() => handleDelete(params.row.code)} />
              <EditButton onEdit={() => {}} />
            </div>
             
            
          ),
        },
      ];
      
      const rows = categories?.content?.map((category, index) => ({
        id: index,
        name: category.name || "",
        description: category.description || "",
        code: category.code || "",
      })) || [];

  return (
    <>
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',width:'90%', marginTop:'3rem'}}>
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
    </>
  )
}

export default BoardCategory