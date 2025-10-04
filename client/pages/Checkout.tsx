import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingBag, CreditCard, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getCartCount, setCustomer, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create customer object
    const customer = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.street}, ${formData.city} ${formData.postalCode}`,
      city: formData.city
    };

    // Save customer data
    setCustomer(customer);

    // Send order to backend API
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          customer: customer,
          total: getTotalPrice()
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created successfully:', result);

        // Clear cart and show success
        clearCart();
        setOrderComplete(true);
        setIsProcessing(false);

        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setIsProcessing(false);
      setError('Failed to process order. Please try again.');
    }
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-sa9r-black text-sa9r-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/store" className="text-sa9r-red hover:underline">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-sa9r-black text-sa9r-white flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Check className="w-16 h-16 mx-auto mb-4 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-wider">
            ORDER <span className="text-sa9r-red">CONFIRMED</span>
          </h1>
          <p className="text-xl text-sa9r-gray mb-8">
            Thank you for your order! You'll receive a confirmation email shortly.
            Your SA9R gear will be with you soon.
          </p>
          <p className="text-sa9r-gray">
            Redirecting you to the homepage...
          </p>
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

      {/* Checkout Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button asChild variant="ghost" size="sm" className="text-sa9r-gray hover:text-sa9r-red">
              <Link to="/cart">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-wider">
            CHECK<span className="text-sa9r-red">OUT</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Customer Information Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sa9r-white">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sa9r-white">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email" className="text-sa9r-white">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="phone" className="text-sa9r-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="street" className="text-sa9r-white">Street Address *</Label>
                      <Input
                        id="street"
                        name="street"
                        type="text"
                        required
                        value={formData.street}
                        onChange={handleInputChange}
                        className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sa9r-white">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="text-sa9r-white">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray mt-2"
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>
                    {/* WhatsApp Payment Message */}
                    <div className="bg-sa9r-black-light border border-sa9r-red/30 rounded-lg p-4 mt-6">
                      <p className="text-sa9r-white mb-3">
                        Welcome to our store! We'll sort out the payment after talking on WhatsApp.
                      </p>
                      <p className="text-sa9r-gray text-sm">
                        By placing this order, you agree to our terms and conditions. (Enjoy free shipping on all orders within Kenitra)
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                    <p className="text-red-400 text-center">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold py-4 text-lg disabled:opacity-50"
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  {isProcessing ? "PROCESSING ORDER..." : "COMPLETE ORDER"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-sa9r-black-light rounded-lg p-6 border border-sa9r-gray/20 sticky top-32">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-sa9r-black rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-sa9r-gray">{item.color} / {item.size}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sa9r-red">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mb-6 border-t border-sa9r-gray/20 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>{getTotalPrice().toFixed(2)} MAD</span>
                  </div>
                  <div className="border-t border-sa9r-gray/20 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-sa9r-red">{getTotalPrice().toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
