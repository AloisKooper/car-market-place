
import { Product, Category } from './types';

// REPLACE THIS URL WITH THE LINK TO YOUR UPLOADED LOGO
export const LOGO_URL = 'https://via.placeholder.com/150/D60000/FFFFFF?text=AutoNations+Logo';

export const CATEGORIES: Category[] = [
  {
    id: 'golf7r',
    name: 'Golf 7 R',
    icon: 'Volkswagen',
    image: '/OKS Auto/Golf 7 R.jpg',
    description: 'Explore our premium selection of imported vehicles. From high-performance hatchbacks to luxury sedans, each vehicle is rigorously inspected and verified.'
  },
  {
    id: 'mazda',
    name: 'Mazda Demio',
    icon: 'Mazda',
    image: '/OKS Auto/Mazda Demio 2013.jpg',
    description: 'Upgrade your stance with our collection of alloy wheels and performance tyres. Featuring top brands like Vossen, BBS, and Michelin.'
  },
  {
    id: 'hilux',
    name: 'Toyota Hilux',
    icon: 'Toyota',
    image: '/OKS Auto/Toyota Hilux VVTI 2015.jpg',
    description: 'Illuminate the road ahead with cutting-edge LED and Matrix headlight conversions. Enhanced visibility meets modern aesthetics.'
  },
  {
    id: 'mercedes',
    name: 'Mercedes E200',
    icon: 'Volkswagen', // Fallback as Mercedes icon is unavailable
    image: '/OKS Auto/2016 Mercedes E200.jpg',
    description: 'Experience concert-quality sound. Custom subwoofer enclosures, high-fidelity speakers, and DSP tuning solutions.'
  },
  {
    id: 'audi',
    name: 'Audi A3 TFSI',
    icon: 'Audi',
    image: '/OKS Auto/2016 Audi A3 TFSI.jpg',
    description: 'Transform your vehicle\'s presence with carbon fiber splitters, diffusers, and spoilers. Aerodynamic enhancements for the discerning enthusiast.'
  },
  {
    id: 'amarok',
    name: 'Amarok V6',
    icon: 'Volkswagen',
    image: '/OKS Auto/2016 Amarok V6.jpg',
    description: 'Refine your cockpit with Alcantara trimming, racing seats, and ergonomic upgrades. Comfort and style, perfectly balanced.'
  },
  {
    id: 'pologti',
    name: 'Polo GTI',
    icon: 'Volkswagen',
    image: '/OKS Auto/2015 Polo GTI.jpg',
    description: 'Unlock hidden potential. Intake systems, exhaust upgrades, and ECU tuning to take your driving experience to the next level.'
  },
];

import { siVolkswagen, siAudi, siBmw, siToyota, siHonda, siNissan, siMazda } from 'simple-icons/icons';

export const MAKES = ['Volkswagen', 'Audi', 'BMW', 'Toyota', 'Honda', 'Nissan', 'Mazda'];

