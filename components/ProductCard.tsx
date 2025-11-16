import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="h-48 overflow-hidden">
        <img className="w-full h-full object-cover" src={product.image} alt={`صورة ${product.name}`} />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mt-auto mb-4">{product.price} ر.س</p>
        <a href={`#/product/${product.id}`} className="block text-center mt-2 w-full px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75">
          عرض المنتج
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
