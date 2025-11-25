import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full opacity-60">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/5] bg-surface mb-6 border border-border overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      
      {/* Content Skeleton */}
      <div className="space-y-4 pt-4 border-t border-border">
         <div className="flex justify-between items-center">
            <div className="h-5 bg-surface w-3/5 relative overflow-hidden rounded-sm">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            </div>
            <div className="h-5 bg-surface w-1/4 relative overflow-hidden rounded-sm">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            </div>
         </div>
         <div className="h-3 bg-surface w-1/3 relative overflow-hidden rounded-sm">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} />
         </div>
         <div className="h-3 bg-surface w-2/3 relative overflow-hidden rounded-sm mt-2">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} />
         </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;