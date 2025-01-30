import React from 'react';

const Layout = ({children}) => {
    return (
        <>
        <nav className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-6 shadow-lg">
            <div className="container mx-auto flex items-center justify-center">
                <div className="text-white text-2xl font-bold flex items-center space-x-4">
                    <span className="text-3xl font-extrabold">🌐</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">User Management App</h1>
                </div>
                
            </div>
        </nav>

        <main className="bg-gray-50 min-h-screen p-4">
            <div className="container mx-auto">{children}</div>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="container mx-auto text-center">
            </div>
        </footer>
        </>
    );
};

export default Layout;
