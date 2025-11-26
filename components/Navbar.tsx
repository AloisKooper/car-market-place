
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, Car, Sun, Moon, User, Heart, LogOut, Settings, Package, ChevronDown, ChevronRight, LayoutDashboard } from 'lucide-react';
import { PageView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  onNavigate: (page: PageView) => void;
  cartCount: number;
  wishlistCount: number;
  toggleTheme: () => void;
  isDarkMode: boolean;
  user: any; // Supabase user object
  currentPage: PageView;
  onMobileMenuToggle?: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartCount, wishlistCount, toggleTheme, isDarkMode, user, currentPage, onMobileMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileMenuOpenChange = (open: boolean) => {
    setIsMobileMenuOpen(open);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(open);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    onNavigate(PageView.HOME);
  };

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : 'US';
  };

  const isHomePage = currentPage === PageView.HOME;
  // If we are on Home page and not scrolled, we are over the dark Hero image -> White text.
  // If we are on any other page and not scrolled, we are over the page background -> Theme text (Black in light, White in dark).
  const isTransparentWhiteState = isHomePage && !isScrolled && !isMobileMenuOpen;

  // Text color logic
  const textColorClass = isTransparentWhiteState
    ? 'text-white'
    : 'text-primary dark:text-white';

  const navBackground = isScrolled
    ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-gray-200 dark:border-white/10 py-4 shadow-sm'
    : 'bg-transparent border-transparent py-6';

  const menuLinkClass = isTransparentWhiteState
    ? 'text-gray-300 hover:text-white'
    : 'text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white';

  const buttonBorderClass = isTransparentWhiteState
    ? 'border-white/50 text-white hover:bg-white hover:text-black hover:border-white'
    : 'border-primary/50 text-primary dark:border-white/50 dark:text-white hover:bg-accent hover:text-white hover:border-accent';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${navBackground}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group relative z-50"
              onClick={() => {
                onNavigate(PageView.HOME);
                handleMobileMenuOpenChange(false);
              }}
            >
              <img
                src="/Auto Nations/Auto nations logo new.png"
                alt="Auto Nations Logo"
                className="h-10 md:h-12 w-auto mr-3 object-contain drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-[0.2em] leading-none transition-colors duration-300 ${textColorClass}`}>AUTO NATIONS</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                { label: 'Models', view: PageView.HOME },
                { label: 'Inventory', view: PageView.PRODUCTS },
                { label: 'Innovation', view: PageView.INNOVATION },
                { label: 'Services', view: PageView.SERVICES }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.view)}
                  className={`relative text-sm font-medium transition-colors group py-2 ${menuLinkClass}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Desktop Icons & Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`${textColorClass} hover:text-accent transition-colors`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(PageView.WISHLIST)}
                className={`flex items-center ${textColorClass} hover:text-accent transition-colors relative`}
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(PageView.CART)}
                className={`flex items-center ${textColorClass} hover:text-accent transition-colors relative`}
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Dropdown */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-red-800 text-white flex items-center justify-center text-xs font-bold border-2 border-transparent hover:border-white transition-all shadow-md">
                      {getInitials(user.email)}
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-64 bg-surface border border-border shadow-xl rounded-sm overflow-hidden z-50 origin-top-right"
                      >
                        <div className="p-4 border-b border-border bg-background">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">Signed in as</p>
                          <p className="text-sm font-medium text-primary truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => { onNavigate(PageView.PROFILE); setIsUserMenuOpen(false); }}
                            className="flex items-center w-full px-4 py-3 text-sm text-secondary hover:text-primary hover:bg-background transition-colors gap-3"
                          >
                            <LayoutDashboard className="w-4 h-4" /> My Dashboard
                          </button>
                          <button className="flex items-center w-full px-4 py-3 text-sm text-secondary hover:text-primary hover:bg-background transition-colors gap-3">
                            <Package className="w-4 h-4" /> Order History
                          </button>
                          <button className="flex items-center w-full px-4 py-3 text-sm text-secondary hover:text-primary hover:bg-background transition-colors gap-3">
                            <Settings className="w-4 h-4" /> Settings
                          </button>
                        </div>
                        <div className="border-t border-border py-1">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors gap-3"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all duration-300 ${buttonBorderClass}`}
                >
                  <User className="w-3 h-3" />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>

            {/* Mobile menu Toggle */}
            <div className="md:hidden flex items-center gap-4 z-50 relative">
              <button
                onClick={() => onNavigate(PageView.CART)}
                className={`${isMobileMenuOpen ? 'text-white' : textColorClass} relative transition-colors`}
              >
                <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleMobileMenuOpenChange(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-colors ${isMobileMenuOpen ? 'bg-white/10 text-white' : textColorClass}`}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Redesigned Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleMobileMenuOpenChange(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col md:hidden"
            >
              <div className="pt-24 px-8 pb-8 flex flex-col h-full overflow-y-auto">

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img
                      src="/Auto Nations/Auto nations logo new.png"
                      alt="Auto Nations Logo"
                      className="h-8 w-auto object-contain drop-shadow-md"
                    />
                    <span className="text-sm font-bold tracking-[0.2em] text-white">AUTO NATIONS</span>
                  </div>
                  <button
                    onClick={() => handleMobileMenuOpenChange(false)}
                    className="p-2 rounded-full bg-white/10 text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* User Status Top */}
                <div className="mb-8 pb-8 border-b border-border">
                  {user ? (
                    <div className="flex items-center gap-4" onClick={() => { onNavigate(PageView.PROFILE); handleMobileMenuOpenChange(false); }}>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-accent to-red-900 flex items-center justify-center text-lg font-bold shadow-lg ${!isDarkMode ? 'text-white' : 'text-white'}`}>
                        {getInitials(user.email)}
                      </div>
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${!isDarkMode ? 'text-white' : 'text-secondary'}`}>Currently Active</p>
                        <p className={`text-sm font-bold truncate max-w-[180px] ${!isDarkMode ? 'text-white' : 'text-primary'}`}>{user.email}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ml-auto ${!isDarkMode ? 'text-white' : 'text-secondary'}`} />
                    </div>
                  ) : (
                    <button
                      onClick={() => { setIsAuthModalOpen(true); handleMobileMenuOpenChange(false); }}
                      className="w-full flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                          <User className={`w-6 h-6 ${!isDarkMode ? 'text-white' : 'text-secondary'}`} />
                        </div>
                        <div className="text-left">
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${!isDarkMode ? 'text-white' : 'text-secondary'}`}>Guest Access</p>
                          <p className={`text-lg font-bold ${!isDarkMode ? 'text-white' : 'text-primary'}`}>Sign In / Join</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 group-hover:text-accent ${!isDarkMode ? 'text-white' : 'text-secondary'}`} />
                    </button>
                  )}
                </div>

                {/* Navigation Links */}
                <div className="flex-1 space-y-6">
                  {[
                    { label: 'Models & Showroom', view: PageView.HOME, icon: Car },
                    { label: 'Full Inventory', view: PageView.PRODUCTS, icon: ShoppingCart },
                    { label: 'Innovation Tech', view: PageView.INNOVATION, icon: Settings },
                    { label: 'Global Services', view: PageView.SERVICES, icon: Package },
                    { label: 'My Wishlist', view: PageView.WISHLIST, icon: Heart, count: wishlistCount }
                  ].map((item, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => { onNavigate(item.view); handleMobileMenuOpenChange(false); }}
                      className="w-full flex items-center gap-4 group"
                    >
                      <item.icon className={`w-5 h-5 group-hover:text-accent transition-colors ${!isDarkMode ? 'text-white' : 'text-secondary'}`} />
                      <span className={`text-xl font-light group-hover:pl-2 transition-all ${!isDarkMode ? 'text-white' : 'text-primary'}`}>{item.label}</span>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="ml-auto bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">{item.count}</span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-8 border-t border-border mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-sm font-medium ${!isDarkMode ? 'text-white' : 'text-secondary'}`}>Theme Preference</span>
                    <div className="flex bg-surface rounded-full p-1 border border-border">
                      <button
                        onClick={() => !isDarkMode && toggleTheme()}
                        className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-background shadow-sm text-primary' : 'text-secondary'}`}
                      >
                        <Moon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => isDarkMode && toggleTheme()}
                        className={`p-2 rounded-full transition-all ${!isDarkMode ? 'bg-background shadow-sm text-primary' : 'text-secondary'}`}
                      >
                        <Sun className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {user && (
                    <button
                      onClick={handleSignOut}
                      className="w-full py-4 flex items-center justify-center gap-2 text-red-500 bg-red-500/5 rounded-sm hover:bg-red-500/10 transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
