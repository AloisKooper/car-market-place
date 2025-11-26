import React from 'react';
import { MapPin, ArrowRight, Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

interface FooterProps {
   isDarkMode: boolean;
   onNavigate?: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, onNavigate }) => {
   return (
      <footer className="bg-surface border-t border-border transition-colors duration-500 relative z-10">
         {/* Top Section: Contact & Map */}
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] border-b border-border">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-background order-1">
               <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-light text-primary mb-2">Get In <span className="font-bold">Touch</span></h2>
                  <p className="text-secondary font-mono text-xs uppercase tracking-widest">/// Awaiting_Transmission</p>
               </div>

               <form className="space-y-6 max-w-md">
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Full Name</label>
                     <input type="text" className="w-full bg-transparent border-b border-border py-2 text-primary focus:outline-none focus:border-accent transition-colors text-sm" placeholder="ENTER NAME" />
                  </div>
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Email Address</label>
                     <input type="email" className="w-full bg-transparent border-b border-border py-2 text-primary focus:outline-none focus:border-accent transition-colors text-sm" placeholder="ENTER EMAIL" />
                  </div>
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Message</label>
                     <textarea rows={2} className="w-full bg-transparent border-b border-border py-2 text-primary focus:outline-none focus:border-accent transition-colors resize-none text-sm" placeholder="TYPE MESSAGE..."></textarea>
                  </div>

                  <button type="submit" className="bg-primary text-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300">
                     Send Message
                  </button>
               </form>
            </div>

            <div className="relative h-[300px] lg:h-auto order-2 bg-secondary/10 lg:border-l border-border">
               <iframe
                  src="https://maps.google.com/maps?q=Mandume+Ndemufayo+Ave,+Windhoek,+Namibia&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                     border: 0,
                     filter: isDarkMode ? 'grayscale(100%) invert(90%) contrast(1.2)' : 'grayscale(100%)'
                  }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
               ></iframe>
               <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none">
                  <div className="bg-background/90 backdrop-blur-xl border border-border p-4 shadow-2xl pointer-events-auto max-w-sm">
                     <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                        <div>
                           <h4 className="text-md font-bold text-primary mb-1">Windhoek HQ</h4>
                           <p className="text-secondary text-xs leading-relaxed mb-3">
                              Mandume Ndemufayo Ave,<br />
                              Windhoek, Namibia
                           </p>
                           <div className="flex gap-4 text-[10px] font-mono text-secondary">
                              <span>+264 61 123 4567</span>
                              <span className="text-accent">● OPEN</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Section: Links & Copyright */}
         <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
               {/* Brand */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <img
                        src="/Auto Nations/Auto nations logo new.png"
                        alt="Auto Nations Logo"
                        className="h-10 w-auto object-contain"
                     />
                     <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-[0.2em] leading-none text-primary">AUTO NATIONS</span>
                        <span className="text-[10px] tracking-widest text-accent uppercase">NA / Global Sourcing</span>
                     </div>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                     Premier automotive marketplace connecting Namibia to global manufacturing hubs. Precision parts, vehicles, and logistics.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all"><Instagram className="w-4 h-4" /></a>
                     <a href="#" className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all"><Facebook className="w-4 h-4" /></a>
                     <a href="#" className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all"><Twitter className="w-4 h-4" /></a>
                  </div>
               </div>

               {/* Services Links */}
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Our Services</h4>
                  <ul className="space-y-4">
                     {['Vehicle Import', 'Parts Procurement', 'Logistics & Customs', 'Wholesale Supply', 'Performance Tuning'].map((item) => (
                        <li key={item}>
                           <a href="#" className="text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                              <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              {item}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Quick Links */}
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Company</h4>
                  <ul className="space-y-4">
                     {['About Us', 'Inventory Database', 'Track Order', 'Return Policy', 'Terms of Service'].map((item) => (
                        <li key={item}>
                           <a href="#" className="text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                              <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              {item}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Contact</h4>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-3 text-sm text-secondary">
                        <Mail className="w-4 h-4 text-accent" />
                        <span>sales@autonations.na</span>
                     </li>
                     <li className="flex items-center gap-3 text-sm text-secondary">
                        <Phone className="w-4 h-4 text-accent" />
                        <span>+264 61 123 4567</span>
                     </li>
                     <li className="flex items-center gap-3 text-sm text-secondary">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>Windhoek, Namibia</span>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-[10px] text-secondary uppercase tracking-widest">
                  © 2024 Auto Nations. All rights reserved.
               </p>
               <div className="flex gap-6">
                  <a href="#" className="text-[10px] text-secondary hover:text-primary uppercase tracking-widest">Privacy</a>
                  <a href="#" className="text-[10px] text-secondary hover:text-primary uppercase tracking-widest">Cookies</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;