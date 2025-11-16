import React from 'react';
import { Product } from '../types';

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <img className="h-full w-full object-cover md:w-80" src={product.image} alt={`صورة ${product.name}`} />
            </div>
            <div className="p-8 flex flex-col justify-between">
                <div>
                    <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">منتج جديد</div>
                    <h1 className="block mt-1 text-4xl leading-tight font-extrabold text-black dark:text-white">{product.name}</h1>
                    <p className="mt-4 text-2xl font-bold text-primary-600 dark:text-primary-400">{product.price.toLocaleString()} د.ج</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">الكمية المتاحة: {product.quantity}</p>
                    <p className="mt-4 text-gray-500 dark:text-gray-300 text-lg">{product.description}</p>
                </div>
                <div className="mt-8">
                    <a href={`#/order/${product.id}`} 
                       className={`inline-block px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 transform rounded-lg ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-500 focus:outline-none focus:bg-primary-500'}`}
                       onClick={(e) => isOutOfStock && e.preventDefault()}
                       aria-disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'نفدت الكمية' : 'اطلب الآن'}
                    </a>
                     <a href="#/" className="inline-block mr-4 px-8 py-3 text-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                        العودة للمتجر
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductPage;
