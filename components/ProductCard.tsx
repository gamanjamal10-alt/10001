import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isOutOfStock = product.quantity === 0;
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col ${isOutOfStock ? 'opacity-60' : ''}`}>
      <div className="h-48 overflow-hidden">
        <img className="w-full h-full object-cover" src={product.image} alt={`صورة ${product.name}`} />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        <div className="mt-auto mb-4">
            {isOutOfStock ? (
                <p className="text-lg font-bold text-red-500 dark:text-red-400">نفدت الكمية</p>
            ) : (
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">{product.price.toLocaleString()} د.ج</p>
            )}
        </div>
        <a href={`#/product/${product.id}`} className={`block text-center mt-2 w-full px-6 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 ${isOutOfStock ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75'}`}>
          {isOutOfStock ? 'غير متوفر' : 'عرض المنتج'}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
