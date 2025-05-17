
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/10 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center gap-2">
            <img 
              src="/uploads/09d0ac33-8de7-424c-b725-a7c048fcef44.png" 
              alt="Herotia Logo" 
              className="w-8 h-8" 
            />
            <Link to="/" className="font-display font-bold text-2xl herotia-text">Herotia</Link>
            <p className="text-gray-400 mt-1 ml-2">Where Memes Become Assets</p>
          </div>
          
          <div className="flex space-x-8 text-sm text-gray-400">
            <Link to="/gallery" className="hover:text-primary transition-colors">Market</Link>
            <Link to="/mint" className="hover:text-primary transition-colors">Mint</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="w-full h-px bg-white/10 my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Herotia. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center transition-colors hover:bg-primary/40"
            >
              <ArrowUp className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
