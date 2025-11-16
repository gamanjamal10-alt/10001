import React from 'react';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

interface OrderSuccessPageProps {
  orderId: string;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderId }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center p-8 sm:p-12">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          تم استلام طلبك بنجاح!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          شكرًا لثقتك بنا. فريقنا يعمل الآن على تجهيز طلبك.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
          <p className="text-gray-500 dark:text-gray-400">رقم طلبك هو:</p>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-wider">
            {orderId}
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          سنتصل بك على رقم هاتفك خلال 24 ساعة لتأكيد الطلب وتفاصيل التوصيل.
        </p>
        <a 
          href="#/" 
          className="w-full sm:w-auto inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          العودة إلى المتجر
        </a>
      </div>
    </div>
  );
};

export default OrderSuccessPage;