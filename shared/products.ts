// Shared product data for SA9R store
export interface Product {
  id: string;
  category: 'tshirts' | 'hoodies';
  name: string;
  price: string;
  description: string;
  frontImage: string;
  backImage: string;
  colors: string[];
  sizes: string[];
}

export const PRODUCTS: Record<string, Product> = {
  // T-Shirts
  "tshirts-1": {
    id: "1",
    category: "tshirts",
    name: "SA9R 1er",
    price: "129.99 MAD",
    description: "Premium cotton blend with iconic SA9R eagle graphic. Designed for those who embody power, freedom, and attitude.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F236aacc778c34167b7ae0c359cda1068?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2Fa6badf4c687d45b6ad45e4fa5d1bccd0?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  },
  "tshirts-2": {
    id: "2",
    category: "tshirts",
    name: "Heavy SA9R",
    price: "129.99 MAD",
    description: "Bold eagle design representing strength and freedom. Made from 100% organic cotton for maximum comfort.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F236aacc778c34167b7ae0c359cda1068?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F25f5b084d39d4bd09b1a9508bd95e69a?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  },
  "tshirts-3": {
    id: "3",
    category: "tshirts",
    name: "صقر",
    price: "129.99 MAD",
    description: "Clean SA9R logo design with subtle texture details. The perfect foundation piece for any streetwear collection.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F236aacc778c34167b7ae0c359cda1068?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F698142fd5c9d4a899523437e3067beb3?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  },

  // Hoodies
  "hoodies-1": {
    id: "1",
    category: "hoodies",
    name: "SA9R VYRA Hoodie",
    price: "179.99 MAD",
    description: "Heavy-weight premium hoodie with detailed eagle embroidery. Oversized fit for ultimate street style.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F124212c163fd439483e3cc0b7a10af18?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F643ee1d4c0584124a69622ffe44f61be?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  },
  "hoodies-2": {
    id: "2",
    category: "hoodies",
    name: "SA9R RAISEN Hoodie",
    price: "179.99 MAD",
    description: "Signature SA9R design with bold graphics front and back. Premium fleece interior for unmatched comfort.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F124212c163fd439483e3cc0b7a10af18?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F04bd2c6fe8374e1d8113aab874e28c60?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  },
  "hoodies-3": {
    id: "3",
    category: "hoodies",
    name: "SA9R BLAZE Hoodie",
    price: "179.99 MAD",
    description: "Minimalist design with maximum impact. Clean lines and perfect proportions define this essential piece.",
    frontImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2F4e83ec562e6b4826b0e6a2a9d8a8368b?format=webp&width=800",
    backImage: "https://cdn.builder.io/api/v1/image/assets%2F072ea99f44f14065aecadd2d8810c0af%2Ff7248840e2074b42a270306ea2fc9a5f?format=webp&width=800",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"]
  }
};

// Helper functions
export const getProductsByCategory = (category: 'tshirts' | 'hoodies'): Product[] => {
  return Object.values(PRODUCTS).filter(product => product.category === category);
};

export const getProductById = (category: string, id: string): Product | undefined => {
  return PRODUCTS[`${category}-${id}`];
};

export const getAllProducts = (): Product[] => {
  return Object.values(PRODUCTS);
};
