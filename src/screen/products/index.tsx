import React, { useState } from 'react';
import SideBarComponent from '../../components/ui/sideBar';
import RegisterProduct from '../../components/uiProducts/register';
import TableProducts from '../../components/uiProducts/table';
 import { ProductModeltDto } from '../../models';
import { useUpdateProductByCode } from '../../hooks';
import { MenuItemOwner } from '../../constant';
 
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductModeltDto | null>(null);
  const { updateProductByCodeMutation, isPending } = useUpdateProductByCode();

  const handleEditProduct = (product: ProductModeltDto) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = async (product: ProductModeltDto) => {
    if (product.code) {
      await updateProductByCodeMutation({ code: product.code, product });
    }
  };

 

  return (
    <>
      <SideBarComponent menuItems={MenuItemOwner} />
      <RegisterProduct
        selectedProduct={selectedProduct}
        updateProduct={handleUpdateProduct}
        isUpdating={isPending}
      />
      <TableProducts onEditProduct={handleEditProduct} />
    </>
  );
};

export default Products;