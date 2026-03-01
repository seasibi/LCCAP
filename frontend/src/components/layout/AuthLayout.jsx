import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header minimal={true} />
      
      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>
      
      {/* Footer */}
      <Footer minimal={true} />
    </div>
  );
};

export default AuthLayout;
