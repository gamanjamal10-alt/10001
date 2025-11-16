import React, { useState, useCallback } from 'react';
import { OrderFormData, Product, AdminConfig, Order } from '../types';
import OrderForm from '../components/OrderForm';
import { ExclamationTriangleIcon } from '../components/icons/ExclamationTriangleIcon';

type PageStatus = 'IDLE' | 'SUBMITTING' | 'ERROR';

interface OrderPageProps {
  product: Product;
  adminConfig: AdminConfig;
  onOrderSuccess: (order: Order) => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ product, adminConfig, onOrderSuccess }) => {
  const initialFormData: OrderFormData = {
    name: '',
    product: product.name,
    quantity: 1,
    phone: '',
    email: '',
    wilaya: '',
    address: '',
    notes: ''
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [status, setStatus] = useState<PageStatus>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
        processedValue = Math.max(1, Math.min(parseInt(value, 10) || 1, product.quantity));
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: processedValue,
    }));
  }, [product.quantity]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    setError(null);

    const SCRIPT_URL = adminConfig.scriptUrl;

    if (!SCRIPT_URL) {
        setError("خطأ لصاحب المتجر: رابط Google Apps Script غير موجود. يرجى إضافته من لوحة التحكم في قسم الإعدادات.");
        setStatus('ERROR');
        return;
    }
     if (product.quantity === 0) {
        setError("عذراً، لقد نفدت كمية هذا المنتج.");
        setStatus('ERROR');
        return;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`فشل الطلب. رمز الحالة: ${response.status}.`);
      
      const result = await response.json();
      
      if (result.success && result.orderId) {
        const newOrder: Order = {
            id: result.orderId,
            timestamp: new Date().toISOString(),
            customer: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                wilaya: formData.wilaya,
                address: formData.address
            },
            product: {
                name: formData.product,
                quantity: formData.quantity
            },
            notes: formData.notes,
            status: 'قيد التنفيذ'
        };
        onOrderSuccess(newOrder);
        window.location.hash = `#/order/success/${result.orderId}`;
      } else {
        throw new Error(result.message || 'رفض السكربت الطلب.');
      }

    } catch (err) {
      console.error("Submission Error:", err);
      let errorMessage = (err instanceof Error) ? err.message : 'حدث خطأ غير معروف.';
      setError(`فشل إرسال الطلب. ${errorMessage}`);
      setStatus('ERROR');
    }
  }, [formData, adminConfig.scriptUrl, product.quantity, onOrderSuccess]);

  const renderContent = () => {
    if (status === 'ERROR') {
      return (
        <div className="text-center p-8">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">فشل الإرسال</h2>
          <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-md mb-4 text-sm">
            {error}
          </p>
          <button
            onClick={() => setStatus('IDLE')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75"
          >
            حاول مرة أخرى
          </button>
        </div>
      );
    }

    return (
      <OrderForm
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        isLoading={status === 'SUBMITTING'}
        productStock={product.quantity}
      />
    );
  };

  return (
      <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
              {renderContent()}
          </div>
      </div>
  );
};

export default OrderPage;