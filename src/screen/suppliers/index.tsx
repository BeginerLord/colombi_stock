import SideBarComponent from "../../components/ui/sideBar";
import RegisterSuppliers from "../../components/uiSuppliers/register";
import TableSuppliers from "../../components/uiSuppliers/table";

const Suppliers = () => {
  const menuItems = [
    { text: "Gestión de proveedores", path: "/provedores" },
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
