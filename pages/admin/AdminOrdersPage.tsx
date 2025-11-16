import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '../../types';
import { wilayas } from '../../data/wilayas';

interface AdminOrdersPageProps {
  orders: Order[];
  onSave: (orders: Order[]) => void;
}

const statusColors: { [key in OrderStatus]: string } = {
  'قيد التنفيذ': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'تم التوصيل': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'ملغي': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({ orders, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [wilayaFilter, setWilayaFilter] = useState('');

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => 
        (order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         order.customer.phone.includes(searchTerm))
      )
      .filter(order => statusFilter ? order.status === statusFilter : true)
      .filter(order => wilayaFilter ? order.customer.wilaya === wilayaFilter : true);
  }, [orders, searchTerm, statusFilter, wilayaFilter]);
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    onSave(updatedOrders);
  };

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">إدارة الطلبات</h1>
            <a href="#/admin" className="text-primary-600 dark:text-primary-400 hover:underline">&larr; العودة للوحة التحكم</a>
        </div>
      
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="ابحث بالاسم أو رقم الهاتف..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as OrderStatus | '')}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="">كل الحالات</option>
                    {Object.keys(statusColors).map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                <select
                    value={wilayaFilter}
                    onChange={e => setWilayaFilter(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="">كل الولايات</option>
                    {wilayas.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                </select>
            </div>
        </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">رقم الطلب</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">العميل</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">الولاية</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">الحالة</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">تغيير الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm font-mono">{order.id}</td>
                <td className="p-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{order.customer.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{order.customer.wilaya}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {Object.keys(statusColors).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={5} className="text-center p-8 text-gray-500 dark:text-gray-400">
                        لا توجد طلبات تطابق معايير البحث.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;