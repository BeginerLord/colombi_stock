import React, { useState } from "react";
import SideBarComponent from "../../components/ui/sideBar";
import RegisterSuppliers from "../../components/uiSuppliers/register";
import TableSuppliers from "../../components/uiSuppliers/table";
import { SuppliersModelDto } from "../../models";
import { useUpdateSuppliersByDni } from "../../hooks";
import { MenuItemOwner } from "../../constant";
    
const Suppliers = () => {
  const [selectedSupplier, setSelectedSupplier] =
    useState<SuppliersModelDto | null>(null);
  const { updateSuppliersByDniMutation, isPending } = useUpdateSuppliersByDni();

  const handleEditSupplier = (supplier: SuppliersModelDto) => {
    setSelectedSupplier(supplier);
  };

  const handleUpdateSupplier = async (supplier: SuppliersModelDto) => {
    if (supplier.dni) {
      try {
        await updateSuppliersByDniMutation({
          dni: supplier.dni,
          suppliers: supplier,
        });
        setSelectedSupplier(null); // Clear the selected supplier after update
      } catch (error) {
        console.error("Failed to update supplier:", error);
      }
    }
  };

  return (
    <>
      <SideBarComponent menuItems={MenuItemOwner} />
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
