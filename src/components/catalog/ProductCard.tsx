import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div 
        className="aspect-square w-full overflow-hidden rounded-t-lg cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 
            className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-primary"
            onClick={() => onProductClick(product)}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            <p className="text-sm text-gray-500">
              Stock: <span className={product.stock <= 5 ? "text-red-500 font-medium" : ""}>
                {product.stock} units
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-xl font-bold text-primary">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(product.price)}
          </p>
          <Button
            className="w-full"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            variant={product.stock <= 0 ? "secondary" : "default"}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};