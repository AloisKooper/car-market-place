import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    onRemove: (id: string) => void;
    onAddToCart: (product: Product) => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, products, onRemove, onAddToCart }) => {
    if (!isOpen) return null;

    // Extract all unique spec keys from all products
    const allSpecKeys = Array.from(new Set(products.flatMap(p => p.specs ? Object.keys(p.specs) : [])));

    // Common fields to compare
    const commonFields = [
        { label: 'Price', key: 'price', format: (v: any) => `N$ ${v.toLocaleString()}` },
        { label: 'Year', key: 'year' },
        { label: 'Mileage', key: 'mileage' },
        { label: 'Engine', key: 'engine' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Fuel Type', key: 'fuelType' },
        { label: '0-60 mph', key: 'zeroToSixty' },
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-background w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-border shadow-2xl"
            >
                <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
                    <h2 className="text-2xl font-light text-primary">Vehicle <span className="font-bold">Comparison</span></h2>
                    <button onClick={onClose} className="p-2 hover:bg-background rounded-full transition-colors">
                        <X className="w-6 h-6 text-secondary" />
                    </button>
                </div>

                <div className="overflow-auto flex-1 p-6">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-0 border border-border">
                            {/* Header Row: Images & Names */}
                            <div className="p-4 border-r border-b border-border bg-surface/50 font-bold text-primary flex items-center">
                                Vehicle Details
                            </div>
                            {products.map(product => (
                                <div key={product.id} className="p-4 border-r border-b border-border min-w-[250px] relative group">
                                    <button
                                        onClick={() => onRemove(product.id)}
                                        className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-red-500 hover:text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                        title="Remove"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="aspect-video mb-4 overflow-hidden border border-border">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-primary text-sm mb-1">{product.name}</h3>
                                    <p className="text-accent font-mono text-sm mb-3">N$ {product.price.toLocaleString()}</p>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="w-full py-2 bg-primary text-background text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                            {[...Array(3 - products.length)].map((_, i) => (
                                <div key={`empty-${i}`} className="p-4 border-r border-b border-border min-w-[250px] flex items-center justify-center bg-surface/20">
                                    <div className="text-center text-secondary/40">
                                        <div className="w-12 h-12 border-2 border-dashed border-secondary/40 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Check className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs uppercase tracking-widest">Empty Slot</p>
                                    </div>
                                </div>
                            ))}

                            {/* Common Fields */}
                            {commonFields.map(field => (
                                <React.Fragment key={field.key}>
                                    <div className="p-4 border-r border-b border-border bg-surface/30 text-xs font-bold uppercase tracking-widest text-secondary flex items-center">
                                        {field.label}
                                    </div>
                                    {products.map(product => (
                                        <div key={`${product.id}-${field.key}`} className="p-4 border-r border-b border-border text-sm text-primary flex items-center">
                                            {field.format ? field.format((product as any)[field.key]) : ((product as any)[field.key] || '-')}
                                        </div>
                                    ))}
                                    {[...Array(3 - products.length)].map((_, i) => (
                                        <div key={`empty-${field.key}-${i}`} className="p-4 border-r border-b border-border bg-surface/5"></div>
                                    ))}
                                </React.Fragment>
                            ))}

                            {/* Dynamic Specs */}
                            {allSpecKeys.map(key => (
                                <React.Fragment key={key}>
                                    <div className="p-4 border-r border-b border-border bg-surface/30 text-xs font-bold uppercase tracking-widest text-secondary flex items-center">
                                        {key}
                                    </div>
                                    {products.map(product => (
                                        <div key={`${product.id}-${key}`} className="p-4 border-r border-b border-border text-sm text-primary flex items-center">
                                            {product.specs ? product.specs[key] || '-' : '-'}
                                        </div>
                                    ))}
                                    {[...Array(3 - products.length)].map((_, i) => (
                                        <div key={`empty-${key}-${i}`} className="p-4 border-r border-b border-border bg-surface/5"></div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CompareModal;
