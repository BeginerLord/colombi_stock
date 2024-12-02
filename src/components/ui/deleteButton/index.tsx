import { Button } from "@mui/material";

interface DeleteButtonProps {
    onDelete: () => void;
  }
  
  const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => (
    <Button
      variant="contained"
      style={{ backgroundColor: 'red', color: 'white' }}
      onClick={onDelete}
    >
      Eliminar
    </Button>
  );

  export default DeleteButton ;