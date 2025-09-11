import React from 'react';
import DynamicFooter from './DynamicFooter';
import { DynamicNavBar } from '@/components/ui/dynamic-navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="freepik home blog wp-theme-freepik-blog hfeed min-h-screen flex flex-col">
      <DynamicNavBar />
      <main id="main" className="flex-grow pt-20 sm:pt-24">
        <div id="content" role="main" className="main-container">
          {children}
        </div>
      </main>
      <DynamicFooter />
    </div>
  );
};

export default Layout;