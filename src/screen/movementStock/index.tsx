import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Snackbar } from '@mui/material';
import SideBarComponent from '../../components/ui/sideBar';
import { MenuItemOwner } from '../../constant';

const MovementStocks = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClick = (path: string, message: string) => {
    navigate(path); // Navega a la ruta especificada
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <SideBarComponent menuItems={MenuItemOwner} />
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button  onClick={() => handleClick('/stock-in', 'Registro de entradas')}>
          Registro de entradas
        </Button>
        <Button   onClick={() => handleClick('/stock-out', 'Registro de salidas')}>
          Registro de salidas
        </Button>
        <Button onClick={() => handleClick('/stock-day', 'Movimientos del día')}>
          Movimientos del día
        </Button>
        <Button onClick={() => handleClick('/stock-trans', 'Transacciones de stock')}>
          Transacciones de stock
        </Button>
          
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default MovementStocks;
