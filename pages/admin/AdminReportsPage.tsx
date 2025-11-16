import React, { useMemo } from 'react';
import { Order, Product } from '../../types';

interface AdminReportsPageProps {
  orders: Order[];
  products: Product[];
}

const StatCard: React.FC<{ title: string; value: string | number; description?: string }> = ({ title, value, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-lg">{title}</h3>
        <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{value}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
    </div>
);

const AdminReportsPage: React.FC<AdminReportsPageProps> = ({ orders, products }) => {

    const reportData = useMemo(() => {
        // 1. Total Revenue
        const totalRevenue = orders
            .filter(o => o.status === 'تم التوصيل')
            .reduce((sum, order) => sum + (order.product.price * order.product.quantity), 0);

        // 2. Best Selling Products
        const productSales = orders.reduce((acc, order) => {
            acc[order.product.name] = (acc[order.product.name] || 0) + order.product.quantity;
            return acc;
        }, {} as Record<string, number>);
        
        const bestSellingProducts = Object.entries(productSales)
            // Fix: Use index access in sort to help TypeScript infer types correctly.
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // 3. Top Wilayas
        const wilayaOrders = orders.reduce((acc, order) => {
            acc[order.customer.wilaya] = (acc[order.customer.wilaya] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topWilayas = Object.entries(wilayaOrders)
            // Fix: Use index access in sort to help TypeScript infer types correctly.
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // 4. Daily Orders (Last 7 days)
        const dailyOrders: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            dailyOrders[dateString] = 0;
        }
        orders.forEach(order => {
            const orderDate = order.timestamp.split('T')[0];
            if (dailyOrders[orderDate] !== undefined) {
                dailyOrders[orderDate]++;
            }
        });
        
        const dailyOrdersData = Object.entries(dailyOrders);
        const maxDailyOrders = Math.max(...Object.values(dailyOrders), 1); // Avoid division by zero

        return { totalRevenue, bestSellingProducts, topWilayas, dailyOrdersData, maxDailyOrders };
    }, [orders]);


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">التقارير والإحصائيات</h1>
        <a href="#/admin" className="text-primary-600 dark:text-primary-400 hover:underline">&larr; العودة للوحة التحكم</a>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
            title="إجمالي الإيرادات" 
            value={`${reportData.totalRevenue.toLocaleString()} د.ج`}
            description="من الطلبات التي تم توصيلها فقط"
        />
        <StatCard title="إجمالي الطلبات" value={orders.length} />
        <StatCard title="عدد المنتجات" value={products.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Best Selling Products */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">أكثر المنتجات مبيعًا</h2>
            {reportData.bestSellingProducts.length > 0 ? (
                <ul className="space-y-3">
                    {reportData.bestSellingProducts.map(([name, count]) => (
                        <li key={name} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                            <span>{name}</span>
                            <span className="font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{count} مبيعات</span>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات كافية.</p>}
        </div>

        {/* Top Wilayas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">أكثر الولايات طلبًا</h2>
            {reportData.topWilayas.length > 0 ? (
                <ul className="space-y-3">
                    {reportData.topWilayas.map(([name, count]) => (
                        <li key={name} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                            <span>{name}</span>
                            <span className="font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{count} طلبات</span>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات كافية.</p>}
        </div>
      </div>
        
        {/* Daily Orders Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">الطلبات اليومية (آخر 7 أيام)</h2>
             <div className="flex justify-around items-end h-48 p-4 border-t border-b border-gray-200 dark:border-gray-700">
                {reportData.dailyOrdersData.map(([date, count]) => (
                    <div key={date} className="flex flex-col items-center w-1/8">
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{count}</div>
                        <div className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md flex-grow flex items-end mt-2">
                            <div 
                                className="bg-primary-500 w-full rounded-t-md" 
                                style={{ height: `${(count / reportData.maxDailyOrders) * 100}%` }}
                                title={`${count} طلبات`}
                            ></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(date).toLocaleDateString('ar-DZ', { day: 'numeric', month: 'short' })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AdminReportsPage;