import React from 'react';

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    return (
        <header className="w-full bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            متجري الجزائري
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                         <div className="relative">
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input
                                type="text"
                                onChange={(e) => onSearch(e.target.value)}
                                className="w-full py-2 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="ابحث عن منتج..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