export const BRAND_ICONS: Record<string, any> = {
  'Volkswagen': siVolkswagen,
  'Audi': siAudi,
  'BMW': siBmw,
  'Toyota': siToyota,
  'Honda': siHonda,
  'Nissan': siNissan,
  'Mazda': siMazda
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'v1',
    name: '2016 Audi A3 TFSI',
    category: 'vehicles',
    price: 265000,
    image: '/OKS Auto/2016 Audi A3 TFSI.jpg',
    rating: 4.8,
    reviews: 12,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Audi',
    model: 'A3',
    year: 2016,
    mileage: '112,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.4 TFSI',
    zeroToSixty: '8.2s',
    specs: {
      hpGain: 'Stock (125 HP)',
      fitment: 'FWD',
      material: 'Glacier White'
    }
  },
  {
    id: 'v2',
    name: '2015 VW Jetta TSI',
    category: 'vehicles',
    price: 185000,
    image: '/OKS Auto/2015 Jetta TSI.jpg',
    rating: 4.7,
    reviews: 8,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2015,
    mileage: '98,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.4 TSI',
    zeroToSixty: '9.3s',
    specs: {
      hpGain: 'Stock (122 HP)',
      fitment: 'FWD',
      material: 'Platinum Grey'
    }
  },
  {
    id: 'v3',
    name: '2016 Mercedes-Benz E200',
    category: 'vehicles',
    price: 395000,
    image: '/OKS Auto/2016 Mercedes E200.jpg',
    rating: 4.9,
    reviews: 20,
    featured: true,
    shippingInfo: 'In Stock - Swakopmund',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2016,
    mileage: '85,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.0L Turbo',
    zeroToSixty: '7.4s',
    specs: {
      hpGain: 'Stock (184 HP)',
      fitment: 'RWD',
      material: 'Obsidian Black'
    }
  },
  {
    id: 'v4',
    name: '2014 VW Golf 7 TSI',
    category: 'vehicles',
    price: 225000,
    image: '/OKS Auto/2014 Golf 7 TSI.jpg',
    rating: 4.8,
    reviews: 15,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7',
    year: 2014,
    mileage: '105,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.4 TSI',
    zeroToSixty: '8.2s',
    specs: {
      hpGain: 'Stock (140 HP)',
      fitment: 'FWD',
      material: 'Tungsten Silver'
    }
  },
  {
    id: 'v5',
    name: '2009 Nissan Tiida',
    category: 'vehicles',
    price: 85000,
    image: '/OKS Auto/2009 Nissan Tiida.jpg',
    rating: 4.6,
    reviews: 30,
    featured: false,
    shippingInfo: 'In Stock - Walvis Bay',
    make: 'Nissan',
    model: 'Tiida',
    year: 2009,
    mileage: '140,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.5L',
    zeroToSixty: '10.5s',
    specs: {
      hpGain: 'Stock (109 HP)',
      fitment: 'FWD',
      material: 'Silver'
    }
  },
  {
    id: 'v6',
    name: '2015 Toyota Hilux VVTI',
    category: 'vehicles',
    price: 345000,
    image: '/OKS Auto/Toyota Hilux VVTI 2015.jpg',
    rating: 4.8,
    reviews: 18,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Toyota',
    model: 'Hilux',
    year: 2015,
    mileage: '115,000 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    engine: '2.7L VVTI',
    zeroToSixty: '11.0s',
    specs: {
      hpGain: 'Stock (160 HP)',
      fitment: '4x2',
      material: 'White'
    }
  },
  {
    id: 'v7',
    name: 'VW Golf 7 R',
    category: 'vehicles',
    price: 450000,
    image: '/OKS Auto/Golf 7 R.jpg',
    rating: 5.0,
    reviews: 45,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7 R',
    year: 2015,
    mileage: '78,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '2.0 TSI',
    zeroToSixty: '4.9s',
    specs: {
      hpGain: 'Stock (300 HP)',
      fitment: '4Motion AWD',
      material: 'Lapiz Blue'
    }
  },
  {
    id: 'v8',
    name: '2014 VW Golf 7 GTI',
    category: 'vehicles',
    price: 345000,
    image: '/OKS Auto/2014 Golf 7 GTI.jpg',
    rating: 4.9,
    reviews: 38,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7 GTI',
    year: 2014,
    mileage: '88,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '2.0 TSI',
    zeroToSixty: '6.5s',
    specs: {
      hpGain: 'Stock (220 HP)',
      fitment: 'FWD',
      material: 'Pure White'
    }
  },
  {
    id: 'v9',
    name: '2013 Mazda Demio',
    category: 'vehicles',
    price: 95000,
    image: '/OKS Auto/Mazda Demio 2013.jpg',
    rating: 4.9,
    reviews: 14,
    featured: false,
    shippingInfo: 'In Stock - Swakopmund',
    make: 'Mazda',
    model: 'Demio',
    year: 2013,
    mileage: '65,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.3L',
    zeroToSixty: '12.3s',
    specs: {
      hpGain: 'Stock (90 HP)',
      fitment: 'FWD',
      material: 'Blue'
    }
  },
  {
    id: '1',
    name: 'Vossen HF-5 Gloss Black 20"',
    category: 'wheels',
    price: 45000,
    image: '/OKS Auto/2016 Amarok V6.jpg',
    rating: 4.8,
    reviews: 124,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    specs: {
      weight: '9.8kg',
      material: 'Forged Aluminum',
      fitment: '5x112'
    }
  },
  {
    id: '2',
    name: 'LED Matrix Headlight Kit',
    category: 'lighting',
    price: 15500,
    image: '/OKS Auto/2015 Polo GTI.jpg',
    rating: 4.6,
    reviews: 89,
    featured: true,
    shippingInfo: 'Import Order - China (14 Days)',
    specs: {
      material: 'Polycarbonate',
      fitment: 'OEM Replacement'
    }
  },
  {
    id: '3',
    name: 'Carbon Fiber Rear Diffuser',
    category: 'exterior',
    price: 22000,
    image: '/OKS Auto/Golf 7 R.jpg',
    rating: 4.9,
    reviews: 45,
    featured: true,
    shippingInfo: 'In Stock - Swakopmund',
    specs: {
      weight: '-2.5kg vs Stock',
      material: 'Dry Carbon',
      fitment: 'Direct Bolt-on'
    }
  },
  {
    id: '4',
    name: 'Pioneer 10" Subwoofer System',
    category: 'audio',
    price: 6500,
    image: '/OKS Auto/2015 Polo GTI.jpg',
    rating: 4.7,
    reviews: 210,
    featured: false,
    shippingInfo: 'In Stock - Windhoek'
  },
  {
    id: '5',
    name: 'Recaro Sportster CS',
    category: 'interior',
    price: 18500,
    image: '/OKS Auto/2014 Golf 7 GTI.jpg',
    rating: 4.5,
    reviews: 30,
    featured: false,
    shippingInfo: 'Import Order - Germany (21 Days)',
    specs: {
      weight: '14kg',
      material: 'Fabric/Steel',
      fitment: 'Universal Rails'
    }
  },
  {
    id: '6',
    name: 'HKS Hi-Power Exhaust System',
    category: 'performance',
    price: 18900,
    image: '/OKS Auto/Golf 7 R.jpg',
    rating: 4.9,
    reviews: 156,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    specs: {
      hpGain: '+12 HP',
      weight: '-8kg',
      material: 'Titanium Tips',
      fitment: 'Cat-back'
    }
  },
  {
    id: '7',
    name: 'Brembo GT Brake Kit',
    category: 'performance',
    price: 35000,
    image: '/OKS Auto/2016 Audi A3 TFSI.jpg',
    rating: 5.0,
    reviews: 12,
    featured: false,
    shippingInfo: 'Import Order - Italy (30 Days)',
    specs: {
      weight: '-4kg',
      material: 'Ceramic',
      fitment: 'Front Axle'
    }
  },
  {
    id: '8',
    name: 'Alcantara Steering Wheel',
    category: 'interior',
    price: 8500,
    image: '/OKS Auto/2015 Polo GTI.jpg',
    rating: 4.8,
    reviews: 67,
    featured: false,
    shippingInfo: 'In Stock - Windhoek'
  }
];

