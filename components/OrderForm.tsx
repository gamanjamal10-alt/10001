
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Place Your Order</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Fill out the details below to complete your purchase.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          placeholder="John Doe"
          required
        />
        <Input
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Input
            label="Product Name"
            id="product"
            name="product"
            type="text"
            value={formData.product}
            onChange={onChange}
            placeholder="e.g., Premium Widget"
            required
            />
        </div>
        <Input
          label="Quantity"
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
        label="Shipping Address"
        id="address"
        name="address"
        type="text"
        value={formData.address}
        onChange={onChange}
        placeholder="123 Main St, Anytown, USA 12345"
      />
      
      <Input
        label="Order Notes (Optional)"
        id="notes"
        name="notes"
        type="textarea"
        value={formData.notes}
        onChange={onChange}
        placeholder="Any special instructions?"
        rows={3}
      />

      <div className="pt-4">
        <Button type="submit" isLoading={isLoading} fullWidth>
          {isLoading ? 'Placing Order...' : 'Submit Order'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
