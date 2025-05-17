
export interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  price?: number;
  forSale: boolean;
}
