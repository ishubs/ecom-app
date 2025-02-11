export interface ProductImage {
  title: string;
  description: string;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  ean: string;
  upc: string;
  image: string;
  images: ProductImage[];
  net_price: number;
  taxes: number;
  price: number;
  categories: number[];
  tags: string[];
  quantity? : number
}