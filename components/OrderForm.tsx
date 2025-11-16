import React from 'react';
import { OrderFormData } from '../types';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { wilayas } from '../data/wilayas';

interface OrderFormProps {
  formData: OrderFormData;
  isLoading: boolean;
  productStock: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ formData, isLoading, productStock, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <ShoppingCartIcon className="w-12 h-12 mx-auto text-primary-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">إتمام الطلب</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">املأ بياناتك لإرسال الطلب. الدفع عند الاستلام.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="الاسم الكامل"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          placeholder="مثال: محمد عبدالله"
          required
        />
        <Input
          label="رقم الهاتف"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="مثال: 0512345678"
          required
        />
      </div>
      
       <Input
          label="البريد الإلكتروني"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="example@email.com"
          required
        />
      
      <div>
        <label htmlFor="wilaya" className="text-gray-700 dark:text-gray-200 font-medium">
            الولاية <span className="text-red-500 mr-1">*</span>
        </label>
        <select
            id="wilaya"
            name="wilaya"
            value={formData.wilaya}
            onChange={onChange}
            required
            className="block w-full px-4 py-2.5 mt-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md focus:border-primary-400 focus:ring-primary-300 focus:ring-opacity-40 dark:focus:border-primary-300 focus:outline-none focus:ring transition-colors duration-200"
        >
            <option value="">اختر ولايتك</option>
            {wilayas.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
        </select>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Input
            label="اسم المنتج"
            id="product"
            name="product"
            type="text"
            value={formData.product}
            onChange={onChange}
            required
            readOnly
            className="bg-gray-100 dark:bg-gray-700/50 cursor-not-allowed"
            />
        </div>
        <Input
          label="الكمية"
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity.toString()}
          onChange={onChange}
          min="1"
          max={productStock}
          required
        />
      </div>
      {productStock < 5 && productStock > 0 && <p className="text-sm text-yellow-600 dark:text-yellow-400">الكمية المتبقية محدودة: {productStock} فقط!</p>}
      {productStock === 0 && <p className="text-sm font-bold text-red-600 dark:text-red-400">نفدت الكمية من هذا المنتج.</p>}


      <Input
        label="العنوان التفصيلي"
        id="address"
        name="address"
        type="textarea"
        rows={3}
        value={formData.address}
        onChange={onChange}
        placeholder="الحي، الشارع، تفاصيل إضافية لتسهيل التوصيل"
        required
      />
      
      <Input
        label="ملاحظات الطلب (اختياري)"
        id="notes"
        name="notes"
        type="textarea"
        value={formData.notes}
        onChange={onChange}
        placeholder="أي تعليمات خاصة؟"
        rows={2}
      />

      <div className="pt-4">
        <Button type="submit" isLoading={isLoading} fullWidth disabled={isLoading || productStock === 0}>
          {isLoading ? 'جاري التأكيد...' : 'تأكيد الطلب'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
