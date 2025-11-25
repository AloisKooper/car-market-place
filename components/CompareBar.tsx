import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CompareBarProps {
    products: Product[];
    onRemove: (id: string) => void;
    onClear: () => void;
    onCompare: () => void;
}

const CompareBar: React.FC<CompareBarProps> = ({ products, onRemove, onClear, onCompare }) => {
    return (
        <AnimatePresence>
            {products.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                >
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-accent rounded-full text-white">
                                    <ArrowRightLeft className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-secondary block">Compare</span>
                                    <span className="text-sm font-bold text-primary">{products.length} / 3 Vehicles</span>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-4 border-l border-border pl-6">
                                {products.map(product => (
                                    <div key={product.id} className="relative group w-16 h-10 border border-border bg-background">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => onRemove(product.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {[...Array(3 - products.length)].map((_, i) => (
                                    <div key={`empty-${i}`} className="w-16 h-10 border border-dashed border-border bg-background/50 flex items-center justify-center text-secondary/30 text-xs">
                                        Empty
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClear}
                                className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-red-500 transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="w-3 h-3" /> Clear
                            </button>
                            <button
                                onClick={onCompare}
                                disabled={products.length < 2}
                                className="bg-primary text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Compare Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CompareBar;
