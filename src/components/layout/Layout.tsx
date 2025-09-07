import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="freepik home blog wp-theme-freepik-blog hfeed">
      <Header />
      <main id="main" className="main-content">
        <div id="content" role="main" className="main-container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;