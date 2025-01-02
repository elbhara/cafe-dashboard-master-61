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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CategoryDialog } from "./CategoryDialog";

interface Category {
  id: number;
  name: string;
}

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    stock: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(storedCategories);
  }, [open]); // Refresh categories when dialog opens

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert images to base64
    const mainImageBase64 = mainImage ? await convertToBase64(mainImage) : "";
    const galleryImagesBase64 = await Promise.all(
      galleryImages.map(img => convertToBase64(img))
    );
    
    // Get existing products
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
    
    // Create new product
    const newProduct = {
      id: Date.now(),
      ...formData,
      image: mainImageBase64,
      gallery: galleryImagesBase64,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    
    // Add to localStorage
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, newProduct])
    );
    
    // Show success message
    toast({
      title: "Product added",
      description: "The product has been added successfully.",
    });
    
    // Reset form and close dialog
    setFormData({
      name: "",
      sku: "",
      stock: "",
      price: "",
      description: "",
      category: "",
    });
    setMainImage(null);
    setGalleryImages([]);
    setOpen(false);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mainImage">Main Image</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="mainImage"
                type="file"
                accept="image/*"
                required
                onChange={handleMainImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              <Upload className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gallery">Gallery Images</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="gallery"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              <Upload className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              required
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              required
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price (Rp)</Label>
            <Input
              id="price"
              type="number"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="category">Category</Label>
              <CategoryDialog />
            </div>
            <Select
              required
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}