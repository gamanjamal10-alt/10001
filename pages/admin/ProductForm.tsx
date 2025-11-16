import React, { useState } from 'react';
import { Product } from '../../types';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface ProductFormProps {
  product?: Product;
  products: Product[];
  onSave: (products: Product[]) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, products, onSave }) => {
  const [formData, setFormData] = useState({
    id: product?.id || new Date().getTime().toString(),
    name: product?.name || '',
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    image: product?.image || '',
    description: product?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProducts;
    if (product) {
      // Edit existing product
      updatedProducts = products.map(p => (p.id === product.id ? formData : p));
    } else {
      // Add new product
      updatedProducts = [...products, formData];
    }
    onSave(updatedProducts as Product[]);
    alert('تم حفظ المنتج بنجاح!');
    window.location.hash = '#/admin';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="اسم المنتج" id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="السعر (د.ج)" id="price" name="price" type="number" value={formData.price.toString()} onChange={handleChange} required />
                    <Input label="الكمية" id="quantity" name="quantity" type="number" value={formData.quantity.toString()} onChange={handleChange} required />
                </div>
                <Input label="رابط الصورة" id="image" name="image" type="text" value={formData.image} onChange={handleChange} required />
                <Input label="وصف المنتج" id="description" name="description" type="textarea" rows={4} value={formData.description} onChange={handleChange} required />
                <div className="pt-4 flex items-center space-x-4">
                    <Button type="submit" fullWidth>حفظ المنتج</Button>
                    <a href="#/admin" className="block text-center w-full px-6 py-3 text-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                        إلغاء
                    </a>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ProductForm;
