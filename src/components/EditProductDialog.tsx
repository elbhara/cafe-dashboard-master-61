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
import { Pencil, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  stock: number;
  sku: string;
}

interface EditProductDialogProps {
  product: Product;
  onUpdate: () => void;
}

export function EditProductDialog({ product, onUpdate }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku,
    stock: product.stock.toString(),
    price: product.price.toString(),
    description: product.description,
    category: product.category,
  });

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(storedCategories);
  }, [open]);

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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing products
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const productIndex = existingProducts.findIndex((p: Product) => p.id === product.id);
    
    if (productIndex === -1) {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive"
      });
      return;
    }

    // Convert new images to base64 if provided
    const mainImageBase64 = mainImage ? await convertToBase64(mainImage) : product.image;
    const galleryImagesBase64 = galleryImages.length > 0
      ? await Promise.all(galleryImages.map(img => convertToBase64(img)))
      : product.gallery || [];
    
    // Update product
    const updatedProduct = {
      ...product,
      ...formData,
      image: mainImageBase64,
      gallery: galleryImagesBase64,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    
    existingProducts[productIndex] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(existingProducts));
    
    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
    });
    
    onUpdate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
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
            <Label htmlFor="category">Category</Label>
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
            Update Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}