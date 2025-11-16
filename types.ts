export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface OrderFormData {
  name: string;
  product: string;
  quantity: number;
  phone: string;
  address: string;
  notes: string;
}
