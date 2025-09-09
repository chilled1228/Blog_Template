import React from 'react';
import Footer from './Footer';
import { NavBarDemo } from '@/components/ui/navbar-demo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="freepik home blog wp-theme-freepik-blog hfeed min-h-screen flex flex-col">
      <NavBarDemo />
      <main id="main" className="flex-grow pt-20 sm:pt-24">
        <div id="content" role="main" className="main-container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;