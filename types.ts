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

export type OrderStatus = 'قيد التنفيذ' | 'تم التوصيل' | 'ملغي';

export interface Order {
  id: string;
  timestamp: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    wilaya: string;
    address: string;
  };
  product: {
    name: string;
    quantity: number;
    price: number; // السعر عند وقت الشراء
  };
  notes: string;
  status: OrderStatus;
}


export interface AdminConfig {
    scriptUrl: string;
    sheetUrl: string;
}