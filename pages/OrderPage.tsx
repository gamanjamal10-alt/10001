import React, { useState, useCallback } from 'react';
import { OrderFormData, Product, AdminConfig } from '../types';
import OrderForm from '../components/OrderForm';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from '../components/icons/ExclamationTriangleIcon';
import { wilayas } from '../data/wilayas';

type PageStatus = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

interface OrderPageProps {
  product: Product;
  adminConfig: AdminConfig;
}

const OrderPage: React.FC<OrderPageProps> = ({ product, adminConfig }) => {
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
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

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
    setSubmittedOrderId(null);

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
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`فشل الطلب. رمز الحالة: ${response.status}. تأكد من أن السكربت تم نشره بشكل صحيح للوصول العام.`);
      }
      
      const result = await response.json();
      
      if (result.success && result.orderId) {
        setSubmittedOrderId(result.orderId);
        setStatus('SUCCESS');
        setFormData(initialFormData);
        // Note: In a real app, we'd update the product quantity globally.
        // For this static setup, we'll assume the backend handles it.
      } else {
        throw new Error(result.message || 'رفض السكربت الطلب. تحقق من سجلات التنفيذ في Apps Script.');
      }

    } catch (err) {
      console.error("Submission Error:", err);
      let errorMessage = 'حدث خطأ غير معروف. يرجى التحقق من الكونسول ورابط السكربت.';
      if (err instanceof TypeError) {
          errorMessage = 'حدث خطأ في الشبكة أو مشكلة في CORS. تأكد من أن السكربت منشور كـ "Web App" ويمكن الوصول إليه بواسطة "Anyone".'
      } else if (err instanceof Error) {
          errorMessage = err.message;
      }
      setError(`فشل إرسال الطلب. ${errorMessage}`);
      setStatus('ERROR');
    }
  }, [formData, initialFormData, adminConfig.scriptUrl, product.quantity]);

  const handleReset = () => {
    setFormData(initialFormData);
    setStatus('IDLE');
    setError(null);
    setSubmittedOrderId(null);
  };

  const renderContent = () => {
    switch (status) {
      case 'SUCCESS':
        return (
          <div className="text-center p-8">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تم استلام طلبك بنجاح!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              شكراً لطلبك. رقم طلبك هو <span className="font-semibold text-primary-600 dark:text-primary-400">{submittedOrderId}</span>.
              سنتصل بك قريباً للتأكيد.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75"
            >
              إرسال طلب آخر
            </button>
            <a href="#/" className="block mt-4 text-primary-600 dark:text-primary-400 hover:underline">العودة للمتجر</a>
          </div>
        );
      case 'ERROR':
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
      case 'IDLE':
      case 'SUBMITTING':
      default:
        return (
          <OrderForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isLoading={status === 'SUBMITTING'}
            productStock={product.quantity}
          />
        );
    }
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
