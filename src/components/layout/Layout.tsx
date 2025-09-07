import React from 'react';
import { NavBarDemo } from '@/components/ui/navbar-demo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="freepik home blog wp-theme-freepik-blog hfeed">
      <NavBarDemo />
      <main id="main">
        <div id="content" role="main" className="main-container">
          {children}
        </div>
      </main>
      </div>
  );
};

export default Layout;