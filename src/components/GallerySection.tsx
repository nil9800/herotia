
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import NFTCard from './NFTCard';
import NFTDetailView from './NFTDetailView';
import { NFT } from '@/types';

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
  {
    id: '7',
    title: 'Who is she !',
    description: 'When you see her without makeup.',
    image: '/uploads/7.jpg',
    creator: '5xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 2.1,
    forSale: true,
  },
  {
    id: '8',
    title: 'Monday: exists',
    description: 'Monday is the painfull day ever.',
    image: '/uploads/8.jpg',
    creator: '6xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 1.35,
    forSale: true,
  },
  {
    id: '9',
    title: 'Last Option',
    description: 'My last option after getting rejectec by 9999 times.',
    image: '/uploads/9.jpg',
    creator: '4xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 0.9,
    forSale: false,
  },
  {
    id: '10',
    title: 'SUUU... Farming',
    description: 'Hard working suuuu..... farmer.',
    image: '/uploads/10.jpg',
    creator: '3xKXtJ3Gq8Pk2QkA9LMPDzQPWYF2mVPwKmYm6SZbBiTQ',
    price: 3.0,
    forSale: true,
  },
];

type SortOption = 'recent' | 'price-high' | 'price-low' | 'name';

const GallerySection = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [filter, setFilter] = useState<'all' | 'forSale'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  
  // Filter NFTs based on selected filter
  const filteredNFTs = filter === 'all' 
    ? sampleNFTs 
    : sampleNFTs.filter(nft => nft.forSale);

  // Sort NFTs based on selected sort option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return 0; // Assuming the array is already in recent order
    }
  });

  return (
    <section id="gallery" className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            NFT <span className="text-gradient">Market</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore and trade the latest meme NFTs on our platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-primary' : 'border-primary hover:bg-primary/10'}
            >
              All NFTs
            </Button>
            <Button
              variant={filter === 'forSale' ? 'default' : 'outline'}
              onClick={() => setFilter('forSale')}
              className={filter === 'forSale' ? 'bg-primary' : 'border-primary hover:bg-primary/10'}
            >
              For Sale
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px] bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNFTs.map((nft, index) => (
            <div 
              key={nft.id} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <NFTCard 
                nft={nft} 
                onClick={() => setSelectedNFT(nft)} 
              />
            </div>
          ))}
        </div>

        {sortedNFTs.length === 0 && (
          <div className="text-center py-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-400">No NFTs found matching your criteria</p>
          </div>
        )}

        <Dialog open={!!selectedNFT} onOpenChange={(open) => !open && setSelectedNFT(null)}>
          {selectedNFT && (
            <DialogContent className="max-w-3xl glass">
              <NFTDetailView nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
