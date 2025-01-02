export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  sku: string;
  quantity?: number;
}

export interface Category {
  id: number;
  name: string;
}