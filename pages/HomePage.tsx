import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">متجرنا الإلكتروني</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">أفضل المنتجات بأفضل الأسعار</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
