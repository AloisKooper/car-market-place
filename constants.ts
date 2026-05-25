
import { Product, Category } from './types';

// REPLACE THIS URL WITH THE LINK TO YOUR UPLOADED LOGO
export const LOGO_URL = 'https://via.placeholder.com/150/D60000/FFFFFF?text=Marie+Yashe+Auto+Logo';

export const CATEGORIES: Category[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    image: '/vehicles_GMN.jpg'
  },
  {
    id: 'wheels',
    name: 'Wheels & Tyres',
    icon: 'Disc',
    image: '/Wheels.jpg'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: 'Lightbulb',
    image: '/Lighting.jpg'
  },
  {
    id: 'audio',
    name: 'Car Audio',
    icon: 'Speaker',
    image: '/Car_Audio.jpg'
  },
  {
    id: 'exterior',
    name: 'Exterior Styling',
    icon: 'Component',
    image: '/Exterior_Styling.jpg'
  },
  {
    id: 'interior',
    name: 'Interior',
    icon: 'Armchair',
    image: '/Interior_Styling.jpg'
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'Zap',
    image: '/Performance.jpg'
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
    name: '2013 Honda Fit',
    category: 'vehicles',
    price: 125000,
    image: '/2013_Honda_Fit.jpg',
    rating: 4.8,
    reviews: 24,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Honda',
    model: 'Fit',
    year: 2013,
    mileage: '118,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '1.5L i-VTEC',
    zeroToSixty: '9.5s',
    specs: {
      hpGain: 'Stock (117 HP)',
      fitment: 'FWD',
      material: 'Silver Metallic'
    }
  },
  {
    id: 'v2',
    name: '2015 Audi Q5',
    category: 'vehicles',
    price: 285000,
    image: '/2015_Audi_Q5.jpg',
    rating: 4.9,
    reviews: 15,
    featured: true,
    shippingInfo: 'In Stock - Swakopmund',
    make: 'Audi',
    model: 'Q5',
    year: 2015,
    mileage: '105,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.0T Quattro',
    zeroToSixty: '7.0s',
    specs: {
      hpGain: 'Stock (220 HP)',
      fitment: 'AWD',
      material: 'Ibis White'
    }
  },
  {
    id: 'v3',
    name: '2015 Nissan NP300',
    category: 'vehicles',
    price: 195000,
    image: '/2015_Nissan_Np300.jpg',
    rating: 4.7,
    reviews: 32,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Nissan',
    model: 'NP300',
    year: 2015,
    mileage: '155,000 km',
    transmission: 'Manual',
    fuelType: 'Diesel',
    engine: '2.5L Diesel',
    zeroToSixty: '12.5s',
    specs: {
      hpGain: 'Stock (131 HP)',
      fitment: 'RWD',
      material: 'White'
    }
  },
  {
    id: 'v4',
    name: '2016 BMW F30 3 Series',
    category: 'vehicles',
    price: 320000,
    image: '/2016_BMW_F30.jpg',
    rating: 4.9,
    reviews: 18,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'BMW',
    model: '3 Series',
    year: 2016,
    mileage: '92,000 km',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.0L TwinPower Turbo',
    zeroToSixty: '7.3s',
    specs: {
      hpGain: 'Stock (180 HP)',
      fitment: 'RWD',
      material: 'Alpine White'
    }
  },
  {
    id: 'v5',
    name: '2016 Volkswagen Up',
    category: 'vehicles',
    price: 110000,
    image: '/2016_Volkswagen_Up.jpg',
    rating: 4.6,
    reviews: 45,
    featured: false,
    shippingInfo: 'In Stock - Walvis Bay',
    make: 'Volkswagen',
    model: 'Up',
    year: 2016,
    mileage: '78,000 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    engine: '1.0L MPI',
    zeroToSixty: '13.2s',
    specs: {
      hpGain: 'Stock (74 HP)',
      fitment: 'FWD',
      material: 'Red'
    }
  },
  {
    id: 'v6',
    name: '2017 VW Amarok 4Motion',
    category: 'vehicles',
    price: 450000,
    image: '/2017_Amarok_4motion.jpg',
    rating: 4.9,
    reviews: 28,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Amarok',
    year: 2017,
    mileage: '112,000 km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engine: '2.0L BiTDI',
    zeroToSixty: '10.5s',
    specs: {
      hpGain: 'Stock (177 HP)',
      fitment: '4Motion AWD',
      material: 'Indium Grey'
    }
  },
  {
    id: 'v7',
    name: '2017 VW Golf 7 TSI',
    category: 'vehicles',
    price: 245000,
    image: '/2017_Golf_7_TSI.jpg',
    rating: 4.8,
    reviews: 35,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Golf 7',
    year: 2017,
    mileage: '88,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.4L TSI',
    zeroToSixty: '8.2s',
    specs: {
      hpGain: 'Stock (148 HP)',
      fitment: 'FWD',
      material: 'Tungsten Silver'
    }
  },
  {
    id: 'v8',
    name: '2017 Nissan NP200',
    category: 'vehicles',
    price: 135000,
    image: '/2017_Nissan_Np200.jpg',
    rating: 4.5,
    reviews: 50,
    featured: false,
    shippingInfo: 'In Stock - Ondangwa',
    make: 'Nissan',
    model: 'NP200',
    year: 2017,
    mileage: '125,000 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    engine: '1.6L 8V',
    zeroToSixty: '11.8s',
    specs: {
      hpGain: 'Stock (86 HP)',
      fitment: 'FWD',
      material: 'White'
    }
  },
  {
    id: 'v9',
    name: '2017 VW Polo 7 1.4',
    category: 'vehicles',
    price: 165000,
    image: '/2017_VW_Polo_7_1.4.jpg',
    rating: 4.7,
    reviews: 42,
    featured: false,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'Polo',
    year: 2017,
    mileage: '95,000 km',
    transmission: 'Manual',
    fuelType: 'Petrol',
    engine: '1.4L MPI',
    zeroToSixty: '12.0s',
    specs: {
      hpGain: 'Stock (84 HP)',
      fitment: 'FWD',
      material: 'Flash Red'
    }
  },
  {
    id: 'v10',
    name: '2020 VW T-Cross',
    category: 'vehicles',
    price: 310000,
    image: '/2020_VW_T-Cross.jpg',
    rating: 4.8,
    reviews: 10,
    featured: true,
    shippingInfo: 'In Stock - Windhoek',
    make: 'Volkswagen',
    model: 'T-Cross',
    year: 2020,
    mileage: '45,000 km',
    transmission: 'DSG',
    fuelType: 'Petrol',
    engine: '1.0L TSI',
    zeroToSixty: '10.2s',
    specs: {
      hpGain: 'Stock (113 HP)',
      fitment: 'FWD',
      material: 'Makena Turquoise'
    }
  },
  {
    id: '1',
    name: 'Vossen HF-5 Gloss Black 20"',
    category: 'wheels',
    price: 45000,
    image: '/Wheels.jpg',
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
    image: '/Lighting.jpg',
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
    image: '/Exterior_Styling.jpg',
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
    image: '/Car_Audio.jpg',
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
    image: '/Interior_Styling.jpg',
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
    image: '/Performance.jpg',
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
    image: '/Performance.jpg',
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
    image: '/Interior_Styling.jpg',
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
    image: '/Akrapovic_Evolution_Line_Full_Titanium_Exhaus.jpg',
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
    image: '/Bilstein_Coilover.webp',
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
    image: '/Eventuri_Carbon_Intake.jpg',
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

export const HERO_BG_IMAGE = '/S3_Hero_Section_GAN.jpg';
