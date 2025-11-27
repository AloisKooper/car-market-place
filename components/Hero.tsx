import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Reliable Landscape Image (Dark aesthetic)
import { HERO_BG_IMAGE } from '../constants';

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24">
      {/* Background Image with Cinematic Overlay */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("${HERO_BG_IMAGE}")`,
          backgroundPosition: 'center center'
        }}
      />
      {/* Gradient adjusted for both light and dark themes, though Hero usually stays dark for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />

      {/* Hero Content - Bottom Aligned */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="max-w-4xl"
        >
          <motion.div
            variants={heroItem}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-accent"></div>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-white/90 uppercase">
              China to Namibia • UK Imports
            </h2>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] mb-6 tracking-tighter"
          >
            Import Cars.
            <br />
            <span className="font-bold">UK Imports.</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base md:text-lg text-white/70 max-w-lg mb-10 font-light leading-relaxed"
          >
            We import cars from China to Namibia and the UK.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center"
            >
              View Cars
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-accent" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 text-xs font-bold uppercase tracking-widest text-white border border-white/30 hover:border-accent hover:text-accent transition-colors flex items-center backdrop-blur-sm"
            >
              Our Services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Quick Select Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-20 border-t border-white/10 pt-8 hidden lg:flex items-end justify-between"
        >
          <div className="flex gap-12">
            {['Imports', 'Stock', 'UK Imports', 'China Imports'].map((cat) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={cat}
                className="group cursor-pointer"
              >
                <span className="text-[9px] text-gray-500 block mb-1 uppercase tracking-wider">Category</span>
                <span className="text-base text-white group-hover:text-accent transition-colors font-medium">{cat}</span>
                <div className="w-0 group-hover:w-full h-[1px] bg-accent transition-all duration-300 mt-1"></div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm hover:border-white/40 transition-colors">
              <select className="bg-transparent text-white text-xs font-medium outline-none border-none min-w-[100px] cursor-pointer uppercase tracking-wider">
                <option className="bg-black text-gray-400">Make</option>
                <option className="bg-black">Audi</option>
                <option className="bg-black">VW</option>
                <option className="bg-black">BMW</option>
              </select>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm hover:border-white/40 transition-colors">
              <select className="bg-transparent text-white text-xs font-medium outline-none border-none min-w-[100px] cursor-pointer uppercase tracking-wider">
                <option className="bg-black text-gray-400">Model</option>
                <option className="bg-black">Golf 8R</option>
                <option className="bg-black">RS3</option>
                <option className="bg-black">M4</option>
              </select>
            </div>
            <motion.button
              whileHover={{ backgroundColor: '#D60000', color: 'white' }}
              className="bg-white text-black p-3 transition-colors"
            >
              <Search className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;