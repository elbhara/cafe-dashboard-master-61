import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: number;
  name: string;
}

export function CategoryDialog() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    if (storedCategories.length === 0) {
      // Set default categories if none exist
      const defaultCategories = [
        { id: 1, name: "Beverages" },
        { id: 2, name: "Food" },
        { id: 3, name: "Desserts" }
      ];
      localStorage.setItem("categories", JSON.stringify(defaultCategories));
      setCategories(defaultCategories);
    } else {
      setCategories(storedCategories);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === editingId ? { ...cat, name: newCategory } : cat
      );
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      toast({
        title: "Category updated",
        description: "The category has been updated successfully.",
      });
    } else {
      // Add new category
      const newCat = {
        id: Date.now(),
        name: newCategory
      };
      const updatedCategories = [...categories, newCat];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      toast({
        title: "Category added",
        description: "The new category has been added successfully.",
      });
    }
    
    setNewCategory("");
    setEditingId(null);
  };

  const handleEdit = (category: Category) => {
    setNewCategory(category.name);
    setEditingId(category.id);
  };

  const handleDelete = (id: number) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Manage Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category Name</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                required
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <Button type="submit">
                {editingId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-2 border rounded">
              <span>{category.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}