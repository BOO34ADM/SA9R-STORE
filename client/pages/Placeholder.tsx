import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function Placeholder({ title, description, comingSoon = true }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-sa9r-black text-sa9r-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-sa9r-black/90 backdrop-blur-md border-b border-sa9r-black-light">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-wider hover:text-sa9r-red transition-colors">
              SA9R
            </Link>
            <Link to="/" className="text-sa9r-gray hover:text-sa9r-red transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Construction className="w-16 h-16 mx-auto mb-4 text-sa9r-red" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-wider">
            {title}
          </h1>
          
          <p className="text-xl text-sa9r-gray mb-8">
            {description}
          </p>
          
          {comingSoon && (
            <div className="bg-sa9r-black-light border border-sa9r-red/30 rounded-lg p-6 mb-8">
              <p className="text-sa9r-red font-bold text-lg mb-2">
                COMING SOON
              </p>
              <p className="text-sa9r-gray">
                We're working hard to bring you this experience. 
                Stay tuned for updates.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-sa9r-red hover:bg-sa9r-red-dark text-white font-bold px-8"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 w-5 h-5" />
                BACK TO HOME
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-sa9r-white text-sa9r-white hover:bg-sa9r-white hover:text-sa9r-black font-bold px-8"
            >
              NOTIFY ME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
