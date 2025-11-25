
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import AIChatBot from './components/AIChatBot';
import Globe from './components/Globe';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CompareBar from './components/CompareBar';
import CompareModal from './components/CompareModal';
import { PageView, Product } from './types';
import { CATEGORIES, PERFORMANCE_HIGHLIGHTS, PRICE_RANGES, MAKES, LOGO_URL, BRAND_ICONS } from './constants';
import { ArrowRight, Star, ShieldCheck, Truck, Wrench, Quote, Filter, ChevronDown, Check, Globe as GlobeIcon, Search, Plus, Minus, Heart, Trash2, ArrowRightLeft, X, Info, Gauge, Activity, Radio, MapPin, Cpu, Ship, Settings, Zap, Anchor, Box, Brain, Terminal, Layers, Wind, CloudLightning, Fingerprint, Container, ShoppingBag, Smartphone, Home, ChevronRight, Share2, Printer, Timer, Calendar, Fuel, Scale, Clock, Database, Network, Binary, BarChart3, ScanLine, ListFilter, AlertCircle, ShoppingCart, User, Package, CreditCard, Bell, Car, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { supabase } from './lib/supabase';

// --- Components for Sections ---

const BrandMarquee = () => {
   const brands = [
      "VOLKSWAGEN", "AUDI", "BMW", "HAVAL", "GWM", "CHERY", "TOYOTA", "BYD", "GEELY", "JETOUR", "TANK"
   ];

   return (
      <div className="bg-black border-y border-white/10 py-6 overflow-hidden flex relative z-20">
         <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>

         <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
         >
            {[...brands, ...brands, ...brands].map((brand, i) => (
               <div key={i} className="flex items-center mx-8 md:mx-12">
                  <span className="text-white/30 text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-display">{brand}</span>
                  <div className="w-2 h-2 rounded-full bg-accent/30 ml-8 md:ml-12"></div>
               </div>
            ))}
         </motion.div>
      </div>
   );
};

// --- Reusable Filter Component (Dashboard Style) ---
interface FilterSectionProps {
   title: string;
   isOpen: boolean;
   onToggle: () => void;
   children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, onToggle, children }) => {
   return (
      <div className="border border-border bg-surface/10 mb-[-1px]">
         <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-4 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-surface/30 transition-colors group"
         >
            <span className="group-hover:translate-x-1 transition-transform">{title}</span>
            {isOpen ? <Minus className="w-3 h-3 text-secondary group-hover:text-accent" /> : <Plus className="w-3 h-3 text-secondary group-hover:text-accent" />}
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-background/50 border-t border-border"
               >
                  <div className="p-4 pt-2">
                     {children}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Custom Checkbox Row ---
const FilterCheckbox: React.FC<{ label: string, checked: boolean, onClick: () => void, count?: number, iconPath?: string }> = ({ label, checked, onClick, count, iconPath }) => (
   <div
      onClick={onClick}
      className="flex items-center justify-between py-2 cursor-pointer group select-none hover:pl-2 transition-all"
   >
      <div className="flex items-center gap-3">
         <div className={`w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center ${checked ? 'bg-accent border-accent' : 'border-secondary/50 bg-transparent group-hover:border-primary'}`}>
            {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
         </div>
         {iconPath && (
            <div className={`w-4 h-4 ${checked ? 'text-primary' : 'text-secondary group-hover:text-primary'} transition-colors`}>
               <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d={iconPath} />
               </svg>
            </div>
         )}
         <span className={`text-xs transition-colors uppercase tracking-wide ${checked ? 'text-primary font-bold' : 'text-secondary group-hover:text-primary'}`}>
            {label}
         </span>
      </div>
      {count !== undefined && (
         <span className="text-[9px] text-secondary font-mono">{count}</span>
      )}
   </div>
);


// --- Breadcrumbs Component ---
const Breadcrumbs = ({ items, onNavigate }: { items: { label: string; view?: PageView; onClick?: () => void }[], onNavigate: (page: PageView) => void }) => {
   return (
      <nav className="flex items-center space-x-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary mb-8">
         <button onClick={() => onNavigate(PageView.HOME)} className="hover:text-accent transition-colors">Home</button>
         {items.map((item, index) => (
            <React.Fragment key={index}>
               <ChevronRight className="w-3 h-3 text-border" />
               <button
                  onClick={() => {
                     if (item.view) onNavigate(item.view);
                     if (item.onClick) item.onClick();
                  }}
                  className={`${index === items.length - 1 ? 'text-primary pointer-events-none' : 'hover:text-accent transition-colors'}`}
               >
                  {item.label}
               </button>
            </React.Fragment>
         ))}
      </nav>
   );
};

// --- Innovation Page Component (Redesigned) ---
// --- Innovation Page Component (Redesigned - Bento Grid) ---
const InnovationPage: React.FC<{ onOpenChat: () => void, isDarkMode: boolean }> = ({ onOpenChat, isDarkMode }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="min-h-screen bg-background text-primary pt-20 overflow-x-hidden"
      >
         {/* 1. Hero: Glitch / Reveal */}
         <section className="py-24 md:py-32 border-b border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/S3_Hero_Section_GAN.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
               >
                  <div className="inline-flex items-center gap-2 mb-6 border border-accent/50 bg-accent/10 px-4 py-1 rounded-full backdrop-blur-sm">
                     <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-accent">System Online • V3.0</span>
                  </div>
                  <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-primary mb-6 leading-none">
                     FUTURE.<br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-gray-500 to-transparent animate-gradient-x">IMPORTED.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light tracking-wide mb-10">
                     We don't just ship cars. We engineer the entire supply chain.
                     <br className="hidden md:block" />
                     From algorithmic sourcing in Guangzhou to doorstep delivery in Windhoek.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* 2. The Digital Garage (Bento Grid) */}
         <section className="py-24 bg-surface/30">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">

                  {/* Card 1: AI Sourcing (Large) */}
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     className="md:col-span-2 lg:col-span-2 row-span-2 bg-background border border-border p-8 relative overflow-hidden group"
                  >
                     <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                           <Binary className="w-12 h-12 text-accent mb-6" strokeWidth={1} />
                           <h3 className="text-3xl font-bold text-primary mb-2">AI Sourcing Engine</h3>
                           <p className="text-secondary max-w-sm">
                              Our proprietary bot scans 50+ supplier databases in real-time. It cross-references VINs, checks stock levels, and negotiates prices in milliseconds.
                           </p>
                        </div>
                        <div className="font-mono text-xs text-accent/70">
                           &gt; QUERY_LATENCY: 0.02ms<br />
                           &gt; SOURCES: 54<br />
                           &gt; STATUS: ACTIVE
                        </div>
                     </div>
                     {/* Decorative Code Background */}
                     <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 font-mono text-[10px] p-4 overflow-hidden pointer-events-none">
                        {Array(20).fill(0).map((_, i) => (
                           <div key={i}>{`const source_${i} = await fetch(API_Endpoint_${i});`}</div>
                        ))}
                     </div>
                  </motion.div>

                  {/* Card 2: Live Tracking */}
                  <motion.div
                     whileHover={{ y: -5 }}
                     className="bg-[#09090b] border border-border p-6 flex flex-col justify-between relative overflow-hidden group"
                  >
                     <div className="absolute inset-0 bg-[url('/S3_Hero_Section_GAN.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-luminosity"></div>
                     <div className="relative z-10">
                        <GlobeIcon className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-bold text-white mb-1">Global Track</h3>
                        <p className="text-gray-400 text-xs">Real-time vessel tracking from CN to NA.</p>
                     </div>
                     <div className="relative z-10 flex items-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live</span>
                     </div>
                  </motion.div>

                  {/* Card 3: Quality Control */}
                  <motion.div
                     whileHover={{ y: -5 }}
                     className="bg-background border border-border p-6 flex flex-col justify-between group"
                  >
                     <ShieldCheck className="w-8 h-8 text-primary mb-4 group-hover:text-accent transition-colors" strokeWidth={1} />
                     <div>
                        <h3 className="text-xl font-bold text-primary mb-1">Zero Defects</h3>
                        <p className="text-secondary text-xs">Every part is scanned and verified before shipping.</p>
                     </div>
                  </motion.div>

                  {/* Card 4: The Network (Tall) */}
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     className="md:col-span-1 row-span-2 bg-accent text-white p-8 flex flex-col justify-between relative overflow-hidden"
                  >
                     <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                     <div className="relative z-10">
                        <Network className="w-12 h-12 text-white mb-6" />
                        <h3 className="text-3xl font-bold mb-4">The Network</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                           Access a closed network of verified manufacturers. No middlemen. No markups. Just direct access to the factory floor.
                        </p>
                     </div>
                     <button onClick={onOpenChat} className="mt-8 bg-white text-accent px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        Join Network
                     </button>
                  </motion.div>

                  {/* Card 5: Speed */}
                  <motion.div
                     whileHover={{ y: -5 }}
                     className="md:col-span-2 bg-surface border border-border p-8 flex items-center justify-between group"
                  >
                     <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">Rapid Logistics</h3>
                        <p className="text-secondary text-sm max-w-xs">Air freight options for urgent parts. 5-7 days delivery.</p>
                     </div>
                     <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center border border-border group-hover:border-accent transition-colors">
                        <Zap className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                     </div>
                  </motion.div>

               </div>
            </div>
         </section>

         {/* 3. CTA */}
         <section className="py-24 bg-background border-t border-border text-center">
            <div className="max-w-2xl mx-auto px-6">
               <h2 className="text-3xl font-light text-primary mb-6">Ready to <span className="font-bold">Upgrade?</span></h2>
               <p className="text-secondary mb-8">Initialize the sourcing protocol today.</p>
               <button
                  onClick={onOpenChat}
                  className="bg-primary text-background px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
               >
                  Start Sourcing
               </button>
            </div>
         </section>

         <Footer isDarkMode={isDarkMode} />
      </motion.div>
   );
};

// --- Services Page Component ---
const ServicesPage: React.FC<{ isDarkMode: boolean; onEnquire: (product: any) => void }> = ({ isDarkMode, onEnquire }) => {
   const [activeService, setActiveService] = useState(0);

   const SERVICES_DATA = [
      {
         id: '01',
         title: 'Vehicle Import',
         icon: Container,
         shortDesc: 'Sourcing specific models.',
         description: 'Looking for a specific spec? We facilitate the import of vehicles directly from China and major global markets. Whether it\'s the latest Golf 8R or a high-spec Chinese SUV, we handle the entire procurement process.',
         features: ['Spec Sourcing', 'Price Negotiation', 'Import Duties'],
         image: '/vehicles_GMN.jpg'
      },
      {
         id: '02',
         title: 'Parts Procurement',
         icon: Settings,
         shortDesc: 'Access to global catalogs.',
         description: 'We connect you to the factories. From body kits and wheels to lighting and interior upgrades. If it exists in the Asian aftermarket, we can get it to Windhoek for you.',
         features: ['Body Kits', 'Lighting Systems', 'Alloy Wheels'],
         image: '/Performance.jpg'
      },
      {
         id: '03',
         title: 'Logistics & Customs',
         icon: Ship,
         shortDesc: 'China to Windhoek.',
         description: 'We take the headache out of importing. Our team handles all freight forwarding, customs clearing, and tax documentation. You pay one price, and we deliver the goods.',
         features: ['Freight Forwarding', 'Clearing Agents', 'Insurance'],
         image: '/Quality_Assurance_GMN.jpg'
      },
      {
         id: '04',
         title: 'Bulk Supply',
         icon: Box,
         shortDesc: 'For garages & shops.',
         description: 'Running a workshop? We offer wholesale pricing for bulk orders. Get consistent supply of consumables, performance parts, and accessories for your business.',
         features: ['Wholesale Rates', 'Scheduled Delivery', 'Business Accounts'],
         image: '/Wheels.jpg'
      }
   ];

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="min-h-screen bg-background text-primary transition-colors duration-500 pt-20"
      >
         {/* 1. Hero Section */}
         <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden border-b border-border">
            <div className="absolute inset-0 bg-[url('/Exterior_Styling.jpg')] bg-cover bg-center opacity-20 grayscale"></div>
            <div className="z-10 text-center px-6">
               <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-primary mb-6">
                     WE BRIDGE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">BORDERS.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light tracking-wide">
                     Your direct link to the world's automotive manufacturing hubs.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* 2. The Capabilities Matrix */}
         <section className="bg-background relative">
            <div className="max-w-[1440px] mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px] border-b border-border">
                  {/* Left Column: Navigation */}
                  <div className="col-span-1 lg:col-span-4 border-r border-border flex flex-col bg-background">
                     <div className="p-8 border-b border-border">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Our Services</h3>
                     </div>
                     {SERVICES_DATA.map((service, index) => (
                        <button
                           key={service.id}
                           onClick={() => setActiveService(index)}
                           className={`group text-left p-8 border-b border-border transition-all duration-300 relative overflow-hidden ${activeService === index ? 'bg-primary text-background' : 'hover:bg-surface text-primary'
                              }`}
                        >
                           <div className="flex items-center justify-between mb-2 relative z-10">
                              <span className="font-mono text-xs opacity-60">/{service.id}</span>
                              <service.icon className={`w-5 h-5 ${activeService === index ? 'text-accent' : 'text-secondary group-hover:text-primary'}`} />
                           </div>
                           <h4 className="text-2xl font-bold mb-1 relative z-10">{service.title}</h4>
                           <p className={`text-sm relative z-10 ${activeService === index ? 'text-gray-400' : 'text-secondary'}`}>{service.shortDesc}</p>
                           {activeService !== index && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                           )}
                        </button>
                     ))}
                  </div>

                  {/* Right Column: Content Display */}
                  {/* Mobile FIX: Added h-[600px] to ensure height when stacking on mobile */}
                  <div className="col-span-1 lg:col-span-8 bg-surface relative overflow-hidden flex flex-col h-[600px] lg:h-auto border-t lg:border-t-0 border-border">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeService}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           transition={{ duration: 0.4 }}
                           className="absolute inset-0 flex flex-col"
                        >
                           <div className="relative h-1/2 w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10"></div>
                              <img
                                 src={SERVICES_DATA[activeService].image}
                                 alt={SERVICES_DATA[activeService].title}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative z-20 -mt-20">
                              <div className="bg-background/80 backdrop-blur-md border border-border p-8 md:p-12 shadow-2xl max-w-3xl">
                                 <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-1 bg-accent"></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Service Detail</span>
                                 </div>
                                 <p className="text-lg md:text-xl leading-relaxed text-primary mb-8 font-light line-clamp-4 md:line-clamp-none">
                                    {SERVICES_DATA[activeService].description}
                                 </p>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-8">
                                    {SERVICES_DATA[activeService].features.map((feature, i) => (
                                       <div key={i} className="flex items-center gap-3">
                                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                                          <span className="text-sm font-bold text-primary uppercase tracking-wider">{feature}</span>
                                       </div>
                                    ))}
                                 </div>
                                 <div className="mt-8 pt-8 flex justify-end">
                                    <button
                                       onClick={() => onEnquire({ name: SERVICES_DATA[activeService].title, category: 'Service' } as any)}
                                       className="bg-primary text-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
                                    >
                                       Enquire Now
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Global Supply Chain */}
         <section className="bg-background py-24 border-b border-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                     <div className="mb-2 text-accent font-mono text-xs">/// IMPORT_NETWORK_ACTIVE</div>
                     <h2 className="text-4xl md:text-5xl font-light text-primary mb-6">
                        The Import <br /><span className="font-bold">Standard.</span>
                     </h2>
                     <p className="text-secondary text-lg leading-relaxed mb-12">
                        We've streamlined the import process. Tracking shipments from Guangzhou manufacturing hubs to our Windhoek facility in real-time. Authentic parts, transparent pricing, zero delays.
                     </p>

                     <div className="grid grid-cols-2 gap-px bg-border border border-border">
                        <div className="bg-surface p-6">
                           <span className="block text-2xl font-bold text-primary mb-1">20-30 <span className="text-sm font-normal text-secondary">Days</span></span>
                           <span className="text-xs text-secondary uppercase tracking-widest">Est. Sea Freight</span>
                        </div>
                        <div className="bg-surface p-6">
                           <span className="block text-2xl font-bold text-primary mb-1">100%</span>
                           <span className="text-xs text-secondary uppercase tracking-widest">Insured</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative aspect-square md:aspect-video lg:aspect-square bg-surface border border-border rounded-none overflow-hidden group">
                     <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent z-20"></div>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent z-20"></div>
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent z-20"></div>
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent z-20"></div>
                     <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                     <Globe isDarkMode={isDarkMode} />
                     <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur border border-border p-4 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-xs font-bold text-primary uppercase">Route Active</span>
                        </div>
                        <div className="font-mono text-[10px] text-secondary">
                           CN-SHA --{'>'} NA-WDH <br />
                           VESSEL: HMM ALGECIRAS
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <Footer isDarkMode={isDarkMode} />
      </motion.div>
   );
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';

