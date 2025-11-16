import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPage from './pages/admin/AdminPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import ProductForm from './pages/admin/ProductForm';
import { initialProducts } from './data/products';
import { Product, AdminConfig, Order } from './types';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const ADMIN_PASSWORD = 'admin123';

export default function App() {
    const [route, setRoute] = useState(window.location.hash);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [adminConfig, setAdminConfig] = useState<AdminConfig>({ scriptUrl: '', sheetUrl: '' });

    useEffect(() => {
        // Load data from localStorage or use initial data
        const storedProducts = localStorage.getItem('products');
        setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);

        const storedOrders = localStorage.getItem('orders');
        setOrders(storedOrders ? JSON.parse(storedOrders) : []);
        
        const storedConfig = localStorage.getItem('adminConfig');
        setAdminConfig(storedConfig ? JSON.parse(storedConfig) : { scriptUrl: '', sheetUrl: '' });
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleLogin = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            window.location.hash = '#/admin';
        } else {
            alert('كلمة المرور غير صحيحة.');
        }
    };

    const handleSaveProducts = (updatedProducts: Product[]) => {
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleSaveOrders = (updatedOrders: Order[]) => {
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleNewOrder = (newOrder: Order) => {
        const updatedOrders = [newOrder, ...orders];
        handleSaveOrders(updatedOrders);
    };
    
    const handleSaveConfig = (config: AdminConfig) => {
        setAdminConfig(config);
        localStorage.setItem('adminConfig', JSON.stringify(config));
    };

    const renderPage = () => {
        const path = route.slice(1) || '/';

        // Admin Routes
        if (path.startsWith('/admin')) {
            if (!isAdmin) return <AdminLogin onLogin={handleLogin} />;
            
            if (path === '/admin/orders') {
                return <AdminOrdersPage orders={orders} onSave={handleSaveOrders} />;
            }
            if (path === '/admin/add') {
                return <ProductForm products={products} onSave={handleSaveProducts} />;
            }
            if (path.startsWith('/admin/edit/')) {
                const productId = path.split('/')[3];
                const product = products.find(p => p.id === productId);
                return product 
                    ? <ProductForm product={product} products={products} onSave={handleSaveProducts} /> 
                    : <h2 className="text-center text-2xl font-bold text-red-500 p-8">لم يتم العثور على المنتج.</h2>;
            }
            return <AdminPage products={products} orders={orders} onSaveProducts={handleSaveProducts} adminConfig={adminConfig} onSaveConfig={handleSaveConfig} />;
        }
        
        // Customer Routes
        if (path.startsWith('/product/')) {
            const productId = path.split('/')[2];
            const product = products.find(p => p.id === productId);
            return product 
                ? <ProductPage product={product} /> 
                : <h2 className="text-center text-2xl font-bold text-red-500 p-8">لم يتم العثور على المنتج.</h2>;
        }

        if (path.startsWith('/order/success/')) {
            const orderId = path.split('/')[3];
            return <OrderSuccessPage orderId={orderId} />;
        }

        if (path.startsWith('/order/')) {
            const productId = path.split('/')[2];
            const product = products.find(p => p.id === productId);
            return product 
                ? <OrderPage product={product} adminConfig={adminConfig} onOrderSuccess={handleNewOrder} /> 
                : <h2 className="text-center text-2xl font-bold text-red-500 p-8">لم يتم العثور على المنتج للطلب.</h2>;
        }

        return <HomePage products={products} searchQuery={searchQuery} />;
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 dark:bg-gray-900 font-sans">
            <Header onSearch={setSearchQuery} />
            <main className="flex-grow w-full flex flex-col items-center justify-start p-4">
              <div className="w-full max-w-6xl my-8">
                  {renderPage()}
              </div>
            </main>
            <Footer />
        </div>
    );
}