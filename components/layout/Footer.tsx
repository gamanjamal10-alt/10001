import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-6xl text-center text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} متجري الجزائري. جميع الحقوق محفوظة.</p>
                <p className="mt-2 text-sm">
                    تواصل معنا: <a href="mailto:contact@mystore.dz" className="text-primary-600 dark:text-primary-400 hover:underline">contact@mystore.dz</a>
                </p>
                 <div className="mt-4">
                    <a href="#/admin" className="text-xs text-gray-400 dark:text-gray-600 hover:underline">لوحة التحكم</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
