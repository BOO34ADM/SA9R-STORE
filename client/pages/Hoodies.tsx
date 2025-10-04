import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { getProductsByCategory } from "../../shared/products";

export default function Hoodies() {
  const products = getProductsByCategory('hoodies');

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
              <ShoppingBag className="w-6 h-6 hover:text-sa9r-red cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="sm" className="text-sa9r-gray hover:text-sa9r-red">
              <Link to="/store">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-wider">
            HOOD<span className="text-sa9r-red">IES</span>
          </h1>
          <p className="text-xl text-sa9r-gray max-w-2xl">
            Premium comfort meets street attitude in every stitch. 
            Heavy-weight cotton, bold graphics, ultimate street credibility.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product.id} 
                to={`/store/hoodies/${product.id}`} 
                className="group"
              >
                <div className="bg-sa9r-black-light rounded-lg overflow-hidden border border-sa9r-gray/20 hover:border-sa9r-red/50 transition-all duration-300">
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={product.frontImage}
                      alt={`${product.name} - Front`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-sa9r-black/80 backdrop-blur-sm rounded-full p-2">
                        <Star className="w-4 h-4 text-sa9r-red" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-sa9r-red/0 group-hover:bg-sa9r-red/10 transition-colors duration-300"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sa9r-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-black text-sa9r-red mb-4">
                      {product.price}
                    </p>
                    
                    {/* Available Colors */}
                    <div className="mb-4">
                      <p className="text-sm text-sa9r-gray mb-2">Colors:</p>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <div 
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 border-sa9r-gray ${
                              color === 'Black' ? 'bg-black' : 'bg-white'
                            }`}
                            title={color}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Available Sizes */}
                    <div className="mb-4">
                      <p className="text-sm text-sa9r-gray mb-2">Sizes:</p>
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <span 
                            key={size}
                            className="px-3 py-1 bg-sa9r-black border border-sa9r-gray text-sm rounded"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold"
                    >
                      VIEW DETAILS
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
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
