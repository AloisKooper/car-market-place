import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, LogOut, Car, Heart, ShieldCheck, CreditCard, Bell, MapPin, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

interface DashboardProps {
    user: any;
    isAdmin: boolean;
    wishlist: Product[];
    onSignOut: () => void;
    onNavigate: (path: string) => void;
    onProductsChange: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isAdmin, wishlist, onSignOut, onNavigate, onProductsChange }) => {
    const [loading, setLoading] = useState(false);

    const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
    const [isFetchingCatalog, setIsFetchingCatalog] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form States
    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        category: 'vehicles',
        price: '',
        image: '',
        shipping_info: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        engine: '',
        zero_to_sixty: '',
        specs: {}
    });

    const [specHp, setSpecHp] = useState('');
    const [specFitment, setSpecFitment] = useState('');
    const [specMaterial, setSpecMaterial] = useState('');

    const fetchCatalog = async () => {
        setIsFetchingCatalog(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) {
                setCatalogProducts(data);
            }
        } catch (err) {
            console.error("Error fetching catalog products:", err);
        }
        setIsFetchingCatalog(false);
    };

    useEffect(() => {
        if (activeTab === 'catalog' && isAdmin) {
            fetchCatalog();
        }
    }, [activeTab, isAdmin]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `catalog/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setNewProduct(prev => ({ ...prev, image: publicUrl }));
        } catch (error: any) {
            console.error("Error uploading image:", error.message);
            alert("Upload failed: " + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDeleteProduct = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
        
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            
            fetchCatalog();
            onProductsChange();
        } catch (error: any) {
            alert("Failed to delete product: " + error.message);
        }
    };

    const handleSubmitProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            alert("Please fill in Name, Price, and Image URL or upload a file.");
            return;
        }

        setSubmitting(true);
        try {
            const productId = newProduct.id.trim() || `car_${Math.random().toString(36).substring(2, 8)}`;
            const parsedPrice = parseFloat(newProduct.price);
            if (isNaN(parsedPrice)) {
                alert("Invalid price format.");
                return;
            }

            const parsedYear = newProduct.year ? parseInt(newProduct.year) : null;

            const productData = {
                id: productId,
                name: newProduct.name,
                category: newProduct.category,
                price: parsedPrice,
                image: newProduct.image,
                shipping_info: newProduct.shipping_info || 'In Stock',
                make: newProduct.category === 'vehicles' ? newProduct.make || null : null,
                model: newProduct.category === 'vehicles' ? newProduct.model || null : null,
                year: newProduct.category === 'vehicles' ? parsedYear : null,
                mileage: newProduct.category === 'vehicles' ? newProduct.mileage || null : null,
                transmission: newProduct.category === 'vehicles' ? newProduct.transmission : null,
                fuel_type: newProduct.category === 'vehicles' ? newProduct.fuel_type : null,
                engine: newProduct.category === 'vehicles' ? newProduct.engine || null : null,
                zero_to_sixty: newProduct.category === 'vehicles' ? newProduct.zero_to_sixty || null : null,
                specs: {
                    hpGain: specHp || 'Stock',
                    fitment: specFitment || 'N/A',
                    material: specMaterial || 'N/A'
                },
                rating: 5.0,
                reviews: 0
            };

            const { error } = await supabase
                .from('products')
                .insert([productData]);

            if (error) throw error;

            setNewProduct({
                id: '',
                name: '',
                category: 'vehicles',
                price: '',
                image: '',
                shipping_info: '',
                make: '',
                model: '',
                year: '',
                mileage: '',
                transmission: 'Automatic',
                fuel_type: 'Petrol',
                engine: '',
                zero_to_sixty: '',
                specs: {}
            });
            setSpecHp('');
            setSpecFitment('');
            setSpecMaterial('');
            setIsAddingNew(false);
            fetchCatalog();
            onProductsChange();
        } catch (error: any) {
            console.error("Error inserting product:", error);
            alert("Insertion failed: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const renderCatalogCMS = () => {
        if (isAddingNew) {
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                        <button 
                            type="button"
                            onClick={() => setIsAddingNew(false)} 
                            className="p-2 hover:bg-background text-secondary hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h3 className="text-xl font-bold text-primary">Add New Catalog Item</h3>
                            <p className="text-xs text-secondary">Insert a vehicle or accessory into the database</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmitProduct} className="space-y-6 max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* General Fields */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Product Name *</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g. 2018 Volkswagen Golf 7.5 R"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">ID (Unique Code - Optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. v11 (Leave blank to auto-generate)"
                                    value={newProduct.id}
                                    onChange={e => setNewProduct(prev => ({ ...prev, id: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Category *</label>
                                <select 
                                    value={newProduct.category}
                                    onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none"
                                >
                                    <option value="vehicles">Vehicles</option>
                                    <option value="wheels">Wheels</option>
                                    <option value="performance">Performance Parts</option>
                                    <option value="lighting">Lighting</option>
                                    <option value="interior">Interior Styling</option>
                                    <option value="exterior">Exterior Styling</option>
                                    <option value="audio">Car Audio</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Price (N$ / Numeric Value) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    placeholder="e.g. 485000"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Shipping Info / Inventory Location</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. In Stock - Windhoek or Import (14 Days)"
                                    value={newProduct.shipping_info}
                                    onChange={e => setNewProduct(prev => ({ ...prev, shipping_info: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            {/* Image Selection / Upload */}
                            <div className="space-y-2 md:col-span-2 bg-background/30 p-4 border border-border">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">Product Image *</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-[10px] text-secondary font-bold uppercase block">Upload File</span>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-surface file:text-primary hover:file:bg-surface/80" 
                                        />
                                        {uploadingImage && <p className="text-xs text-accent animate-pulse">Uploading image file...</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] text-secondary font-bold uppercase block">Or Paste URL directly</span>
                                        <input 
                                            type="text" 
                                            placeholder="Paste image web URL"
                                            value={newProduct.image}
                                            onChange={e => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                                            className="w-full bg-background border border-border p-2 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>
                                </div>
                                {newProduct.image && (
                                    <div className="mt-4 flex items-center gap-4">
                                        <img src={newProduct.image} alt="Preview" className="w-16 h-16 object-cover border border-border" />
                                        <span className="text-xs text-secondary truncate">{newProduct.image}</span>
                                    </div>
                                )}
                            </div>

                            {/* Vehicle-Specific Fields */}
                            {newProduct.category === 'vehicles' && (
                                <React.Fragment>
                                    <div className="md:col-span-2 border-t border-border pt-4 mt-2">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Vehicle Specifications</h4>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Make</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Volkswagen"
                                            value={newProduct.make}
                                            onChange={e => setNewProduct(prev => ({ ...prev, make: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Model</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Golf 7.5 R"
                                            value={newProduct.model}
                                            onChange={e => setNewProduct(prev => ({ ...prev, model: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Year</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 2018"
                                            value={newProduct.year}
                                            onChange={e => setNewProduct(prev => ({ ...prev, year: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Mileage</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. 68,000 km"
                                            value={newProduct.mileage}
                                            onChange={e => setNewProduct(prev => ({ ...prev, mileage: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Transmission</label>
                                        <select 
                                            value={newProduct.transmission}
                                            onChange={e => setNewProduct(prev => ({ ...prev, transmission: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none"
                                        >
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                            <option value="DSG">DSG</option>
                                            <option value="S-Tronic">S-Tronic</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Fuel Type</label>
                                        <select 
                                            value={newProduct.fuel_type}
                                            onChange={e => setNewProduct(prev => ({ ...prev, fuel_type: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none"
                                        >
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">Engine</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. 2.0L TSI Turbo"
                                            value={newProduct.engine}
                                            onChange={e => setNewProduct(prev => ({ ...prev, engine: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary">0 to 60 MPH Time</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. 4.6s"
                                            value={newProduct.zero_to_sixty}
                                            onChange={e => setNewProduct(prev => ({ ...prev, zero_to_sixty: e.target.value }))}
                                            className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                        />
                                    </div>
                                </React.Fragment>
                            )}

                            {/* Spec Key Value mapping */}
                            <div className="md:col-span-2 border-t border-border pt-4 mt-2">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Technical Specs & Tags</h4>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Power / HP (or Weight)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Stock (292 HP) or 9.5kg"
                                    value={specHp}
                                    onChange={e => setSpecHp(e.target.value)}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Drivetrain / Fitment</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 4Motion AWD or 5x112"
                                    value={specFitment}
                                    onChange={e => setSpecFitment(e.target.value)}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Color / Material</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Lapiz Blue Metallic or Forged Aluminum"
                                    value={specMaterial}
                                    onChange={e => setSpecMaterial(e.target.value)}
                                    className="w-full bg-background border border-border p-3 text-sm text-primary focus:border-accent outline-none" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-border">
                            <button 
                                type="submit" 
                                disabled={submitting || uploadingImage}
                                className="px-8 py-4 bg-accent text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? "Saving Product..." : "Save Product"}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setIsAddingNew(false)}
                                className="px-8 py-4 bg-transparent border border-border text-primary text-xs font-bold uppercase tracking-widest hover:bg-surface transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-primary">Catalog Management</h3>
                        <p className="text-xs text-secondary">Modify Marie Yashe Auto vehicle inventory and accessories</p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsAddingNew(true)} 
                        className="px-4 py-3 bg-accent text-white hover:bg-red-700 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                </div>

                {isFetchingCatalog ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto font-bold"></div>
                        <p className="text-xs text-secondary mt-4">Loading catalog database...</p>
                    </div>
                ) : catalogProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-surface text-secondary text-[10px] font-bold uppercase tracking-wider">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Item Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Code/ID</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {catalogProducts.map(p => (
                                    <tr key={p.id} className="hover:bg-background/40 transition-colors text-sm text-primary">
                                        <td className="p-4">
                                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-border" />
                                        </td>
                                        <td className="p-4 font-bold">{p.name}</td>
                                        <td className="p-4 uppercase text-xs tracking-widest text-secondary">{p.category}</td>
                                        <td className="p-4 font-mono font-bold text-accent">N$ {p.price.toLocaleString()}</td>
                                        <td className="p-4 font-mono text-xs text-secondary">{p.id}</td>
                                        <td className="p-4 text-right">
                                            <button 
                                                type="button"
                                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                                className="p-2 text-red-500 hover:bg-red-500/10 transition-colors rounded-sm"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-border bg-background/50">
                        <Car className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
                        <p className="text-secondary text-sm">No catalog products found in Supabase.</p>
                    </div>
                )}
            </div>
        );
    };

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
                        {isAdmin && (
                            <button
                                onClick={() => setActiveTab('catalog')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'catalog' ? 'bg-accent text-white shadow-lg' : 'bg-surface text-secondary hover:text-primary hover:bg-surface/80'}`}
                            >
                                <ShieldCheck className="w-4 h-4" /> Manage Catalog
                            </button>
                        )}
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

                            {activeTab === 'catalog' && isAdmin && (
                                <motion.div
                                    key="catalog"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-surface border border-border p-8 space-y-6 animate-fade-in"
                                >
                                    {renderCatalogCMS()}
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
