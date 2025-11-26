
import { Product, Category } from './types';

// REPLACE THIS URL WITH THE LINK TO YOUR UPLOADED LOGO
export const LOGO_URL = 'https://via.placeholder.com/150/D60000/FFFFFF?text=AutoNations+Logo';

export const CATEGORIES: Category[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    image: '/Auto Nations/2015 Golf 7 R.jpg',
    description: 'Explore our premium selection of imported vehicles. From high-performance hatchbacks to luxury sedans, each vehicle is rigorously inspected and verified.'
  },
  {
    id: 'wheels',
    name: 'Wheels & Tyres',
    icon: 'Disc',
    image: '/Auto Nations/Wheels & Tyres.jpg',
    description: 'Upgrade your stance with our collection of alloy wheels and performance tyres. Featuring top brands like Vossen, BBS, and Michelin.'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: 'Lightbulb',
    image: '/Auto Nations/Lighting.png',
    description: 'Illuminate the road ahead with cutting-edge LED and Matrix headlight conversions. Enhanced visibility meets modern aesthetics.'
  },
  {
    id: 'audio',
    name: 'Car Audio',
    icon: 'Speaker',
    image: '/Auto Nations/Car Audio.jpg',
    description: 'Experience concert-quality sound. Custom subwoofer enclosures, high-fidelity speakers, and DSP tuning solutions.'
  },
  {
    id: 'exterior',
    name: 'Exterior Styling',
    icon: 'Component',
    image: '/Auto Nations/Exterio Styling.jpg',
    description: 'Transform your vehicle\'s presence with carbon fiber splitters, diffusers, and spoilers. Aerodynamic enhancements for the discerning enthusiast.'
  },
  {
    id: 'interior',
    name: 'Interior',
    icon: 'Armchair',
    image: '/Auto Nations/Interior.jpg',
    description: 'Refine your cockpit with Alcantara trimming, racing seats, and ergonomic upgrades. Comfort and style, perfectly balanced.'
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'Zap',
    image: '/Auto Nations/2015 Golf 7 R.jpg',
    description: 'Unlock hidden potential. Intake systems, exhaust upgrades, and ECU tuning to take your driving experience to the next level.'
  },
];

import { siVolkswagen, siAudi, siBmw, siToyota, siHonda, siNissan } from 'simple-icons/icons';

export const MAKES = ['Volkswagen', 'Audi', 'BMW', 'Toyota', 'Mercedes-Benz', 'Honda', 'Nissan'];

export const BRAND_ICONS: Record<string, any> = {
  'Volkswagen': siVolkswagen,
  'Audi': siAudi,
  'BMW': siBmw,
  'Toyota': siToyota,
  'Honda': siHonda,
  'Nissan': siNissan
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'v1',
    name: '2014 Audi A5',
    category: 'vehicles',
    price: 265000,
    image: '/Auto Nations/Audi A5 2014.jpg',
    rating: 4.8,
    reviews: 12,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Audi',
    model: 'A5',
    year: 2014,
    mileage: '112,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.0 TFSI',
    zeroToSixty: '6.4s',
    specs: {
      hpGain: 'Stock (220 HP)',
      fitment: 'Quattro AWD',
      material: 'Phantom Black'
    }
  },
  {
    id: 'v2',
    name: '2017 VW Jetta 6',
    category: 'vehicles',
    price: 185000,
    image: '/Auto Nations/2017 Jetta6.jpg',
    rating: 4.7,
    reviews: 8,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2017,
    mileage: '98,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.4 TSI',
    zeroToSixty: '8.9s',
    specs: {
      hpGain: 'Stock (148 HP)',
      fitment: 'FWD',
      material: 'Platinum Grey'
    }
  },
  {
    id: 'v3',
    name: '2016 Mercedes-Benz A200',
    category: 'vehicles',
    price: 295000,
    image: '/Auto Nations/2016 Mercedes A200.jpg',
    rating: 4.9,
    reviews: 20,
    featured: true,
    shippingInfo: 'In Stock - Swakopmund',
    make: 'Mercedes-Benz',
    model: 'A-Class',
    year: 2016,
    mileage: '85,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.6L Turbo',
    zeroToSixty: '7.8s',
    specs: {
      hpGain: 'Stock (154 HP)',
      fitment: 'FWD',
      material: 'Cirrus White'
    }
  },
  {
    id: 'v4',
    name: '2016 VW Golf 7 TSI',
    category: 'vehicles',
    price: 225000,
    image: '/Auto Nations/2016 Golf 7 TSi.jpg',
    rating: 4.8,
    reviews: 15,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7',
    year: 2016,
    mileage: '105,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.4 TSI',
    zeroToSixty: '8.2s',
    specs: {
      hpGain: 'Stock (148 HP)',
      fitment: 'FWD',
      material: 'Tungsten Silver'
    }
  },
  {
    id: 'v5',
    name: '2015 Nissan Note',
    category: 'vehicles',
    price: 115000,
    image: '/Auto Nations/2015 Nissan Note.jpg',
    rating: 4.6,
    reviews: 30,
    featured: false,
    shippingInfo: 'In Stock - Walvis Bay',
    make: 'Nissan',
    model: 'Note',
    year: 2015,
    mileage: '120,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.2L DIG-S',
    zeroToSixty: '11.5s',
    specs: {
      hpGain: 'Stock (98 HP)',
      fitment: 'FWD',
      material: 'Sonic Blue'
    }
  },
  {
    id: 'v6',
    name: '2015 Mercedes-Benz A180',
    category: 'vehicles',
    price: 245000,
    image: '/Auto Nations/2015 Mercedes Benz A180.jpg',
    rating: 4.8,
    reviews: 18,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Mercedes-Benz',
    model: 'A-Class',
    year: 2015,
    mileage: '95,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.6L Turbo',
    zeroToSixty: '9.1s',
    specs: {
      hpGain: 'Stock (120 HP)',
      fitment: 'FWD',
      material: 'Jupiter Red'
    }
  },
  {
    id: 'v7',
    name: '2015 VW Golf 7 R',
    category: 'vehicles',
    price: 420000,
    image: '/Auto Nations/2015 Golf 7 R.jpg',
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
      hpGain: 'Stock (296 HP)',
      fitment: '4Motion AWD',
      material: 'Lapiz Blue'
    }
  },
  {
    id: 'v8',
    name: '2015 VW Golf 7 GTI',
    category: 'vehicles',
    price: 345000,
    image: '/Auto Nations/2015 Golf 7 GTi.jpg',
    rating: 4.9,
    reviews: 38,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7 GTI',
    year: 2015,
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
    name: '2015 Audi TT',
    category: 'vehicles',
    price: 385000,
    image: '/Auto Nations/2015 Audi TT.jpg',
    rating: 4.9,
    reviews: 14,
    featured: true,
    shippingInfo: 'In Stock - Swakopmund',
    make: 'Audi',
    model: 'TT',
    year: 2015,
    mileage: '65,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '2.0 TFSI',
    zeroToSixty: '5.3s',
    specs: {
      hpGain: 'Stock (230 HP)',
      fitment: 'Quattro AWD',
      material: 'Nano Grey'
    }
  },
  {
    id: '1',
    name: 'Vossen HF-5 Gloss Black 20"',
    category: 'wheels',
    price: 45000,
    image: '/Auto Nations/Wheels & Tyres.jpg',
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
    image: '/Auto Nations/Lighting.png',
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
    image: '/Auto Nations/Exterio Styling.jpg',
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
    image: '/Auto Nations/Car Audio.jpg',
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
    image: '/Auto Nations/Interior.jpg',
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
    image: '/Auto Nations/Exterio Styling.jpg',
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
    image: '/Auto Nations/Wheels & Tyres.jpg',
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
    image: '/Auto Nations/Interior.jpg',
    rating: 4.8,
    reviews: 67,
    featured: false,
    shippingInfo: 'In Stock - Windhoek'
  }
];

