import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Lock, Mail, Instagram, Youtube } from "lucide-react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const latestImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2Fa6badf4c687d45b6ad45e4fa5d1bccd0?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F643ee1d4c0584124a69622ffe44f61be?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F698142fd5c9d4a899523437e3067beb3?format=webp&width=800'
  ];

  return (
    <div className="min-h-screen bg-sa9r-black text-sa9r-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-sa9r-black/90 backdrop-blur-md border-b border-sa9r-black-light">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-wider">
              SA9R
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/_sa9r_59_?igsh=MTh2OHNweThiZGl6Nw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 hover:text-sa9r-red cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 sa9r-gritty-bg"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2Fe7fc9e08c3e04dfaa03ecda55c37f7c4?format=webp&width=800')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sa9r-black/50 to-sa9r-black"></div>
        
        <div className="relative z-10 text-center px-6 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black tracking-wider mb-6 sa9r-text-shadow">
            SA9R
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-sa9r-gray max-w-2xl mx-auto">
            Eagles are magnificent birds of prey, known for their strength, sharp vision, and regal appearance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold px-8 py-4 animate-glow"
            >
              <Link to="/store">
                SHOP NOW
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-6 sa9r-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                BORN FROM THE 
                <span className="text-sa9r-red"> STREETS</span>
              </h2>
              <p className="text-lg text-sa9r-gray mb-6 leading-relaxed">
                SA9R represents the spirit of the eagle - soaring above limitations, 
                embracing freedom, and commanding respect. We don't follow trends, 
                we create them.
              </p>
              <p className="text-lg text-sa9r-gray mb-8 leading-relaxed">
                Born from the concrete jungle, inspired by rebellion, 
                and crafted for those who refuse to blend in.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3114954/pexels-photo-3114954.jpeg"
                alt="Eagle soaring - SA9R inspiration"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-sa9r-red/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Teaser */}
      <section className="py-20 px-6 bg-sa9r-black-light">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12">
            LATEST <span className="text-sa9r-red">DROP</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={latestImages[item - 1]}
                    alt="Latest Drop"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa9r-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-sa9r-red text-sa9r-red hover:bg-sa9r-red hover:text-white font-bold px-12"
            >
              <Link to="/store">
                SHOP ALL
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-sa9r-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            STAY <span className="text-sa9r-red">UPDATED</span>
          </h2>
          <p className="text-xl text-sa9r-gray mb-8">
            Get early access to exclusive content and SA9R events.
          </p>
          
          {isSubscribed ? (
            <div className="bg-sa9r-red/20 border border-sa9r-red rounded-lg p-6 animate-fade-in">
              <p className="text-sa9r-red font-bold text-lg">
                ��� You're on the list. Stay ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-sa9r-black-light border-sa9r-gray text-white placeholder:text-sa9r-gray"
                required
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold px-8"
              >
                <Mail className="mr-2 w-5 h-5" />
                JOIN
              </Button>
            </form>
          )}
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 px-6 bg-sa9r-black border-t border-sa9r-black-light">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SA9R</h3>
              <p className="text-sa9r-gray">
                Power. Freedom. Attitude.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">SHOP</h4>
              <ul className="space-y-2 text-sa9r-gray">
                <li><Link to="/store" className="hover:text-sa9r-red transition-colors">Store</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">BRAND</h4>
              <ul className="space-y-2 text-sa9r-gray">
                <li><Link to="/contact" className="hover:text-sa9r-red transition-colors">Contact</Link></li>
                <li><Link to="/size-guide" className="hover:text-sa9r-red transition-colors">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">FOLLOW</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/_sa9r_59_?igsh=MTh2OHNweThiZGl6Nw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 hover:text-sa9r-red cursor-pointer transition-colors" />
                </a>
                <Youtube className="w-6 h-6 hover:text-sa9r-red cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-sa9r-black-light text-center text-sa9r-gray">
            <p>&copy; 2024 SA9R. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
