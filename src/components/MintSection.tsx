
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MintSection = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null as File | null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, file });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a title for your NFT",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    
    // Fake upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload complete!",
        description: "Your image has been uploaded and is ready to mint",
      });
    }, 2000);
  };

  const handleMint = async () => {
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

    // Simulate minting
    setIsMinting(true);
    
    // Fake mint delay
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "NFT Minted!",
        description: "Your meme is now an NFT on the Solana blockchain",
      });
      
      // Clear form after successful mint
      setFormData({
        title: '',
        description: '',
        file: null
      });
      setImagePreview(null);
    }, 3000);
  };

  // Get wallet address
  const getWalletAddress = () => {
    const { solana } = window as any;
    if (solana?.isPhantom && solana.isConnected) {
      const publicKey = solana.publicKey?.toString();
      if (publicKey) {
        return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
      }
    }
    return 'Unknown';
  };

  return (
    <section id="mint" className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Mint Your <span className="text-gradient">Meme NFT</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Turn your favorite meme into a digital collectible on the Solana blockchain in just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold mb-4">Upload Meme Image</h3>
            
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={triggerFileInput}
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, file: null });
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">Click or drag to upload your meme image</p>
                    <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 10MB)</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="file-upload" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    NFT Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a catchy title"
                    className="bg-muted"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell the story behind this meme..."
                    rows={4}
                    className="bg-muted resize-none"
                  />
                </div>

                <Button 
                  type="button" 
                  onClick={triggerFileInput} 
                  className="w-full btn-floating-gradient animate-glow flex items-center justify-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Upload Image
                </Button>

                <Button 
                  type="submit" 
                  className="w-full btn-floating-gradient animate-glow" 
                  disabled={isUploading || !formData.file}
                >
                  {isUploading ? 'Uploading...' : 'Confirm Upload'}
                </Button>
              </form>
            </div>
          </div>

          <div className="glass rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold mb-4">Mint NFT</h3>
            
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Minting Details</h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network</span>
                    <span className="font-medium">Solana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User</span>
                    <span className="font-medium">{getWalletAddress()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Preview</h4>
                
                {imagePreview ? (
                  <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                    <img 
                      src={imagePreview} 
                      alt="NFT Preview" 
                      className="max-h-40 rounded-lg mb-3" 
                    />
                    <p className="font-medium">{formData.title || "Untitled NFT"}</p>
                    {formData.description && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{formData.description}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-gray-400">Upload an image to preview your NFT</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleMint} 
                className="w-full btn-floating-gradient animate-glow flex items-center justify-center gap-2"
                disabled={!imagePreview || isMinting}
              >
                {isMinting ? 'Minting...' : 'Mint NFT'}
                {!isMinting && <Check className="h-5 w-5" />}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                By minting, you confirm that you own the rights to this content and accept our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintSection;
