
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, ShoppingBag, Droplet, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    try {
      // Check if Phantom is installed
      const { solana } = window as any;

      if (solana?.isPhantom) {
        // Connect to Phantom wallet
        const response = await solana.connect();
        setWallet(response.publicKey.toString());
        setIsConnected(true);
        console.log('Wallet connected:', response.publicKey.toString());
      } else {
        // Phantom wallet not found, open link to install
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const disconnectWallet = () => {
    const { solana } = window as any;
    if (solana) {
      solana.disconnect();
      setWallet(null);
      setIsConnected(false);
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-gray-300 hover:text-primary";
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/uploads/09d0ac33-8de7-424c-b725-a7c048fcef44.png" 
            alt="Herotia Logo" 
            className="w-10 h-10" 
          />
          <Link to="/" className="font-display font-bold text-3xl herotia-text">Herotia</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors flex items-center gap-1 ${isActive('/')}`}>
            <Home size={18} />
            Home
          </Link>
          <Link to="/gallery" className={`transition-colors flex items-center gap-1 ${isActive('/gallery')}`}>
            <ShoppingBag size={18} />
            Market
          </Link>
          <Link to="/mint" className={`transition-colors flex items-center gap-1 ${isActive('/mint')}`}>
            <Droplet size={18} />
            Mint
          </Link>
          <Link to="/rewards" className={`transition-colors flex items-center gap-1 ${isActive('/rewards')}`}>
            <Award size={18} />
            Rewards
          </Link>
          
          {!isConnected ? (
            <Button onClick={connectWallet} className="btn-rgb-float animate-glow">
              Connect Wallet
            </Button>
          ) : (
            <Button 
              onClick={disconnectWallet} 
              variant="outline"
              className="border border-primary hover:bg-primary/10 animate-glow btn-rgb-float-outline"
            >
              {wallet ? formatWalletAddress(wallet) : 'Connected'}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full glass backdrop-blur-lg py-4 animate-fade-in">
          <div className="flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className={`transition-colors py-2 flex items-center gap-2 ${isActive('/')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/gallery" 
              className={`transition-colors py-2 flex items-center gap-2 ${isActive('/gallery')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag size={18} />
              Market
            </Link>
            <Link 
              to="/mint" 
              className={`transition-colors py-2 flex items-center gap-2 ${isActive('/mint')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Droplet size={18} />
              Mint
            </Link>
            <Link 
              to="/rewards" 
              className={`transition-colors py-2 flex items-center gap-2 ${isActive('/rewards')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Award size={18} />
              Rewards
            </Link>
            
            {!isConnected ? (
              <Button onClick={() => {
                connectWallet();
                setMobileMenuOpen(false);
              }} className="btn-rgb-float animate-glow w-full">
                Connect Wallet
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  disconnectWallet();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="border border-primary hover:bg-primary/10 animate-glow btn-rgb-float-outline w-full"
              >
                {wallet ? formatWalletAddress(wallet) : 'Connected'}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
