import React from 'react';
import { OrderFormData } from '../types';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

interface OrderFormProps {
  formData: OrderFormData;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ formData, isLoading, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <ShoppingCartIcon className="w-12 h-12 mx-auto text-primary-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">إتمام الطلب</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">املأ بياناتك لإرسال الطلب.</p>
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
          required
        />
      </div>

      <Input
        label="عنوان الشحن"
        id="address"
        name="address"
        type="textarea"
        rows={3}
        value={formData.address}
        onChange={onChange}
        placeholder="المدينة، الحي، الشارع، رقم المبنى"
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
        <Button type="submit" isLoading={isLoading} fullWidth>
          {isLoading ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
