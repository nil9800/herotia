
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 -z-10 bg-background"></div>
      <Navbar />
      <main className="flex-grow z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
