import { Button } from '@mui/material';

interface EditButtonProps {
  onEdit: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => (
  <Button
    variant="contained"
    style={{ marginRight: '8px', backgroundColor: 'white', color: 'blue', border: '1px solid blue', marginLeft:'3rem' }}
    onClick={onEdit}
  >
    Editar
  </Button>
);


export default EditButton;