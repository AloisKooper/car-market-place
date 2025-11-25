import React from 'react';
import { Plus, Heart, MessageCircle, Calendar, Gauge, Zap, Fuel, Wrench, Layers, Scale, ArrowUpRight, ArrowRightLeft, Check, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { BRAND_ICONS } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onEnquire?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  isWishlisted: boolean;
  isCompared?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onEnquire,
  onToggleWishlist,
  onToggleCompare,
  onViewDetails,
  isWishlisted,
  isCompared
}) => {
  const isVehicle = product.category === 'vehicles';

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVehicle && onEnquire) {
      onEnquire(product);
    } else {
      onAddToCart(product);
    }
  };

  // Technical Spec Grid Configuration
  // Using a 2x2 matrix for perfect alignment
  const specs = isVehicle ? [
    { label: 'YEAR', value: product.year, icon: Calendar },
    { label: 'MILEAGE', value: product.mileage, icon: Gauge },
    { label: 'ENGINE', value: product.engine?.split(' ')[0], icon: Zap }, // Truncate for grid safety
    { label: 'FUEL', value: product.fuelType, icon: Fuel },
  ] : [
    { label: 'FITMENT', value: product.specs?.fitment, icon: Wrench },
    { label: 'MATERIAL', value: product.specs?.material, icon: Layers },
    { label: 'WEIGHT', value: product.specs?.weight, icon: Scale },
    { label: 'GAIN', value: product.specs?.hpGain, icon: ArrowUpRight },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => onViewDetails && onViewDetails(product)}
      className="group flex flex-col h-full bg-background border border-border hover:border-accent transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* 1. Header / Status Bar */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-border bg-surface/30">
        <div className="flex items-center gap-2 max-w-[60%]">
          {product.make && BRAND_ICONS[product.make] && (
            <div className="w-3 h-3 text-primary">
              <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d={BRAND_ICONS[product.make].path} />
              </svg>
            </div>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary truncate">
            {product.make || 'Global Source'}
          </span>
        </div>
        {product.shippingInfo?.toLowerCase().includes('stock') ? (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">In Stock</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Import</span>
          </div>
        )}
      </div>

      {/* 2. Image Section with Technical Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface border-b border-border">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
            className={`w-10 h-10 flex items-center justify-center border transition-all hover:scale-110 ${isWishlisted ? 'bg-accent border-accent text-white' : 'border-white/30 text-white hover:bg-white hover:text-black'}`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAction}
            className="bg-white text-black px-6 h-10 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all hover:scale-105 flex items-center gap-2"
          >
            {isVehicle ? 'Enquire' : 'Add to Cart'} <ChevronRight className="w-3 h-3" />
          </button>
          {isVehicle && onToggleCompare && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
              className={`w-10 h-10 flex items-center justify-center border transition-all hover:scale-110 ${isCompared ? 'bg-white border-white text-black' : 'border-white/30 text-white hover:bg-white hover:text-black'}`}
              title="Compare"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Product Info Block */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-sm font-bold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm font-mono font-medium text-accent whitespace-nowrap">
            N$ {product.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 4. Rigid Spec Grid */}
      <div className="grid grid-cols-2 border-t border-border">
        {specs.slice(0, 4).map((spec, idx) => (
          <div
            key={idx}
            className={`
                      relative p-3 flex flex-col h-[56px] justify-center
                      ${idx % 2 === 0 ? 'border-r border-border' : ''}
                      ${idx < 2 ? 'border-b border-border' : ''}
                      bg-surface/5 group-hover:bg-surface/20 transition-colors
                  `}
          >
            <div className="flex items-center gap-2 mb-1">
              <spec.icon className="w-3 h-3 text-secondary" strokeWidth={1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-secondary/80">{spec.label}</span>
            </div>
            <span className="text-xs font-medium text-primary truncate pl-5">
              {spec.value || '-'}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;