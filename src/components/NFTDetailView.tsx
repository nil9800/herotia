
import { useState } from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { NFT } from '@/types';
import { X } from 'lucide-react';

interface NFTDetailViewProps {
  nft: NFT;
  onClose: () => void;
}

const NFTDetailView = ({ nft, onClose }: NFTDetailViewProps) => {
  const { toast } = useToast();
  const [isBuying, setIsBuying] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const handleBuyNFT = async () => {
    // Check if wallet is connected
    const { solana } = window as any;
    if (!solana?.isPhantom || !solana.isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Phantom wallet first",
        variant: "destructive"
      });
      return;
    }

    // Simulate buying process
    setIsBuying(true);
    
    // Fake delay to simulate transaction
    setTimeout(() => {
      setIsBuying(false);
      toast({
        title: "Purchase Successful!",
        description: `You've purchased "${nft.title}" for ${nft.price} SOL`,
      });
      onClose();
    }, 2000);
  };

  return (
    <>
      <DialogHeader className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <DialogTitle className="text-2xl font-display font-bold">{nft.title}</DialogTitle>
        <DialogDescription className="text-gray-400">
          NFT ID: {nft.id}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="rounded-lg overflow-hidden glass animate-pulse-glow">
          <img 
            src={nft.image} 
            alt={nft.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-400">{nft.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Creator</span>
              <span className="font-medium">{formatAddress(nft.creator)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span>
                {nft.forSale ? 
                  <Badge variant="outline" className="border-green-500 text-green-500">For Sale</Badge> : 
                  <Badge variant="outline" className="border-gray-500 text-gray-500">Not for Sale</Badge>
                }
              </span>
            </div>
            {nft.forSale && (
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="font-medium text-primary">{nft.price} SOL</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
            {nft.forSale ? (
              <Button 
                onClick={handleBuyNFT} 
                className="w-full btn-gradient animate-glow py-6"
                disabled={isBuying}
              >
                {isBuying ? 'Processing...' : `Buy for ${nft.price} SOL`}
              </Button>
            ) : (
              <Button disabled className="w-full bg-gray-700 text-gray-300 py-6 cursor-not-allowed">
                Not for Sale
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetailView;
