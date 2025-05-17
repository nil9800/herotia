
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NFT } from '@/types';

interface NFTCardProps {
  nft: NFT;
  onClick: () => void;
}

const NFTCard = ({ nft, onClick }: NFTCardProps) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Card 
      className="glass overflow-hidden cursor-pointer hover:shadow-[0_0_15px_0_rgba(30,174,219,0.3)] transition-all duration-300 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={nft.image} 
          alt={nft.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {nft.forSale && (
          <Badge className="absolute top-3 right-3 bg-primary animate-pulse-glow">
            {nft.price} SOL
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-medium mb-1">{nft.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{nft.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center text-sm text-gray-400">
          <span>Creator: {formatAddress(nft.creator)}</span>
          {nft.forSale ? 
            <Badge variant="outline" className="border-green-500 text-green-500">
              For Sale
            </Badge> : 
            <Badge variant="outline" className="border-gray-500 text-gray-500">
              Not for Sale
            </Badge>
          }
        </div>
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
