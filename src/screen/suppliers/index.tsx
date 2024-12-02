import SideBarComponent from "../../components/ui/sideBar";
import RegisterSuppliers from "../../components/uiSuppliers/register";
import TableSuppliers from "../../components/uiSuppliers/table";

const Suppliers = () => {
  const menuItems = [
    { text: "Gestión de proveedores", path: "/provedores" },
    { text: "Gestión de productos", path: "/productos" },
    { text: "Productos bajo stock", path: "/productos-low-stock" },


    
    
    // otros elementos del menú
  ];

  return (
    <>
      <SideBarComponent menuItems={menuItems} />
      <RegisterSuppliers />
      <TableSuppliers />
    </>
  );
};

export default Suppliers;
