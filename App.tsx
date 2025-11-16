
import React, { useState, useCallback } from 'react';
import { OrderFormData } from './types';
import OrderForm from './components/OrderForm';
import { CheckCircleIcon } from './components/icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './components/icons/ExclamationTriangleIcon';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL.
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

const INITIAL_FORM_DATA: OrderFormData = {
  name: '',
  product: '',
  quantity: 1,
  phone: '',
  address: '',
  notes: ''
};

type AppStatus = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

export default function App() {
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<AppStatus>('IDLE');
  const [error, setError] = useState<string | null>(null);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    setError(null);
    setSubmittedOrderId(null);

    if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        setError("Please update the SCRIPT_URL in App.tsx with your Google Apps Script Web App URL.");
        setStatus('ERROR');
        return;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires this for simple POSTs
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // redirect: 'follow', // this is handled by browser, not needed here
      });
      
      // Note: With 'no-cors', we can't read the response body.
      // We'll assume success if the request doesn't throw an error.
      // For a more robust solution, the Apps Script would need to handle CORS preflight requests.
      // The provided script does not, so we rely on this simplified success criteria.
      
      setSubmittedOrderId(`ORD-${new Date().getTime()}`);
      setStatus('SUCCESS');
      setFormData(INITIAL_FORM_DATA);

    } catch (err) {
      console.error("Submission Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and your script URL.';
      setError(`Failed to submit order. ${errorMessage}`);
      setStatus('ERROR');
    }
  }, [formData]);

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Order Received!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Thank you for your order. Your order ID is <span className="font-semibold text-primary-600 dark:text-primary-400">{submittedOrderId}</span>.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75"
            >
              Place Another Order
            </button>
          </div>
        );
      case 'ERROR':
        return (
          <div className="text-center p-8">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Submission Failed</h2>
            <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-md mb-4">
              {error}
            </p>
            <button
              onClick={() => setStatus('IDLE')}
              className="mt-4 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75"
            >
              Try Again
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
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
          {renderContent()}
        </div>
        <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Google Sheets & React</p>
        </footer>
      </div>
    </main>
  );
}
