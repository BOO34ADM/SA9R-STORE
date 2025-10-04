import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Plus, Minus, Heart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "../../shared/products";

export default function ProductDetail() {
  const { category, id } = useParams();
  const { addToCart, getCartCount } = useCart();
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("front");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Get product using shared data
  const currentProduct = getProductById(category!, id!);

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-sa9r-black text-sa9r-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/store" className="text-sa9r-red hover:underline">Back to Store</Link>
        </div>
      </div>
    );
  }

  const colors = currentProduct.colors;
  const sizes = currentProduct.sizes;
  const frontImage = currentProduct.frontImage;
  const backImage = currentProduct.backImage;

  const handleAddToCart = async () => {
    if (!currentProduct) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart({
      category: category!,
      name: currentProduct.name,
      price: currentProduct.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: frontImage
    });
    
    setIsAddingToCart(false);
    setShowAddedMessage(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-sa9r-black text-sa9r-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <p className="text-sa9r-gray mb-4">Looking for: {category}/{id}</p>
          <Link to="/store" className="text-sa9r-red hover:underline">
            Back to Store
          </Link>
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

      {/* Product Detail */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm">
            <Link to="/store" className="text-sa9r-gray hover:text-sa9r-red transition-colors">Store</Link>
            <span className="mx-2 text-sa9r-gray">/</span>
            <Link to={`/store/${category}`} className="text-sa9r-gray hover:text-sa9r-red transition-colors capitalize">
              {category}
            </Link>
            <span className="mx-2 text-sa9r-gray">/</span>
            <span className="text-sa9r-white">{currentProduct.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-sa9r-black-light rounded-lg overflow-hidden">
                <img 
                  src={currentImage === "front" ? frontImage : backImage}
                  alt={`${currentProduct.name} - ${currentImage}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentImage("front")}
                  className={`flex-1 aspect-square bg-sa9r-black-light rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === "front" ? "border-sa9r-red" : "border-transparent"
                  }`}
                >
                  <img 
                    src={frontImage}
                    alt={`${currentProduct.name} - Front`}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-2 text-center text-sm">Front</div>
                </button>
                <button
                  onClick={() => setCurrentImage("back")}
                  className={`flex-1 aspect-square bg-sa9r-black-light rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === "back" ? "border-sa9r-red" : "border-transparent"
                  }`}
                >
                  <img 
                    src={backImage}
                    alt={`${currentProduct.name} - Back`}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-2 text-center text-sm">Back</div>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-wider">
                  {currentProduct.name}
                </h1>
                <p className="text-3xl font-black text-sa9r-red mb-6">
                  {currentProduct.price}
                </p>
                <p className="text-lg text-sa9r-gray leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-bold mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? "border-sa9r-red scale-110" 
                          : "border-sa9r-gray hover:border-sa9r-red"
                      } ${color === 'Black' ? 'bg-black' : 'bg-white'}`}
                      title={color}
                    >
                      {selectedColor === color && (
                        <div className="w-full h-full rounded-full border-2 border-sa9r-white opacity-50"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-bold mb-3">Size: {selectedSize}</h3>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-bold transition-all ${
                        selectedSize === size
                          ? "border-sa9r-red bg-sa9r-red text-white"
                          : "border-sa9r-gray text-sa9r-gray hover:border-sa9r-red hover:text-sa9r-red"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-sa9r-gray rounded-lg flex items-center justify-center hover:border-sa9r-red transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-sa9r-gray rounded-lg flex items-center justify-center hover:border-sa9r-red transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 pt-6">
                {showAddedMessage && (
                  <div className="bg-green-600/20 border border-green-600 rounded-lg p-3 flex items-center gap-2 animate-fade-in">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Added to cart successfully!</span>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold py-4 text-lg disabled:opacity-50"
                  >
                    {isAddingToCart ? "ADDING..." : "ADD TO CART"}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-sa9r-gray text-sa9r-gray hover:border-sa9r-red hover:text-sa9r-red p-4"
                  >
                    <Heart className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t border-sa9r-black-light">
                <h3 className="text-lg font-bold mb-3">Product Details</h3>
                <ul className="space-y-2 text-sa9r-gray">
                  <li>• 100% Premium Cotton</li>
                  <li>• Heavyweight 200gsm fabric</li>
                  <li>• Pre-shrunk for consistent fit</li>
                  <li>• Screen printed graphics</li>
                  <li>• Made in Maroc</li>
                </ul>
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