// Changed to explicit export default function to resolve "no default export" errors in some bundlers
export default function App() {
   const navigate = useNavigate();
   const location = useLocation();

   const setCurrentPage = (view: PageView) => {
      switch (view) {
         case PageView.HOME: navigate('/'); break;
         case PageView.PRODUCTS: navigate('/inventory'); break;
         case PageView.CART: navigate('/cart'); break;
         case PageView.WISHLIST: navigate('/wishlist'); break;
         case PageView.PROFILE: navigate('/profile'); break;
         case PageView.SERVICES: navigate('/services'); break;
         case PageView.INNOVATION: navigate('/innovation'); break;
         default: navigate('/');
      }
   };

   const [products, setProducts] = useState<Product[]>([]); // State for products

   // Persistent State Initialization
   const [cart, setCart] = useState<Product[]>(() => {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
   });
   const [wishlist, setWishlist] = useState<Product[]>(() => {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
   });
   const [compareList, setCompareList] = useState<Product[]>(() => {
      const saved = localStorage.getItem('compareList');
      return saved ? JSON.parse(saved) : [];
   });

   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

   // Auth State
   const [user, setUser] = useState<any>(null);

   // Product Page State
   const [sortBy, setSortBy] = useState<SortOption>('featured');
   const [isSortOpen, setIsSortOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
   const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
   const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
   const [yearRange, setYearRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
   const [dateListedFilter, setDateListedFilter] = useState<string>('all');
   const [visibleProductCount, setVisibleProductCount] = useState(6);

   // ChatBot State
   const [isChatOpen, setIsChatOpen] = useState(false);
   const [chatInitialMessage, setChatInitialMessage] = useState<string>('');

   // Inventory Mobile State
   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

   // Loading States
   const [isProductsLoading, setIsProductsLoading] = useState(false);

   // Collapsible Filters State
   const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
   const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);
   const [isMakeFilterOpen, setIsMakeFilterOpen] = useState(true);
   const [isAvailabilityFilterOpen, setIsAvailabilityFilterOpen] = useState(true);
   const [isYearFilterOpen, setIsYearFilterOpen] = useState(true);
   const [isDateListedFilterOpen, setIsDateListedFilterOpen] = useState(true);

   // UI States for Animations
   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
   const [activePerformanceIndex, setActivePerformanceIndex] = useState(0);
   const [hoveredSpecIndex, setHoveredSpecIndex] = useState<number | null>(null);

   useEffect(() => {
      const root = window.document.documentElement;
      if (isDarkMode) {
         root.classList.add('dark');
      } else {
         root.classList.remove('dark');
      }
   }, [isDarkMode]);

   // Fetch Products from Supabase
   useEffect(() => {
      const fetchProducts = async () => {
         setIsProductsLoading(true);
         const { data, error } = await supabase
            .from('products')
            .select('*');

         if (error) {
            console.error('Error fetching products:', error);
         } else {
            const mappedProducts: Product[] = (data || []).map((p: any) => ({
               id: p.id,
               name: p.name,
               category: p.category,
               price: p.price,
               image: p.image?.replace(/ /g, '_'),
               rating: p.rating,
               reviews: p.reviews,
               featured: p.featured,
               shippingInfo: p.shipping_info,
               make: p.make,
               model: p.model,
               year: p.year,
               mileage: p.mileage,
               transmission: p.transmission,
               fuelType: p.fuel_type,
               engine: p.engine,
               zeroToSixty: p.zero_to_sixty,
               specs: p.specs
            }));
            setProducts(mappedProducts);
         }
         setIsProductsLoading(false);
      };

      fetchProducts();
   }, []);

   // Persistence Effects
   useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

   useEffect(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
   }, [wishlist]);

   useEffect(() => {
      localStorage.setItem('compareList', JSON.stringify(compareList));
   }, [compareList]);

   useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
         setUser(session?.user ?? null);
      }).catch(err => {
         console.debug("Supabase auth session check failed (expected if using placeholder keys):", err);
      });

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user ?? null);
         if (session?.user && _event === 'SIGNED_IN') {
            // Only redirect if explicitly needed, or maybe just set user state without redirecting
            // setCurrentPage(PageView.PROFILE); // Removed auto-redirect
         }
      });

      return () => subscription.unsubscribe();
   }, []);

   const toggleTheme = () => setIsDarkMode(!isDarkMode);

   const addToCart = (product: Product) => {
      setCart([...cart, product]);
   };

   const removeFromCart = (productId: string) => {
      setCart(prev => prev.filter(p => p.id !== productId));
   };

   const handleEnquire = (product: Product) => {
      setChatInitialMessage(`I am interested in the ${product.name} (${product.year ? product.year + ' ' : ''}${product.model || ''}). Is it still available and what are the financing options?`);
      setIsChatOpen(true);
   };

   const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
      navigate(`/product/${product.id}`);
      window.scrollTo(0, 0);
   };

   const handleSignOut = async () => {
      await supabase.auth.signOut();
      navigate('/');
   };

   const ProductDetailRoute = () => {
      const { id } = useParams();
      useEffect(() => {
         if (id && products.length > 0 && (!selectedProduct || selectedProduct.id !== id)) {
            const p = products.find(p => p.id === id);
            if (p) setSelectedProduct(p);
         }
      }, [id, products, selectedProduct]);

      if (!selectedProduct) return <div className="min-h-screen pt-32 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div></div>;

      return renderProductDetail();
   };

   const toggleWishlist = (product: Product) => {
      setWishlist(prev => {
         const exists = prev.find(p => p.id === product.id);
         if (exists) {
            return prev.filter(p => p.id !== product.id);
         } else {
            return [...prev, product];
         }
      });
   };

   const toggleCompare = (product: Product) => {
      setCompareList(prev => {
         const exists = prev.find(p => p.id === product.id);
         if (exists) {
            return prev.filter(p => p.id !== product.id);
         } else {
            if (prev.length >= 3) {
               return prev;
            }
            return [...prev, product];
         }
      });
   };

   const isWishlisted = (productId: string) => wishlist.some(p => p.id === productId);
   const isCompared = (productId: string) => compareList.some(p => p.id === productId);

   useEffect(() => {
      // setIsProductsLoading(true); // Removed to avoid double loading state
      // const timer = setTimeout(() => {
      //   setIsProductsLoading(false);
      // }, 800);
      // return () => clearTimeout(timer);
   }, [searchQuery, selectedCategories, selectedPriceRanges, selectedMakes, selectedAvailability, yearRange, dateListedFilter]);

   const filteredProducts = useMemo(() => {
      let filtered = [...products]; // Use fetched products

      if (searchQuery) {
         const q = searchQuery.toLowerCase();
         filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
         );
      }

      if (selectedCategories.length > 0) {
         filtered = filtered.filter(p => selectedCategories.includes(p.category));
      }

      if (selectedPriceRanges.length > 0) {
         filtered = filtered.filter(p => {
            return selectedPriceRanges.some(rangeId => {
               const range = PRICE_RANGES.find(r => r.id === rangeId);
               if (!range) return false;
               return p.price >= range.min && p.price <= range.max;
            });
         });
      }

      if (selectedMakes.length > 0) {
         filtered = filtered.filter(p => p.make && selectedMakes.includes(p.make));
      }

      if (selectedAvailability.length > 0) {
         filtered = filtered.filter(p => {
            const info = p.shippingInfo?.toLowerCase() || '';
            if (selectedAvailability.includes('stock')) {
               if (info.includes('stock')) return true;
            }
            if (selectedAvailability.includes('import')) {
               if (info.includes('import')) return true;
            }
            return false;
         });
      }

      if (yearRange.start || yearRange.end) {
         const start = yearRange.start ? parseInt(yearRange.start) : -Infinity;
         const end = yearRange.end ? parseInt(yearRange.end) : Infinity;
         filtered = filtered.filter(p => {
            if (!p.year) return true;
            return p.year >= start && p.year <= end;
         });
      }

      switch (sortBy) {
         case 'price-asc':
            return filtered.sort((a, b) => a.price - b.price);
         case 'price-desc':
            return filtered.sort((a, b) => b.price - a.price);
         case 'rating':
            return filtered.sort((a, b) => b.rating - a.rating);
         case 'name':
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
         default:
            return filtered.filter(p => p.featured).concat(filtered.filter(p => !p.featured));
      }
   }, [sortBy, searchQuery, selectedCategories, selectedPriceRanges, selectedMakes, selectedAvailability, yearRange, dateListedFilter, products]);

   const toggleCategory = (catId: string) => {
      setSelectedCategories(prev =>
         prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
      );
      setVisibleProductCount(6);
   };

   const togglePriceRange = (rangeId: string) => {
      setSelectedPriceRanges(prev =>
         prev.includes(rangeId) ? prev.filter(id => id !== rangeId) : [...prev, rangeId]
      );
      setVisibleProductCount(6);
   };

   const toggleMake = (make: string) => {
      setSelectedMakes(prev =>
         prev.includes(make) ? prev.filter(m => m !== make) : [...prev, make]
      );
      setVisibleProductCount(6);
   };

   const toggleAvailability = (type: string) => {
      setSelectedAvailability(prev =>
         prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
      setVisibleProductCount(6);
   };

   const visibleProducts = filteredProducts.slice(0, visibleProductCount);

   // --- Views ---

   const renderCart = () => (
      <motion.div
         key="cart"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500"
      >
         <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h1 className="text-4xl font-light text-primary mb-8">Build Sheet <span className="font-bold">Summary</span></h1>

            {cart.length === 0 ? (
               <div className="py-24 text-center border border-dashed border-border flex flex-col items-center">
                  <ShoppingCart className="w-12 h-12 text-secondary mb-4 opacity-50" />
                  <p className="text-secondary text-lg mb-4">Your build sheet is currently empty.</p>
                  <button
                     onClick={() => setCurrentPage(PageView.PRODUCTS)}
                     className="bg-primary text-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
                  >
                     Browse Inventory
                  </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-4">
                     {cart.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex flex-col sm:flex-row gap-6 p-6 bg-surface border border-border items-center sm:items-start">
                           <div className="w-full sm:w-32 aspect-[4/3] bg-background">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1 text-center sm:text-left">
                              <div className="flex flex-col sm:flex-row justify-between mb-2">
                                 <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                                 <span className="text-accent font-medium">N$ {item.price.toLocaleString()}</span>
                              </div>
                              <p className="text-xs text-secondary mb-4 uppercase tracking-wider">{item.category}</p>
                              <button
                                 onClick={() => removeFromCart(item.id)}
                                 className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center justify-center sm:justify-start gap-1"
                              >
                                 <Trash2 className="w-3 h-3" /> Remove
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="bg-surface p-8 border border-border h-fit">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 pb-4 border-b border-border">Order Summary</h3>
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm text-secondary">
                           <span>Subtotal</span>
                           <span>N$ {cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-secondary">
                           <span>Import Duties (Est.)</span>
                           <span>N$ {(cart.reduce((acc, item) => acc + item.price, 0) * 0.16).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t border-border">
                           <span>Total</span>
                           <span>N$ {(cart.reduce((acc, item) => acc + item.price, 0) * 1.16).toLocaleString()}</span>
                        </div>
                     </div>
                     <button className="w-full bg-primary text-background py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                        Request Official Quote
                     </button>
                  </div>
               </div>
            )}
         </div>
         <div className="mt-24">
            <Footer isDarkMode={isDarkMode} />
         </div>
      </motion.div>
   );

   const renderWishlist = () => (
      <motion.div
         key="wishlist"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500"
      >
         <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h1 className="text-4xl font-light text-primary mb-8">Saved <span className="font-bold">Configurations</span></h1>

            {wishlist.length === 0 ? (
               <div className="py-24 text-center border border-dashed border-border flex flex-col items-center">
                  <Heart className="w-12 h-12 text-secondary mb-4 opacity-50" />
                  <p className="text-secondary text-lg mb-4">Your wishlist is currently empty.</p>
                  <button
                     onClick={() => setCurrentPage(PageView.PRODUCTS)}
                     className="bg-primary text-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
                  >
                     Explore Parts & Vehicles
                  </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlist.map((product) => (
                     <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onEnquire={handleEnquire}
                        onToggleWishlist={toggleWishlist}
                        onToggleCompare={toggleCompare}
                        onViewDetails={handleProductClick}
                        isWishlisted={true}
                        isCompared={isCompared(product.id)}
                     />
                  ))}
               </div>
            )}
         </div>
         <div className="mt-24">
            <Footer isDarkMode={isDarkMode} />
         </div>
      </motion.div>
   );

   const renderProductDetail = () => {
      if (!selectedProduct) return null;
      const isVehicle = selectedProduct.category === 'vehicles';
      const crumbs = [
         { label: 'Inventory', view: PageView.PRODUCTS },
         { label: selectedProduct.category },
         { label: selectedProduct.name }
      ];
      return (
         <motion.div
            key="product-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-0 min-h-screen bg-background transition-colors duration-500"
         >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
               <Breadcrumbs items={crumbs} onNavigate={setCurrentPage} />
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="col-span-1 lg:col-span-7">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-[4/3] bg-surface border border-border overflow-hidden mb-4"
                     >
                        <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
                        {selectedProduct.featured && (
                           <div className="absolute top-0 left-0 bg-accent text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
                              Exclusive
                           </div>
                        )}
                     </motion.div>
                     <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                           <div key={i} className="aspect-square bg-surface border border-border cursor-pointer hover:border-accent transition-colors opacity-60 hover:opacity-100">
                              <img src={selectedProduct.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="Thumbnail" />
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="col-span-1 lg:col-span-5 flex flex-col">
                     <div className="mb-8 border-b border-border pb-8">
                        <div className="flex items-center gap-2 mb-4">
                           <span className="bg-primary text-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{isVehicle ? `${selectedProduct.year} ${selectedProduct.make}` : 'Component'}</span>
                           {selectedProduct.shippingInfo?.includes('Stock') ? (
                              <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><Check className="w-3 h-3" /> In Stock</span>
                           ) : (
                              <span className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><GlobeIcon className="w-3 h-3" /> Import Item</span>
                           )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-primary mb-4 leading-tight">{selectedProduct.name}</h1>
                        <div className="flex items-end gap-4">
                           <span className="text-3xl font-medium text-accent">N$ {selectedProduct.price.toLocaleString()}</span>
                        </div>
                     </div>
                     <div className="space-y-6 flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-8">
                           {isVehicle ? (
                              <>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Zap className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Engine</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.engine}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Timer className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">0-60 mph</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.zeroToSixty}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Settings className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Trans</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.transmission}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Gauge className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Mileage</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.mileage}</span>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Wrench className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Fitment</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.specs?.fitment || '-'}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Layers className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Material</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.specs?.material || '-'}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Scale className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Weight</span>
                                    <span className="text-sm font-bold text-primary">{selectedProduct.specs?.weight || '-'}</span>
                                 </div>
                                 <div className="bg-surface p-6 flex flex-col items-center text-center group hover:bg-background transition-colors">
                                    <Zap className="w-6 h-6 text-accent mb-3 opacity-80 group-hover:opacity-100" strokeWidth={1} />
                                    <span className="text-[10px] text-secondary uppercase tracking-widest mb-1">Gain</span>
                                    <span className="text-sm font-bold text-primary text-accent">{selectedProduct.specs?.hpGain || '-'}</span>
                                 </div>
                              </>
                           )}
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-secondary">
                           <p>
                              Engineered for absolute performance. This {selectedProduct.name} represents the pinnacle of {selectedProduct.category} technology.
                              Sourced directly from our verified partners.
                           </p>
                        </div>
                     </div>
                     <div className="mt-8 sticky bottom-6 bg-background/90 backdrop-blur border border-border p-4 shadow-2xl z-30">
                        <div className="flex gap-4">
                           <button
                              onClick={() => isVehicle ? handleEnquire(selectedProduct) : addToCart(selectedProduct)}
                              className="flex-1 bg-primary text-background py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
                           >
                              {isVehicle ? 'Request Quote' : 'Add to Cart'}
                           </button>
                           <button
                              onClick={() => toggleWishlist(selectedProduct)}
                              className={`px-4 border border-border hover:border-accent hover:text-accent transition-colors ${isWishlisted(selectedProduct.id) ? 'text-accent border-accent' : 'text-primary'}`}
                           >
                              <Heart className={`w-5 h-5 ${isWishlisted(selectedProduct.id) ? 'fill-current' : ''}`} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Footer isDarkMode={isDarkMode} />
         </motion.div>
      );
   };

   const renderHome = () => (
      <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
         <Hero />
         <BrandMarquee />

         <section className="py-16 md:py-32 bg-background border-b border-border transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                  >
                     <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 block">/// LATEST_DROPS_001</span>
                     <h2 className="text-4xl md:text-5xl font-light text-primary leading-none">Featured <span className="font-bold">Inventory</span></h2>
                  </motion.div>
                  <motion.button
                     onClick={() => setCurrentPage(PageView.PRODUCTS)}
                     className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-primary text-primary hover:text-accent hover:border-accent transition-colors pb-2"
                  >
                     View All Stock <ArrowRight className="w-4 h-4" />
                  </motion.button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.filter(p => p.category === 'vehicles' && p.featured).slice(0, 3).map((car, idx) => (
                     <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                     >
                        <ProductCard
                           product={car}
                           onAddToCart={addToCart}
                           onEnquire={handleEnquire}
                           onToggleWishlist={toggleWishlist}
                           onToggleCompare={toggleCompare}
                           onViewDetails={handleProductClick}
                           isWishlisted={isWishlisted(car.id)}
                           isCompared={isCompared(car.id)}
                        />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Categories Visual Index */}
         <section className="bg-background border-b border-border transition-colors duration-500 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
               <div className="border-b border-border p-6 lg:p-12 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-accent"></div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Component Architecture</h3>
               </div>

               <div className="flex flex-col md:flex-row h-[600px] w-full overflow-hidden border-b border-border">
                  {CATEGORIES.map((cat, idx) => (
                     <motion.div
                        key={cat.id}
                        layout
                        onHoverStart={() => setHoveredCategory(cat.id)}
                        onHoverEnd={() => setHoveredCategory(null)}
                        onClick={() => {
                           setCurrentPage(PageView.PRODUCTS);
                           if (cat.id === 'vehicles') setSelectedCategories(['vehicles']);
                        }}
                        className="relative flex-1 border-r border-b md:border-b-0 border-border bg-surface overflow-hidden cursor-pointer group min-h-[100px] md:min-h-0"
                        animate={{
                           flex: hoveredCategory === cat.id ? 3.5 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     >
                        <motion.div className="absolute inset-0 w-full h-full">
                           <motion.img
                              src={cat.image}
                              className="w-full h-full object-cover"
                              animate={{
                                 scale: hoveredCategory === cat.id ? 1.05 : 1,
                                 filter: hoveredCategory && hoveredCategory !== cat.id ? 'grayscale(100%) brightness(0.4)' : 'grayscale(0%) brightness(1)'
                              }}
                              transition={{ duration: 0.6 }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                        </motion.div>
                        <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end z-10">
                           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                              <div className="transform transition-all duration-300">
                                 <span className="text-xs font-mono text-accent mb-2 block">0{idx + 1}</span>
                                 <h3 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tighter whitespace-nowrap">{cat.name}</h3>
                              </div>
                              <motion.div
                                 initial={{ opacity: 0, x: 20 }}
                                 animate={{
                                    opacity: hoveredCategory === cat.id ? 1 : 0,
                                    x: hoveredCategory === cat.id ? 0 : 20
                                 }}
                                 className="hidden md:block"
                              >
                                 <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md text-white hover:bg-accent hover:border-accent transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                 </div>
                              </motion.div>
                           </div>
                        </div>
                        <motion.div
                           className="absolute inset-0 border-[4px] border-accent pointer-events-none z-20"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: hoveredCategory === cat.id ? 1 : 0 }}
                           transition={{ duration: 0.3 }}
                        />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Sourcing Manifesto */}
         <section className="py-16 md:py-24 bg-[#09090b] text-white relative overflow-hidden border-y border-white/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-01b8028d9d77?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="max-w-2xl">
                     <span className="inline-block py-1 px-3 border border-accent text-accent text-[10px] font-bold uppercase tracking-widest mb-6 rounded-full">Global Sourcing Protocol</span>
                     <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-white">WE BRIDGE <br />THE <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">IMPOSSIBLE.</span></h2>
                     <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg">
                        Can't find it in Namibia? We source directly from manufacturing hubs in China and Germany. Vehicles, parts, and rare specs delivered to your door.
                     </p>
                  </div>
                  <div>
                     <button
                        onClick={() => {
                           setChatInitialMessage("I want to source a vehicle or part from international suppliers.");
                           setIsChatOpen(true);
                        }}
                        className="group relative px-12 py-6 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:bg-accent hover:text-white transition-all duration-300"
                     >
                        <span className="relative z-10 flex items-center gap-2">Start Sourcing <ArrowRight className="w-4 h-4" /></span>
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Performance Showcase */}
         <section className="py-16 md:py-24 bg-surface border-y border-border transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
               <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                     <h2 className="text-4xl font-light text-primary mb-2">Technical <span className="font-bold">Showcase</span></h2>
                     <div className="w-12 h-[2px] bg-accent"></div>
                  </div>
                  <div className="text-xs font-mono text-secondary">
               /// ENGINEERED_FOR_PERFORMANCE
                  </div>
               </div>
               <div className="flex flex-col lg:flex-row gap-0 border border-border bg-background shadow-2xl">
                  <div className="lg:w-[60%] relative aspect-video lg:aspect-auto min-h-[400px] overflow-hidden group">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].image}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                           className="w-full h-full"
                        >
                           <img
                              src={PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].image}
                              alt="Performance Part"
                              className="w-full h-full object-cover transition-transform duration-[2s] ease-out scale-100 group-hover:scale-105"
                           />
                           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                        </motion.div>
                     </AnimatePresence>
                     <div className="absolute bottom-8 left-8">
                        <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2 inline-block">
                           Spec Sheet
                        </span>
                        <h3 className="text-white text-3xl font-bold">{PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].name}</h3>
                     </div>
                  </div>
                  <div className="lg:w-[40%] flex flex-col">
                     <div className="flex border-b border-border bg-surface">
                        {PERFORMANCE_HIGHLIGHTS.map((item, index) => (
                           <button
                              key={item.id}
                              onClick={() => setActivePerformanceIndex(index)}
                              className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${index === activePerformanceIndex
                                 ? 'text-primary bg-background border-b-2 border-accent'
                                 : 'text-secondary hover:text-primary hover:bg-background/50'
                                 }`}
                           >
                              {item.name.split(' ')[0]}
                           </button>
                        ))}
                     </div>
                     <div className="p-8 md:p-12 flex-1 flex flex-col justify-center bg-background">
                        <AnimatePresence mode="wait">
                           <motion.div
                              key={activePerformanceIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                           >
                              <div className="flex justify-between items-start mb-6">
                                 <span className="text-secondary text-xs uppercase tracking-widest">Part No. 00{activePerformanceIndex + 1}-NA</span>
                                 <span className="text-accent text-xl font-medium">N$ {PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].price.toLocaleString()}</span>
                              </div>
                              <p className="text-secondary leading-relaxed mb-8 text-sm">
                                 {PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].description}
                              </p>
                              <div className="space-y-6">
                                 {PERFORMANCE_HIGHLIGHTS[activePerformanceIndex].specs.map((spec, i) => (
                                    <div
                                       key={i}
                                       className="relative group cursor-help"
                                       onMouseEnter={() => setHoveredSpecIndex(i)}
                                       onMouseLeave={() => setHoveredSpecIndex(null)}
                                    >
                                       <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-primary mb-2">
                                          <div className="flex items-center gap-2">
                                             <span>{spec.label}</span>
                                             <Info className="w-3 h-3 text-secondary opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all" />
                                          </div>
                                          <span>{spec.value}</span>
                                       </div>
                                       <div className="w-full h-[2px] bg-surface overflow-hidden">
                                          <motion.div
                                             initial={{ width: 0 }}
                                             animate={{ width: `${spec.progress}%` }}
                                             transition={{ duration: 0.8, delay: 0.1 * i }}
                                             className="h-full bg-accent"
                                          />
                                       </div>

                                       <AnimatePresence>
                                          {hoveredSpecIndex === i && (
                                             <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute bottom-full left-0 mb-3 w-full bg-primary text-background p-3 shadow-xl border-l-2 border-accent z-20"
                                             >
                                                <div className="text-[10px] leading-relaxed font-medium">
                                                   {spec.description}
                                                </div>
                                                <div className="absolute top-full left-4 -mt-[1px] border-8 border-transparent border-t-primary"></div>
                                             </motion.div>
                                          )}
                                       </AnimatePresence>
                                    </div>
                                 ))}
                              </div>
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* The Standard / Contact */}
         <section className="bg-background border-b border-border transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto">
               <div className="p-12 border-b border-border flex justify-between items-end">
                  <div>
                     <h2 className="text-4xl md:text-6xl font-light text-primary mb-2">THE <span className="font-bold">STANDARD</span></h2>
                     <p className="text-secondary font-mono text-xs uppercase tracking-widest">/// Operating_Protocol_V2.4</p>
                  </div>
                  <ShieldCheck className="w-12 h-12 text-accent hidden md:block" strokeWidth={1} />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                  <motion.div whileHover="hover" className="relative h-[600px] group overflow-hidden cursor-default">
                     <img src="/Quality_Assurance_GMN.jpg" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500"></div>

                     <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <span className="text-6xl font-black text-primary/20 group-hover:text-white/20 transition-colors">01</span>
                        <div>
                           <div className="w-12 h-1 bg-accent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                           <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-2 uppercase">Global Logistics</h3>
                           <p className="text-secondary group-hover:text-gray-200 text-sm leading-relaxed max-w-xs">
                              Direct shipping channels from manufacturing hubs in Guangzhou and Munich. We control the chain from factory floor to your door.
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div whileHover="hover" className="relative h-[600px] group overflow-hidden cursor-default">
                     <img src="/vehicles_GMN.jpg" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500"></div>

                     <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <span className="text-6xl font-black text-primary/20 group-hover:text-white/20 transition-colors">02</span>
                        <div>
                           <div className="w-12 h-1 bg-accent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                           <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-2 uppercase">Quality Assurance</h3>
                           <p className="text-secondary group-hover:text-gray-200 text-sm leading-relaxed max-w-xs">
                              Every component is inspected. We only partner with OEM-certified suppliers to ensure fitment and finish meets manufacturer standards.
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div whileHover="hover" className="relative h-[600px] group overflow-hidden cursor-default">
                     <img src="/180_Day_warranty.jpg" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500"></div>

                     <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <span className="text-6xl font-black text-primary/20 group-hover:text-white/20 transition-colors">03</span>
                        <div>
                           <div className="w-12 h-1 bg-accent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                           <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-2 uppercase">180-Day Warranty</h3>
                           <p className="text-secondary group-hover:text-gray-200 text-sm leading-relaxed max-w-xs">
                              We stand behind our imports. Comprehensive protection on all mechanical parts and electronics for peace of mind.
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
            <Footer isDarkMode={isDarkMode} />
         </section>
      </motion.div>
   );

   const FilterSidebarContent = () => (
      <div className="space-y-px h-full overflow-y-auto">
         <div className="bg-surface/10 border border-border p-4 mb-px">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ID..."
                  className="w-full bg-background border border-border py-2 pl-10 pr-4 text-xs text-primary focus:outline-none focus:border-accent transition-colors font-mono uppercase"
               />
            </div>
         </div>

         <FilterSection title="Category" isOpen={isCategoryFilterOpen} onToggle={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}>
            <div className="space-y-1">
               {CATEGORIES.map(cat => (
                  <FilterCheckbox
                     key={cat.id}
                     label={cat.name}
                     checked={selectedCategories.includes(cat.id)}
                     onClick={() => toggleCategory(cat.id)}
                  />
               ))}
            </div>
         </FilterSection>

         <FilterSection title="Price Range" isOpen={isPriceFilterOpen} onToggle={() => setIsPriceFilterOpen(!isPriceFilterOpen)}>
            <div className="space-y-1">
               {PRICE_RANGES.map(range => (
                  <FilterCheckbox
                     key={range.id}
                     label={range.label}
                     checked={selectedPriceRanges.includes(range.id)}
                     onClick={() => togglePriceRange(range.id)}
                  />
               ))}
            </div>
         </FilterSection>

         <FilterSection title="Manufacturer" isOpen={isMakeFilterOpen} onToggle={() => setIsMakeFilterOpen(!isMakeFilterOpen)}>
            <div className="space-y-1">
               {MAKES.map(make => (
                  <FilterCheckbox
                     key={make}
                     label={make}
                     checked={selectedMakes.includes(make)}
                     onClick={() => toggleMake(make)}
                     iconPath={BRAND_ICONS[make]?.path}
                  />
               ))}
            </div>
         </FilterSection>

         <FilterSection title="Availability" isOpen={isAvailabilityFilterOpen} onToggle={() => setIsAvailabilityFilterOpen(!isAvailabilityFilterOpen)}>
            <div className="space-y-1">
               <FilterCheckbox label="In Stock" checked={selectedAvailability.includes('stock')} onClick={() => toggleAvailability('stock')} />
               <FilterCheckbox label="Import Order" checked={selectedAvailability.includes('import')} onClick={() => toggleAvailability('import')} />
            </div>
         </FilterSection>

         <FilterSection title="Model Year" isOpen={isYearFilterOpen} onToggle={() => setIsYearFilterOpen(!isYearFilterOpen)}>
            <div className="grid grid-cols-2 gap-2 mt-2">
               <input
                  type="number"
                  placeholder="MIN"
                  value={yearRange.start}
                  onChange={(e) => setYearRange({ ...yearRange, start: e.target.value })}
                  className="bg-background border border-border p-2 text-xs text-primary focus:outline-none focus:border-accent text-center"
               />
               <input
                  type="number"
                  placeholder="MAX"
                  value={yearRange.end}
                  onChange={(e) => setYearRange({ ...yearRange, end: e.target.value })}
                  className="bg-background border border-border p-2 text-xs text-primary focus:outline-none focus:border-accent text-center"
               />
            </div>
         </FilterSection>

         <FilterSection title="Date Listed" isOpen={isDateListedFilterOpen} onToggle={() => setIsDateListedFilterOpen(!isDateListedFilterOpen)}>
            <div className="space-y-1">
               {[
                  { id: 'all', label: 'All Time' },
                  { id: 'new', label: 'Last 7 Days' },
                  { id: 'month', label: 'Last 30 Days' }
               ].map(opt => (
                  <div
                     key={opt.id}
                     onClick={() => setDateListedFilter(opt.id)}
                     className={`flex items-center justify-between py-2 cursor-pointer group select-none hover:pl-2 transition-all`}
                  >
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${dateListedFilter === opt.id ? 'bg-accent' : 'bg-secondary/50'}`}></div>
                        <span className={`text-xs uppercase tracking-wide ${dateListedFilter === opt.id ? 'text-primary font-bold' : 'text-secondary'}`}>{opt.label}</span>
                     </div>
                  </div>
               ))}
            </div>
         </FilterSection>

         <div className="pt-6 pb-24 lg:pb-0">
            <button
               onClick={() => {
                  setSelectedCategories([]);
                  setSelectedPriceRanges([]);
                  setSelectedMakes([]);
                  setSelectedAvailability([]);
                  setSearchQuery('');
                  setYearRange({ start: '', end: '' });
                  setDateListedFilter('all');
               }}
               className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-red-500 border border-transparent hover:border-red-500/30 transition-all flex items-center justify-center gap-2"
            >
               <Trash2 className="w-3 h-3" /> Reset Filters
            </button>
         </div>
      </div>
   );

   const renderInventory = () => (
      <motion.div
         key="products"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="pt-24 pb-0 min-h-screen bg-background transition-colors duration-500"
      >
         <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6 border-b border-border pb-8">
               <div>
                  <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">Inventory <span className="font-bold">Database</span></h1>
                  <p className="text-secondary text-sm max-w-xl leading-relaxed">
                     Access real-time stock levels. Filter by technical specification, manufacturer, or component category.
                  </p>
               </div>

               {/* Desktop Sort */}
               <div className="hidden lg:flex items-center gap-4">
                  <div className="relative group">
                     <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 px-4 py-3 border border-border bg-surface text-xs font-bold uppercase tracking-widest text-primary hover:border-accent transition-colors min-w-[180px] justify-between"
                     >
                        <span>Sort: {sortBy.replace('-', ' ')}</span>
                        <ChevronDown className="w-4 h-4" />
                     </button>
                     {isSortOpen && (
                        <div className="absolute top-full right-0 mt-2 w-full bg-surface border border-border shadow-xl z-30">
                           {['featured', 'price-asc', 'price-desc', 'rating', 'name'].map((opt) => (
                              <button
                                 key={opt}
                                 onClick={() => { setSortBy(opt as SortOption); setIsSortOpen(false); }}
                                 className="block w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-background hover:text-accent transition-colors"
                              >
                                 {opt.replace('-', ' ')}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Mobile Filter & Sort Bar */}
            <div className="lg:hidden sticky top-[72px] z-30 mb-6 -mx-6 px-6 bg-background/80 backdrop-blur-md border-b border-border py-4 flex gap-4">
               <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-surface border border-border py-3 text-xs font-bold uppercase tracking-widest text-primary"
               >
                  <Filter className="w-4 h-4" /> Filters
               </button>
               <div className="relative flex-1">
                  <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value as SortOption)}
                     className="w-full h-full appearance-none bg-surface border border-border py-3 pl-4 pr-8 text-xs font-bold uppercase tracking-widest text-primary focus:outline-none"
                  >
                     <option value="featured">Featured</option>
                     <option value="price-asc">Price: Low to High</option>
                     <option value="price-desc">Price: High to Low</option>
                     <option value="name">Name</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
               </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
               {/* Desktop Sidebar */}
               <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
                  <FilterSidebarContent />
               </div>

               {/* Mobile Filter Drawer */}
               <AnimatePresence>
                  {isMobileFiltersOpen && (
                     <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-50 lg:hidden bg-background"
                     >
                        <div className="flex flex-col h-full">
                           <div className="flex items-center justify-between p-6 border-b border-border">
                              <h2 className="text-lg font-bold uppercase tracking-widest text-primary">Filters</h2>
                              <button onClick={() => setIsMobileFiltersOpen(false)}>
                                 <X className="w-6 h-6 text-primary" />
                              </button>
                           </div>
                           <div className="flex-1 overflow-y-auto px-6 py-4">
                              <FilterSidebarContent />
                           </div>
                           <div className="p-6 border-t border-border">
                              <button
                                 onClick={() => setIsMobileFiltersOpen(false)}
                                 className="w-full bg-primary text-background py-4 text-xs font-bold uppercase tracking-widest"
                              >
                                 Show Results ({filteredProducts.length})
                              </button>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* Product Grid */}
               <div className="flex-1 w-full">
                  <div className="mb-6 flex items-center justify-between">
                     <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">
                        Displaying {visibleProducts.length} Results
                     </span>
                     {isProductsLoading && <span className="text-[10px] font-mono text-accent animate-pulse uppercase">Refreshing Database...</span>}
                  </div>

                  {visibleProducts.length === 0 ? (
                     <div className="py-24 text-center border border-dashed border-border">
                        <p className="text-secondary text-lg mb-4">No inventory matches your criteria.</p>
                        <button
                           onClick={() => {
                              setChatInitialMessage(`I'm looking for a car or part that isn't listed in your inventory. Can you source it?`);
                              setIsChatOpen(true);
                           }}
                           className="text-accent text-sm font-bold uppercase tracking-widest hover:underline"
                        >
                           Request Custom Sourcing
                        </button>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        <AnimatePresence>
                           {visibleProducts.map((product) => (
                              <motion.div
                                 key={product.id}
                                 layout
                                 initial={{ opacity: 0, scale: 0.95 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.95 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 {isProductsLoading ? (
                                    <ProductSkeleton />
                                 ) : (
                                    <ProductCard
                                       product={product}
                                       onAddToCart={addToCart}
                                       onEnquire={handleEnquire}
                                       onToggleWishlist={toggleWishlist}
                                       onToggleCompare={toggleCompare}
                                       onViewDetails={handleProductClick}
                                       isWishlisted={isWishlisted(product.id)}
                                       isCompared={isCompared(product.id)}
                                    />
                                 )}
                              </motion.div>
                           ))}
                        </AnimatePresence>
                     </div>
                  )}

                  {visibleProducts.length < filteredProducts.length && (
                     <div className="mt-12 text-center">
                        <button
                           onClick={() => setVisibleProductCount(prev => prev + 6)}
                           className="bg-surface text-primary border border-border px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-background hover:border-accent transition-colors"
                        >
                           Load More Data
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <Footer isDarkMode={isDarkMode} />
      </motion.div>
   );

   const getPageView = (path: string): PageView => {
      if (path === '/') return PageView.HOME;
      if (path.startsWith('/inventory')) return PageView.PRODUCTS;
      if (path.startsWith('/product')) return PageView.PRODUCT_DETAIL;
      if (path.startsWith('/cart')) return PageView.CART;
      if (path.startsWith('/wishlist')) return PageView.WISHLIST;
      if (path.startsWith('/profile')) return PageView.PROFILE;
      if (path.startsWith('/services')) return PageView.SERVICES;
      if (path.startsWith('/innovation')) return PageView.INNOVATION;
      return PageView.HOME;
   };

   return (
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-black' : 'bg-white'}`}>
         <Navbar
            onNavigate={setCurrentPage}
            cartCount={cart.length}
            wishlistCount={wishlist.length}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            user={user}
            currentPage={getPageView(location.pathname)}
         />
         <AnimatePresence mode="wait">
            <div key={location.pathname} className="h-full">
               <Routes location={location}>
                  <Route path="/" element={renderHome()} />
                  <Route path="/inventory" element={renderInventory()} />
                  <Route path="/product/:id" element={<ProductDetailRoute />} />
                  <Route path="/cart" element={renderCart()} />
                  <Route path="/wishlist" element={renderWishlist()} />
                  <Route path="/profile" element={<Dashboard user={user} wishlist={wishlist} onSignOut={handleSignOut} onNavigate={navigate} />} />
                  <Route path="/services" element={<ServicesPage isDarkMode={isDarkMode} onEnquire={handleEnquire} />} />
                  <Route path="/innovation" element={<InnovationPage onOpenChat={() => setIsChatOpen(true)} isDarkMode={isDarkMode} />} />
                  <Route path="*" element={<Navigate to="/" />} />
               </Routes>
            </div>
         </AnimatePresence>

         {/* Global Components */}
         <AIChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialMessage={chatInitialMessage} />
         <CompareBar
            products={compareList}
            onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
            onClear={() => setCompareList([])}
            onCompare={() => setIsCompareModalOpen(true)}
         />
         <CompareModal
            isOpen={isCompareModalOpen}
            onClose={() => setIsCompareModalOpen(false)}
            products={compareList}
            onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
            onAddToCart={addToCart}
         />
      </div>
   );
}

