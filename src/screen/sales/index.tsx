import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import ResgisterSale from '../../components/uiSales/FormSales';
import BoardActiveSales from '../../components/uiSales/BoardActive';
import BoardSalesCanceled from '../../components/uiSales/BoardCanceled';


const SalesScreen = () => {
    const [view, setView] = useState<'register' | 'board'|'canceled'>('register');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClick = (view: 'register' | 'board'|'canceled', message: string) => {
    setView(view);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
     <Button onClick={() => handleClick('register', 'Formulario de venta abierto')}>Crear venta</Button>
      <Button onClick={() => handleClick('board', 'Vista de ventas activas abierta')}>Cancelar ventas</Button>
      <Button onClick={() => handleClick('canceled', 'Vista de ventas canceladas abierta')}>Historial de ventas canceladas</Button>
      {view === 'register' && <ResgisterSale />}
      {view === 'board' && <BoardActiveSales />}
      {view === 'canceled' && <BoardSalesCanceled/>}
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        message={snackbarMessage}
      />
 
    </>
  )
}

export default SalesScreen


