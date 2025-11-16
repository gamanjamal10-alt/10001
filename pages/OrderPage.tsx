import React, { useState, useCallback } from 'react';
import { OrderFormData, Product } from '../types';
import OrderForm from '../components/OrderForm';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from '../components/icons/ExclamationTriangleIcon';

// !! IMPORTANT !!
// Replace this URL with your actual Google Apps Script Web App URL.
const SCRIPT_URL = "PUT_YOUR_SCRIPT_URL_HERE";

type PageStatus = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

interface OrderPageProps {
  product: Product;
}

const OrderPage: React.FC<OrderPageProps> = ({ product }) => {
  const initialFormData: OrderFormData = {
    name: '',
    product: product.name,
    quantity: 1,
    phone: '',
    address: '',
    notes: ''
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [status, setStatus] = useState<PageStatus>('IDLE');
  const [error, setError] = useState<string | null>(null);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    setError(null);
    setSubmittedOrderId(null);

    if (SCRIPT_URL === "PUT_YOUR_SCRIPT_URL_HERE") {
        setError("خطأ: يرجى تحديث رابط Google Apps Script في ملف pages/OrderPage.tsx");
        setStatus('ERROR');
        return;
    }

    try {
      // NOTE: Google Apps Script Web Apps have a specific way of handling POST requests
      // that differs from typical APIs. They often redirect after a POST. To get a JSON
      // response back reliably without complex server-side CORS setup, a common pattern
      // is to append the data to the URL and use a fetch with a 'follow' redirect, then
      // parse the final page's content if needed. However, for a simple "fire and forget"
      // with a JSON body, 'no-cors' is often used, but it prevents reading the response.
      // The ideal solution is a properly configured Apps Script that handles CORS pre-flight
      // requests and returns JSON correctly, but that's beyond the scope of this UI code.
      // We will assume a simple POST and handle the inability to read the response.
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // This is often required for simple Apps Script deployments
        headers: {
            // 'Content-Type': 'application/json' // This header is not allowed in 'no-cors' mode
        },
        // To send data, a common workaround for 'no-cors' is to use FormData
        // or URL-encoded data, but the provided script expects JSON. This creates
        // a conflict. The most likely scenario to work is that the user's script
        // is published to allow anonymous access and handles the POST correctly.
        // We will send the JSON as text/plain, another common workaround.
        body: JSON.stringify(formData),
      });

      // Since we are in 'no-cors' mode, we cannot access response.ok, response.status, or the body.
      // We will optimistically assume success if the fetch promise resolves.
      // A more robust implementation requires changes on the Google Apps Script side.
      
      setSubmittedOrderId(`ORD-${new Date().getTime()}`); // Generate a temporary ID for display
      setStatus('SUCCESS');
      setFormData(initialFormData);

    } catch (err) {
      console.error("Submission Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير معروف. يرجى التحقق من الكونسول ورابط السكربت.';
      setError(`فشل إرسال الطلب. ${errorMessage}`);
      setStatus('ERROR');
    }
  }, [formData, initialFormData]);

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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تم استلام الطلب!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              شكراً لطلبك. رقم طلبك هو <span className="font-semibold text-primary-600 dark:text-primary-400">{submittedOrderId}</span>.
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
            <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-md mb-4">
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
