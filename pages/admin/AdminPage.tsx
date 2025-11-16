import React, { useState } from 'react';
import { Product, AdminConfig, Order } from '../../types';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface AdminPageProps {
  products: Product[];
  orders: Order[];
  adminConfig: AdminConfig;
  onSaveProducts: (products: Product[]) => void;
  onSaveConfig: (config: AdminConfig) => void;
}

const AdminDashboardCard: React.FC<{ title: string; value: number; link: string; linkText: string; }> = ({ title, value, link, linkText }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
        <div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
            <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{value}</p>
        </div>
        <a href={link} className="mt-6 text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            {linkText} &rarr;
        </a>
    </div>
);


const AdminPage: React.FC<AdminPageProps> = ({ products, orders, adminConfig, onSaveProducts, onSaveConfig }) => {
  const [config, setConfig] = useState(adminConfig);
    
  const handleDelete = (productId: string) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onSaveProducts(updatedProducts);
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };
    
  const handleConfigSave = (e: React.FormEvent) => {
      e.preventDefault();
      onSaveConfig(config);
      alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="space-y-12">
        {/* Dashboard Stats */}
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">لوحة التحكم</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminDashboardCard title="إجمالي المنتجات" value={products.length} link="#/admin" linkText="إدارة المنتجات" />
                <AdminDashboardCard title="إجمالي الطلبات" value={orders.length} link="#/admin/orders" linkText="إدارة الطلبات" />
            </div>
        </div>

      {/* Products Management */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">إدارة المنتجات</h2>
          <a href="#/admin/add" className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700">
            + إضافة منتج جديد
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">المنتج</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">السعر</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">الكمية</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{product.name}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{product.price.toLocaleString()} د.ج</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{product.quantity}</td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <a href={`#/admin/edit/${product.id}`} className="text-blue-500 hover:underline">تعديل</a>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings Management */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">إعدادات المتجر</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form onSubmit={handleConfigSave} className="space-y-6">
                 <Input
                    label="رابط Google Apps Script"
                    id="scriptUrl"
                    name="scriptUrl"
                    type="text"
                    value={config.scriptUrl}
                    onChange={handleConfigChange}
                    placeholder="ضع رابط الويب آب الخاص بالسكربت هنا"
                    required
                />
                 <Input
                    label="رابط Google Sheet (للوصول السريع)"
                    id="sheetUrl"
                    name="sheetUrl"
                    type="text"
                    value={config.sheetUrl}
                    onChange={handleConfigChange}
                    placeholder="ضع رابط جدول البيانات هنا"
                />
                 {config.sheetUrl && (
                    <a href={config.sheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        فتح جدول الطلبات
                    </a>
                )}
                 <div className="pt-4">
                    <Button type="submit" fullWidth>حفظ الإعدادات</Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;