export const PERFORMANCE_HIGHLIGHTS = [
  {
    id: 'p1',
    name: 'Golf 7 R',
    price: 450000,
    image: '/OKS Auto/Golf 7 R.jpg',
    description: 'The ultimate hot hatch. 300HP, 4Motion all-wheel drive, and a 0-60 time of 4.9 seconds. Engineered for pure driving pleasure.',
    specs: [
      { label: 'Engine', value: '2.0L Turbo', progress: 90, description: 'High-output TSI engine.' },
      { label: 'Power', value: '300 HP', progress: 85, description: 'Peak power at 5500 RPM.' },
      { label: '0-60 mph', value: '4.9s', progress: 95, description: 'Launch control enabled.' }
    ]
  },
  {
    id: 'p2',
    name: 'Polo GTI',
    price: 220000,
    image: '/OKS Auto/2015 Polo GTI.jpg',
    description: 'Compact performance. 1.8L TSI engine delivering punchy acceleration and agile handling. The perfect daily driver with a sporty edge.',
    specs: [
      { label: 'Engine', value: '1.8L TSI', progress: 75, description: 'Responsive turbocharged power.' },
      { label: 'Power', value: '189 HP', progress: 70, description: 'Dynamic performance.' },
      { label: 'Torque', value: '320 Nm', progress: 75, description: 'Strong mid-range pull.' }
    ]
  },
  {
    id: 'p3',
    name: 'Amarok V6',
    price: 485000,
    image: '/OKS Auto/2016 Amarok V6.jpg',
    description: 'Power and utility. 3.0L V6 TDI engine with class-leading torque and towing capacity. Built for the toughest terrain.',
    specs: [
      { label: 'Engine', value: '3.0L V6', progress: 95, description: 'Powerful V6 TDI engine.' },
      { label: 'Torque', value: '550 Nm', progress: 100, description: 'Massive pulling power.' },
      { label: 'Towing', value: '3.5 Tons', progress: 90, description: 'Heavy-duty towing capability.' }
    ]
  }
];

export const PRICE_RANGES = [
  { id: 'u5', label: 'Under N$ 5,000', min: 0, max: 4999 },
  { id: '5-15', label: 'N$ 5,000 - 15,000', min: 5000, max: 15000 },
  { id: '15-30', label: 'N$ 15,000 - 30,000', min: 15001, max: 30000 },
  { id: 'o30', label: 'Over N$ 30,000', min: 30001, max: Infinity },
];

export const HERO_BG_IMAGE = '/OKS Auto/Hero Image.jpg';
