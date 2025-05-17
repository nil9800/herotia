
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";

const Rewards = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-herotia-orange to-herotia-red mb-6 animate-pulse-glow">
              <Award size={48} className="text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              <span className="herotia-text">Rewards</span> Program
            </h1>
            
            <div className="relative">
              <div className="glass p-8 md:p-12 rounded-xl border border-primary/20 animate-pulse-glow">
                <div className="absolute -top-3 -right-3 bg-primary/10 px-4 py-1 rounded-full text-xs text-primary border border-primary/30">
                  Coming Soon
                </div>
                
                <h2 className="text-2xl md:text-3xl font-display mb-6">Earn While You Create</h2>
                
                <p className="text-lg text-gray-300 mb-8">
                  Our revolutionary rewards system will allow creators to earn tokens for their contributions,
                  collectors to gain benefits for their support, and community members to be recognized for their participation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="p-6 rounded-lg glass border border-primary/20 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-herotia-orange to-herotia-red flex items-center justify-center">
                      <span className="font-bold text-white">1</span>
                    </div>
                    <h3 className="font-display font-bold mb-2">Create</h3>
                    <p className="text-sm text-gray-400">Mint your NFTs and start earning rewards</p>
                  </div>
                  
                  <div className="p-6 rounded-lg glass border border-primary/20 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-herotia-orange to-herotia-red flex items-center justify-center">
                      <span className="font-bold text-white">2</span>
                    </div>
                    <h3 className="font-display font-bold mb-2">Collect</h3>
                    <p className="text-sm text-gray-400">Build your collection and increase your tier</p>
                  </div>
                  
                  <div className="p-6 rounded-lg glass border border-primary/20 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-herotia-orange to-herotia-red flex items-center justify-center">
                      <span className="font-bold text-white">3</span>
                    </div>
                    <h3 className="font-display font-bold mb-2">Redeem</h3>
                    <p className="text-sm text-gray-400">Use your rewards for exclusive benefits</p>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <Button 
                    onClick={() => navigate('/mint')} 
                    className="btn-rgb-float animate-glow py-6 px-8 text-lg"
                  >
                    Start Creating Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-primary/5 blur-xl rounded-full"></div>
            </div>
            
            <p className="text-gray-400 mt-8">
              Subscribe to our newsletter to be the first to know when our rewards program launches!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rewards;
