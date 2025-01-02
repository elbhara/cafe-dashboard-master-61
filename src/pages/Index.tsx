import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Coffee, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  sku: string;
}

interface Category {
  id: number;
  name: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCategories = localStorage.getItem("categories");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
        variant: "destructive"
      });
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item: Product) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "Stock limit reached",
          description: "You cannot add more of this item due to stock limitations.",
          variant: "destructive"
        });
        return;
      }
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="text-gray-500 mt-2">Discover our delicious offerings</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.name
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Coffee className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
            <p className="mt-2 text-gray-500">We don't have any products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-500">
                      Stock: <span className={product.stock <= 5 ? "text-red-500 font-medium" : ""}>
                        {product.stock} units
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      }).format(product.price)}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                      variant={product.stock <= 0 ? "secondary" : "default"}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;