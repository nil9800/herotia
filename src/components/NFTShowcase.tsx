
import { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { NFT } from '@/types';
import { Badge } from './ui/badge';

// Using the updated NFT data with the correct image paths
const sampleNFTs: NFT[] = [
  {
    id: '1',
    title: 'Begula',
    description: 'Trust me bro I am just a cat.',
    image: '/uploads/1.jpg',
    creator: '7xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 1.2,
    forSale: true,
  },
  {
    id: '2',
    title: 'Wi-Fi Sucks',
    description: 'When your boss asks you to fix the code but your Wi-Fi sucks.',
    image: '/uploads/2.jpg',
    creator: '8xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 0.8,
    forSale: true,
  },
  {
    id: '3',
    title: 'Finishing Physics Syllabus',
    description: 'When you try to finish your physics syllabus.',
    image: '/uploads/3.jpg',
    creator: '9xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 2.5,
    forSale: false,
  },
  {
    id: '4',
    title: 'Calling me!',
    description: 'When see calls me for the first time.',
    image: '/uploads/4.jpg',
    creator: '7xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 1.5,
    forSale: true,
  },
  {
    id: '5',
    title: 'Burgir..',
    description: 'Brand ambasador of burgir meme.',
    image: '/uploads/5.jpg',
    creator: '8xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 0.95,
    forSale: true,
  },
  {
    id: '6',
    title: 'Donald loves money',
    description: 'Who don\'t love money, I love money... they are beautifull, very beautifull.',
    image: '/uploads/6.jpg',
    creator: '9xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 1.8,
    forSale: false,
  },
];

const NFTShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Auto-rotate carousel
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % sampleNFTs.length);
      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full h-full">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {sampleNFTs.map((nft, index) => (
            <CarouselItem key={nft.id}>
              <div className="relative overflow-hidden rounded-lg bg-background/30 p-1">
                <AspectRatio ratio={16/9}>
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <img 
                      src={nft.image} 
                      alt={nft.title}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    />
                    {nft.forSale && (
                      <Badge className="absolute top-3 right-3 bg-primary animate-pulse-glow">
                        {nft.price} SOL
                      </Badge>
                    )}
                  </div>
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-lg font-medium text-white">{nft.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-1">{nft.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-300">Creator: {formatAddress(nft.creator)}</span>
                    {nft.forSale ? (
                      <Badge variant="outline" className="border-green-500 text-green-500 bg-green-500/10">
                        For Sale
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-400 text-gray-400 bg-gray-400/10">
                        Not for Sale
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-2 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
    </div>
  );
};

export default NFTShowcase;
