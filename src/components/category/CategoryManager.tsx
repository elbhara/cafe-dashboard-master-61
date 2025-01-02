import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AddEditCategoryDialog } from "./AddEditCategoryDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import type { Category } from "@/types/product";

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(storedCategories);
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast({
      title: "Category added",
      description: "The category has been added successfully.",
    });
  };

  const handleEditCategory = (updatedCategory: Category) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => {
          setEditingCategory(null);
          setShowAddEditDialog(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCategory(category);
                      setShowAddEditDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCategoryToDelete(category);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddEditCategoryDialog
        open={showAddEditDialog}
        onOpenChange={setShowAddEditDialog}
        category={editingCategory}
        onAdd={handleAddCategory}
        onEdit={handleEditCategory}
      />

      <DeleteCategoryDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        category={categoryToDelete}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}