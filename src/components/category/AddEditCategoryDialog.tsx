import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types/product";

interface AddEditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onAdd: (category: Category) => void;
  onEdit: (category: Category) => void;
}

export function AddEditCategoryDialog({
  open,
  onOpenChange,
  category,
  onAdd,
  onEdit,
}: AddEditCategoryDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (category) {
      onEdit({ ...category, name });
    } else {
      onAdd({
        id: Date.now(),
        name,
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {category ? "Update Category" : "Add Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}