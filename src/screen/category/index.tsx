import { useState } from "react";
import BoardCategory from "../../components/uiCategory/BoardCategory"
import RegisterCategory from "../../components/uiCategory/FormCategory"
import { CategoryModelDto } from "../../models/categoryModel";
import { useUpdateCategoryByCode } from "../../hooks";

const ScreenCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModelDto | null>(null);
  const {updateCategoryByCodeMutation, isPending}= useUpdateCategoryByCode();
  const handleEditCategory = (category: CategoryModelDto) => {
    setSelectedCategory(category);
  };

  const handleUpdateCategory = async (category: CategoryModelDto) => {
    if (category.code) {
      await updateCategoryByCodeMutation({ code: category.code, category });
    }
  };

  return (
    <>
      <RegisterCategory
        selectedCategory={selectedCategory}
        updateCategory={handleUpdateCategory}
        isUpdating={isPending}
      />
      <BoardCategory onEditCategory={handleEditCategory} />
    </>
  );
}

export default ScreenCategory