import { MainLayout } from "@/components/layout/MainLayout";
import { CategoryManager } from "@/components/category/CategoryManager";

const Categories = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your product categories</p>
        </div>
        <CategoryManager />
      </div>
    </MainLayout>
  );
};

export default Categories;