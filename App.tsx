import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import { products } from './data/products';

export default function App() {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        const path = route.slice(1) || '/'; // remove #, default to /
        
        if (path.startsWith('/product/')) {
            const productId = path.split('/')[2];
            const product = products.find(p => p.id === productId);
            return product 
                ? <ProductPage product={product} /> 
                : <h2 className="text-center text-2xl font-bold text-red-500 p-8">لم يتم العثور على المنتج.</h2>;
        }

        if (path.startsWith('/order/')) {
            const productId = path.split('/')[2];
            const product = products.find(p => p.id === productId);
            return product 
                ? <OrderPage product={product} /> 
                : <h2 className="text-center text-2xl font-bold text-red-500 p-8">لم يتم العثور على المنتج للطلب.</h2>;
        }

        return <HomePage />;
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 p-4 font-sans">
            <div className="w-full max-w-5xl my-8">
                {renderPage()}
                <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
                    <p>متجر إلكتروني مدعوم بواسطة React</p>
                </footer>
            </div>
        </main>
    );
}