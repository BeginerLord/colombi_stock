import React from 'react'
import SideBarComponent from '../../components/ui/sideBar';
import RegisterProduct from '../../components/uiProducts/register';
import TableProducts from '../../components/uiProducts/table';

const Products = () => {
    const menuItems = [
        { text: "Gestión de proveedores", path: "/provedores" },
        { text: "Gestión de productos", path: "/productos" },
        { text: "Productos bajo stock", path: "/productos-low-stock" },

    
        
        // otros elementos del menú
      ];
    
      return (
        <>
          <SideBarComponent menuItems={menuItems} />
          <RegisterProduct />

          <TableProducts/>
         </>
      );
    };

export default Products