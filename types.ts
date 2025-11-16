export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  product: string;
  quantity: number;
  phone: string;
  email: string;
  wilaya: string;
  address: string;
  notes: string;
}

export interface AdminConfig {
    scriptUrl: string;
    sheetUrl: string;
}
