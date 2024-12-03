import React, { useState } from "react";
import SideBarComponent from "../../components/ui/sideBar";
import RegisterSuppliers from "../../components/uiSuppliers/register";
import TableSuppliers from "../../components/uiSuppliers/table";
import { SuppliersModelDto } from "../../models";
import { useUpdateSuppliersByDni } from "../../hooks";

const Suppliers = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<SuppliersModelDto | null>(null);
  const { updateSuppliersByDniMutation, isPending } = useUpdateSuppliersByDni();

  const handleEditSupplier = (supplier: SuppliersModelDto) => {
    setSelectedSupplier(supplier);
  };

  const handleUpdateSupplier = async (supplier: SuppliersModelDto) => {
    if (supplier.dni) {
      try {
        await updateSuppliersByDniMutation({ dni: supplier.dni, suppliers: supplier });
        setSelectedSupplier(null); // Clear the selected supplier after update
      } catch (error) {
        console.error("Failed to update supplier:", error);
      }
    }
  };

  const menuItems = [
    { text: "Gestión de categoria", path: "/categoria" },

    { text: "Gestión de proveedores", path: "/provedores" },
    { text: "Gestión de productos", path: "/productos" },
    { text: "Productos bajo stock", path: "/productos-low-stock" },

    // otros elementos del menú
  ];
  return (
    <>
      <SideBarComponent menuItems={menuItems} />
      <RegisterSuppliers
        selectedSupplier={selectedSupplier}
        updateSupplier={handleUpdateSupplier}
        isUpdating={isPending}
      />
      <TableSuppliers onEditSupplier={handleEditSupplier} />
    </>
  );
};

export default Suppliers;