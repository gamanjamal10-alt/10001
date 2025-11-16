import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ products, searchQuery }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">متجرنا الإلكتروني</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">أفضل المنتجات الجزائرية بأفضل الأسعار</p>
      </header>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 dark:text-gray-400 mt-12">
          لم يتم العثور على منتجات تطابق بحثك.
        </p>
      )}
    </div>
  );
};

export default HomePage;
