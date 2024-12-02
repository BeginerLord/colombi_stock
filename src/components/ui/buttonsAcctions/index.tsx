import React from 'react';
import { Button } from '@mui/material';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div>
      <Button
        variant="contained"
        style={{ marginRight: '8px', backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
        onClick={onEdit}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={onDelete}
      >
        Eliminar
      </Button>
    </div>
  );
};

export default ActionButtons;