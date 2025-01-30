import React, { useState } from 'react';

const Layout = ({children}) => {
    
    return (
        <>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-center">
                <div className="text-white text-2xl font-bold">
                    <a href="#">User Management App</a>
                </div>
            </div>
        </nav>
        <main>{children}</main>
        </>
    );
};

export default Layout;
