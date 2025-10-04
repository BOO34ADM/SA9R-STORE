import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getCartCount } = useCart();

  if (cartItems.length === 0) {
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
                  <ShoppingBag className="w-6 h-6 text-sa9r-red cursor-pointer transition-colors" />
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

        {/* Empty Cart */}
        <div className="pt-32 min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-2xl mx-auto">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-sa9r-gray" />
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-wider">
              YOUR CART IS <span className="text-sa9r-red">EMPTY</span>
            </h1>
            <p className="text-xl text-sa9r-gray mb-8">
              Ready to make a statement? Browse our collection and add some power to your wardrobe.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold px-8"
            >
              <Link to="/store">
                <ArrowLeft className="mr-2 w-5 h-5" />
                CONTINUE SHOPPING
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                <ShoppingBag className="w-6 h-6 text-sa9r-red cursor-pointer transition-colors" />
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

      {/* Cart Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button asChild variant="ghost" size="sm" className="text-sa9r-gray hover:text-sa9r-red">
              <Link to="/store">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-wider">
            YOUR <span className="text-sa9r-red">CART</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-sa9r-black-light rounded-lg p-6 border border-sa9r-gray/20">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-sa9r-black rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-sa9r-gray mb-2 capitalize">{item.category}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm">Color: {item.color}</span>
                        <span className="text-sm">Size: {item.size}</span>
                      </div>
                      <p className="text-xl font-bold text-sa9r-red">{item.price}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sa9r-gray hover:text-sa9r-red transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-sa9r-gray rounded flex items-center justify-center hover:border-sa9r-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-sa9r-gray rounded flex items-center justify-center hover:border-sa9r-red transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-sa9r-black-light rounded-lg p-6 border border-sa9r-gray/20 sticky top-32">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Items ({getCartCount()})</span>
                    <span>{getTotalPrice().toFixed(2)} MAD</span>
                  </div>
                  <div className="border-t border-sa9r-gray/20 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-sa9r-red">{getTotalPrice().toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  asChild
                  size="lg" 
                  className="w-full bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold py-4 text-lg mb-4"
                >
                  <Link to="/checkout">
                    PROCEED TO CHECKOUT
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="w-full border-sa9r-white text-sa9r-white hover:bg-sa9r-white hover:text-sa9r-black font-bold"
                >
                  <Link to="/store">
                    CONTINUE SHOPPING
                  </Link>
                </Button>
              </div>
            </div>
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
