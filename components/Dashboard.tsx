import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, LogOut, Car, Heart, ShieldCheck, CreditCard, Bell, MapPin } from 'lucide-react';
import { Product } from '../types';

interface DashboardProps {
    user: any;
    wishlist: Product[];
    onSignOut: () => void;
    onNavigate: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, wishlist, onSignOut, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
    const [loading, setLoading] = useState(false);

    // Mock Order History (replace with real data fetch if available)
    const orders = [
        { id: 'ORD-7782-XJ', date: '2024-03-15', status: 'In Transit', total: 45000, items: 2 },
        { id: 'ORD-9921-MC', date: '2024-02-28', status: 'Delivered', total: 12500, items: 1 },
    ];

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500"
        >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-red-900 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                {user.email?.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-light text-primary">Welcome, <span className="font-bold">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span></h1>
                                <p className="text-secondary text-sm flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3 text-green-500" /> Verified Member
                                    <span className="text-border">•</span>
                                    ID: {user.id.substring(0, 8)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-accent text-white shadow-lg' : 'bg-surface text-secondary hover:text-primary hover:bg-surface/80'}`}
                        >
                            <User className="w-4 h-4" /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-accent text-white shadow-lg' : 'bg-surface text-secondary hover:text-primary hover:bg-surface/80'}`}
                        >
                            <Package className="w-4 h-4" /> Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-accent text-white shadow-lg' : 'bg-surface text-secondary hover:text-primary hover:bg-surface/80'}`}
                        >
                            <Settings className="w-4 h-4" /> Settings
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-surface p-6 border border-border">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-background rounded-sm"><Package className="w-5 h-5 text-accent" /></div>
                                                <span className="text-[10px] font-bold uppercase text-secondary">Active Orders</span>
                                            </div>
                                            <span className="text-3xl font-bold text-primary">1</span>
                                            <p className="text-xs text-secondary mt-1">In Transit to Windhoek</p>
                                        </div>
                                        <div className="bg-surface p-6 border border-border">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-background rounded-sm"><Heart className="w-5 h-5 text-accent" /></div>
                                                <span className="text-[10px] font-bold uppercase text-secondary">Wishlist</span>
                                            </div>
                                            <span className="text-3xl font-bold text-primary">{wishlist.length}</span>
                                            <p className="text-xs text-secondary mt-1">Saved Items</p>
                                        </div>
                                        <div className="bg-surface p-6 border border-border">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-background rounded-sm"><CreditCard className="w-5 h-5 text-accent" /></div>
                                                <span className="text-[10px] font-bold uppercase text-secondary">Total Spent</span>
                                            </div>
                                            <span className="text-3xl font-bold text-primary">N$ 12,500</span>
                                            <p className="text-xs text-secondary mt-1">Lifetime Value</p>
                                        </div>
                                    </div>

                                    {/* Recent Activity / Garage */}
                                    <div className="bg-surface border border-border p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                                                <Car className="w-5 h-5 text-accent" /> My Garage
                                            </h3>
                                            <button className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">Manage Vehicles</button>
                                        </div>

                                        {wishlist.filter(p => p.category === 'vehicles').length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {wishlist.filter(p => p.category === 'vehicles').slice(0, 2).map(car => (
                                                    <div key={car.id} className="flex items-center gap-4 bg-background p-4 border border-border">
                                                        <img src={car.image} alt={car.name} className="w-20 h-20 object-cover" />
                                                        <div>
                                                            <h4 className="font-bold text-primary">{car.name}</h4>
                                                            <p className="text-xs text-secondary">{car.year} • {car.mileage}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 border border-dashed border-border bg-background/50">
                                                <Car className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
                                                <p className="text-secondary text-sm mb-4">No vehicles added to your garage yet.</p>
                                                <button onClick={() => onNavigate('/inventory')} className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">Browse Inventory</button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-surface border border-border"
                                >
                                    <div className="p-6 border-b border-border">
                                        <h3 className="text-lg font-bold text-primary">Order History</h3>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {orders.map(order => (
                                            <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-background transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-background border border-border">
                                                        <Package className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-primary">{order.id}</p>
                                                        <p className="text-xs text-secondary">{order.date} • {order.items} Items</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <span className="text-sm font-mono font-medium text-primary">N$ {order.total.toLocaleString()}</span>
                                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                        {order.status}
                                                    </span>
                                                    <button className="text-xs font-bold text-secondary hover:text-primary uppercase tracking-widest">View</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-surface border border-border p-8 space-y-8"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-6">Account Settings</h3>
                                        <div className="grid gap-6 max-w-xl">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                                                <input type="email" value={user.email} disabled className="w-full bg-background border border-border p-3 text-sm text-secondary cursor-not-allowed" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Full Name</label>
                                                <input type="text" placeholder="Enter your full name" className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Phone Number</label>
                                                <input type="tel" placeholder="+264 ..." className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-border">
                                        <h3 className="text-lg font-bold text-primary mb-6">Preferences</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="w-5 h-5 border border-border bg-background flex items-center justify-center group-hover:border-accent">
                                                    <div className="w-3 h-3 bg-accent"></div>
                                                </div>
                                                <span className="text-sm text-secondary group-hover:text-primary">Subscribe to newsletter and stock updates</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="w-5 h-5 border border-border bg-background flex items-center justify-center group-hover:border-accent">
                                                    <div className="w-3 h-3 bg-accent"></div>
                                                </div>
                                                <span className="text-sm text-secondary group-hover:text-primary">Enable order notifications</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button className="px-8 py-4 bg-primary text-background text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