export const PERFORMANCE_HIGHLIGHTS = [
  {
    id: 'p1',
    name: 'Akrapovič Titanium Exhaust',
    price: 45000,
    image: '/Auto Nations/Exterio Styling.jpg',
    description: 'Constructed from ultra-lightweight high-grade titanium, this system provides a weight savings of over 40% compared to stock. Tuned resonators deliver a deep, aggressive exhaust note without drone.',
    specs: [
      { label: 'Weight Savings', value: '-8.4 kg', progress: 85, description: 'Significant reduction in unsprung mass.' },
      { label: 'Power Gain', value: '+12.5 hp', progress: 60, description: 'Dyno-proven gains at 4500 RPM.' },
      { label: 'Torque Gain', value: '+14.2 Nm', progress: 65, description: 'Improved throttle response.' }
    ]
  },
  {
    id: 'p2',
    name: 'Bilstein B16 Coilovers',
    price: 32000,
    image: '/Auto Nations/Wheels & Tyres.jpg',
    description: 'Track-tested suspension with 10-stage damping adjustment. Parallel mechanical adjustment of rebound and compression by an adjustment wheel in the installed state.',
    specs: [
      { label: 'Lowering', value: '30-50mm', progress: 75, description: 'Adjustable ride height range.' },
      { label: 'Damping', value: '10-Way', progress: 90, description: 'Dual-click adjustment system.' },
      { label: 'Material', value: 'Triple-C', progress: 80, description: 'Zinc-nickel coating for corrosion resistance.' }
    ]
  },
  {
    id: 'p3',
    name: 'Eventuri Carbon Intake',
    price: 28500,
    image: '/Auto Nations/2015 Golf 7 R.jpg',
    description: 'Patented housing design provides an aerodynamically efficient airflow path from the filter to the MAF tube. Not just another cone filter with a heat shield.',
    specs: [
      { label: 'Airflow', value: '+45 CFM', progress: 88, description: 'Increased volume over stock airbox.' },
      { label: 'Temp Drop', value: '-12°C', progress: 70, description: 'Lower intake air temperatures.' },
      { label: 'Material', value: 'Pre-preg Carbon', progress: 95, description: 'Autoclaved carbon fiber construction.' }
    ]
  }
];

export const PRICE_RANGES = [
  { id: 'u5', label: 'Under N$ 5,000', min: 0, max: 4999 },
  { id: '5-15', label: 'N$ 5,000 - 15,000', min: 5000, max: 15000 },
  { id: '15-30', label: 'N$ 15,000 - 30,000', min: 15001, max: 30000 },
  { id: 'o30', label: 'Over N$ 30,000', min: 30001, max: Infinity },
];

export const HERO_BG_IMAGE = '/Auto Nations/2015 Golf 7 R.jpg';
