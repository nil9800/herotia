
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NFTShowcase from './NFTShowcase';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="container mx-auto px-4 py-20 md:py-40 flex flex-col items-center justify-center min-h-[75vh]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-neo-blue font-medium">Solana NFT Platform</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight md:leading-tight">
            Where <span className="herotia-text">Memes</span> Become <span className="herotia-text">Assets</span>
          </h1>
        </div>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Turn your viral content into valuable NFTs on the Solana blockchain. Create, collect, and trade the internet's most iconic moments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button onClick={() => navigate('/mint')} className="btn-rgb-float animate-glow py-6 px-8 text-lg">
            Mint Your Meme
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button onClick={() => navigate('/gallery')} variant="outline" className="border border-primary hover:bg-primary/10 animate-glow py-6 px-8 text-lg btn-rgb-float-outline">
            Explore Market
          </Button>
        </div>
      </div>
      
      <div className="w-full mt-16 md:mt-24 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="relative w-full aspect-video max-w-4xl mx-auto overflow-hidden rounded-lg glass animate-pulse-glow">
          {/* Replace the static logo with the NFT showcase component */}
          <NFTShowcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
