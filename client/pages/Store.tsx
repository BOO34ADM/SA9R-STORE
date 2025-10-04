import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Store() {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-sa9r-black text-sa9r-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-sa9r-black/90 backdrop-blur-md border-b border-sa9r-black-light">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-wider hover:text-sa9r-red transition-colors">
              SA9R
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingBag className="w-6 h-6 hover:text-sa9r-red cursor-pointer transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sa9r-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Store Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-wider">
            SA9R <span className="text-sa9r-red">STORE</span>
          </h1>
          <p className="text-xl text-sa9r-gray max-w-2xl mx-auto">
            Premium streetwear designed for those who refuse to blend in. 
            Choose your power, embrace your freedom.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* T-Shirts Category */}
            <Link to="/store/tshirts" className="group">
              <div className="relative overflow-hidden rounded-lg bg-sa9r-black-light border border-sa9r-gray/20 hover:border-sa9r-red/50 transition-all duration-300">
                <div className="aspect-square relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F4dc579188f14408996eda05cdb975db0?format=webp&width=800"
                    alt="SA9R T-Shirts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa9r-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-sa9r-red transition-colors">
                      T-SHIRTS
                    </h3>
                    <p className="text-sa9r-gray mb-4">
                      Essential streetwear pieces crafted for everyday rebellion
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold"
                    >
                      SHOP T-SHIRTS
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hoodies Category */}
            <Link to="/store/hoodies" className="group">
              <div className="relative overflow-hidden rounded-lg bg-sa9r-black-light border border-sa9r-gray/20 hover:border-sa9r-red/50 transition-all duration-300">
                <div className="aspect-square relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F62f11c3443fb4996b02b3bc1e8e734c1?format=webp&width=800"
                    alt="SA9R Hoodies"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa9r-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-sa9r-red transition-colors">
                      HOODIES
                    </h3>
                    <p className="text-sa9r-gray mb-4">
                      Premium comfort meets street attitude in every stitch
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold"
                    >
                      SHOP HOODIES
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-16 px-6 bg-sa9r-black-light">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            NEW DROP <span className="text-sa9r-red">AVAILABLE</span>
          </h2>
          <p className="text-sa9r-gray mb-8">
            Limited quantities. Premium quality. Street credibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold px-8"
            >
              <Link to="/store/tshirts">
                SHOP T-SHIRTS
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-sa9r-white text-sa9r-white hover:bg-sa9r-white hover:text-sa9r-black font-bold px-8"
            >
              <Link to="/store/hoodies">
                SHOP HOODIES
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-sa9r-black border-t border-sa9r-black-light">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4">SA9R</div>
          <p className="text-sa9r-gray mb-4">Power. Freedom. Attitude.</p>
        </div>
      </footer>
    </div>
  );
}
