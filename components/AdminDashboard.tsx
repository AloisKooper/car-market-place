import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { MAKES } from '../constants';
import { Plus, Trash2, Save, Edit3, X, Shield, Mail, Lock } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  isDarkMode: boolean;
  user: any;
  isAdmin: boolean;
}

const TRANSMISSIONS: Product['transmission'][] = ['Automatic', 'Manual', 'DSG', 'PDK'];
const FUELS: Product['fuelType'][] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const CATEGORIES = ['vehicles', 'wheels', 'lighting', 'exterior', 'audio', 'interior', 'performance'];
const VEHICLE_TYPES = ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Bakkie', 'Truck', '7 Seater', 'Van'];

const emptyProduct: Partial<Product> = {
  id: '',
  name: '',
  category: 'vehicles',
  price: 0,
  image: '',
  images: [],
  rating: 0,
  reviews: 0,
  featured: false,
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, setProducts, isDarkMode, user, isAdmin }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Product>>(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  const handleRemoveImage = (index: number) => {
    setDraft(prev => {
      const images = prev.images ? [...prev.images] : (prev.image ? [prev.image] : []);
      if (index < 0 || index >= images.length) return prev;
      images.splice(index, 1);
      return {
        ...prev,
        image: images[0] || prev.image || '',
        images: images,
      };
    });
  };

  if (!user || !isAdmin) {
    return (
      <motion.div
        key="admin-login"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-center">
          <div className="w-full max-w-md border border-border bg-surface p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-accent text-background flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Admin Access</p>
                <p className="text-sm font-semibold text-primary">Inventory Control Console</p>
              </div>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-background border border-border pl-9 pr-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-background border border-border pl-9 pr-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 bg-primary text-background py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent disabled:opacity-60"
              >
                {authLoading ? 'Authorizing…' : 'Enter Admin Console'}
              </button>
            </form>

            <p className="mt-4 text-[10px] text-secondary leading-relaxed">
              Access is restricted to demo admin accounts that also exist in the <code>admin_users</code> table in Supabase.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const startCreate = () => {
    setEditingId('new');
    setDraft({
      ...emptyProduct,
      id: crypto.randomUUID(),
      images: [],
    });
    setError(null);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setDraft({
      ...p,
      images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : []),
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(emptyProduct);
    setError(null);
  };

  const handleDraftChange = (field: keyof Product, value: any) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const persistProduct = async () => {
    if (!draft.id || !draft.name) {
      setError('ID and Name are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload: any = {
      id: draft.id,
      name: draft.name,
      category: draft.category || 'vehicles',
      price: draft.price ?? 0,
      image: draft.image || '',
      rating: draft.rating ?? 0,
      reviews: draft.reviews ?? 0,
      featured: !!draft.featured,
      shipping_info: draft.shippingInfo ?? null,
      make: draft.make ?? null,
      model: draft.model ?? null,
      vehicle_type: draft.vehicleType ?? null,
      year: draft.year ?? null,
      mileage: draft.mileage ?? null,
      transmission: draft.transmission ?? null,
      fuel_type: draft.fuelType ?? null,
      engine: draft.engine ?? null,
      zero_to_sixty: draft.zeroToSixty ?? null,
      specs: draft.specs ?? null,
    };

    const isNew = editingId === 'new';

    const { error: dbError } = isNew
      ? await supabase.from('products').insert(payload)
      : await supabase.from('products').update(payload).eq('id', draft.id);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    // Sync product_images table for gallery (up to 4 images)
    if (draft.id) {
      const images = (draft.images && draft.images.length > 0)
        ? draft.images.slice(0, 4)
        : (draft.image ? [draft.image] : []);

      await supabase.from('product_images').delete().eq('product_id', draft.id);

      if (images.length > 0) {
        const rows = images.map((url, index) => ({
          product_id: draft.id,
          url,
          position: index,
        }));
        const { error: imgError } = await supabase.from('product_images').insert(rows);
        if (imgError) {
          setError(imgError.message);
        }
      }
    }

    // Update local state
    setProducts(
      isNew
        ? [...products, draft as Product]
        : products.map(p => (p.id === draft.id ? (draft as Product) : p))
    );

    setSaving(false);
    cancelEdit();
  };

  const removeProduct = async (id: string) => {
    if (!confirm('Remove this product from inventory?')) return;

    const { error: dbError } = await supabase.from('products').delete().eq('id', id);
    if (dbError) {
      setError(dbError.message);
      return;
    }

    setProducts(products.filter(p => p.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError(null);

      const ext = file.name.split('.').pop();
      const safeId = draft.id || crypto.randomUUID();
      const fileName = `${safeId}.${ext}`;
      const filePath = `vehicles/${fileName}`;

      const { data, error: uploadError } = await supabase
        .storage
        .from('vehicle-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError || !data) {
        setError(uploadError?.message || 'Image upload failed.');
        setUploadingImage(false);
        return;
      }

      const { data: publicData } = supabase
        .storage
        .from('vehicle-images')
        .getPublicUrl(data.path);

      if (publicData?.publicUrl) {
        setDraft(prev => {
          const existing = prev.images && prev.images.length > 0
            ? prev.images
            : (prev.image ? [prev.image] : []);
          if (existing.length >= 4) {
            setError('You can upload up to 4 images per listing.');
            return prev;
          }
          const updatedImages = [...existing, publicData.publicUrl];
          return {
            ...prev,
            image: updatedImages[0],
            images: updatedImages,
            id: prev.id || safeId,
          };
        });
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error during image upload.');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <motion.div
      key="admin-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-background transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-border pb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-2">CMS / Inventory Control</p>
            <h1 className="text-3xl md:text-4xl font-light text-primary">
              Admin <span className="font-bold">Dashboard</span>
            </h1>
          </div>
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border border-border bg-surface hover:border-accent hover:text-accent transition-colors"
          >
            <Plus className="w-4 h-4" /> New Product
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/30 bg-red-500/5 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Editor Panel */}
        {editingId && (
          <div className="mb-10 border border-border bg-surface p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                {editingId === 'new' ? 'Create Product' : 'Edit Product'}
              </h2>
              <button onClick={cancelEdit} className="text-secondary hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">ID</label>
                  <input
                    value={draft.id || ''}
                    onChange={e => handleDraftChange('id', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    disabled={editingId !== 'new'}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Name</label>
                  <input
                    value={draft.name || ''}
                    onChange={e => handleDraftChange('name', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Category</label>
                    <select
                      value={draft.category || 'vehicles'}
                      onChange={e => handleDraftChange('category', e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Price (N$)</label>
                    <input
                      type="number"
                      value={draft.price === undefined ? '' : draft.price}
                      min={0}
                      step={1000}
                      onChange={e => {
                        const val = e.target.value;
                        handleDraftChange('price', val === '' ? undefined : Number(val));
                      }}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Image URL</label>
                  <input
                    value={draft.image || ''}
                    onChange={e => handleDraftChange('image', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                  />
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Or Upload Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="px-3 py-1 text-[11px] uppercase tracking-widest border border-border text-secondary hover:text-primary hover:border-primary cursor-pointer">
                        {uploadingImage ? 'Uploading…' : 'Choose File'}
                      </div>
                    </div>
                  </div>
                  {draft.images && draft.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {draft.images.slice(0, 4).map((img, idx) => (
                        <div key={idx} className="relative aspect-square bg-background border border-border overflow-hidden">
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Make</label>
                    <select
                      value={draft.make || ''}
                      onChange={e => handleDraftChange('make', e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    >
                      <option value="">Select Make</option>
                      {MAKES.map(make => (
                        <option key={make} value={make}>{make}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Model</label>
                    <input
                      value={draft.model || ''}
                      onChange={e => handleDraftChange('model', e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                {draft.category === 'vehicles' && (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Year</label>
                        <input
                          type="number"
                          value={draft.year ?? ''}
                          onChange={e => handleDraftChange('year', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Transmission</label>
                        <select
                          value={draft.transmission || ''}
                          onChange={e => handleDraftChange('transmission', e.target.value as Product['transmission'])}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        >
                          <option value="">Select</option>
                          {TRANSMISSIONS.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Fuel</label>
                        <select
                          value={draft.fuelType || ''}
                          onChange={e => handleDraftChange('fuelType', e.target.value as Product['fuelType'])}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        >
                          <option value="">Select</option>
                          {FUELS.map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Type (Body Style)</label>
                      <select
                        value={draft.vehicleType || ''}
                        onChange={e => handleDraftChange('vehicleType', e.target.value)}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                      >
                        <option value="">Select Type</option>
                        {VEHICLE_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Engine</label>
                        <input
                          value={draft.engine || ''}
                          onChange={e => handleDraftChange('engine', e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">0-60 mph</label>
                        <input
                          value={draft.zeroToSixty || ''}
                          onChange={e => handleDraftChange('zeroToSixty', e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Mileage</label>
                        <input
                          value={draft.mileage || ''}
                          onChange={e => handleDraftChange('mileage', e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Shipping Info</label>
                  <input
                    value={draft.shippingInfo || ''}
                    onChange={e => handleDraftChange('shippingInfo', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
                  />
                  <div className="mt-2 flex gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleDraftChange('shippingInfo', 'In Stock')}
                      className="px-3 py-1 border border-border text-secondary hover:text-green-500 hover:border-green-500 uppercase tracking-widest"
                    >
                      In Stock
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDraftChange('shippingInfo', 'Import Item')}
                      className="px-3 py-1 border border-border text-secondary hover:text-accent hover:border-accent uppercase tracking-widest"
                    >
                      Import Item
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <label className="flex items-center gap-2 text-xs text-secondary">
                    <input
                      type="checkbox"
                      checked={!!draft.featured}
                      onChange={e => handleDraftChange('featured', e.target.checked)}
                      className="w-3 h-3"
                    />
                    Featured in showroom
                  </label>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Description</label>
                  <textarea
                    value={draft.description || ''}
                    onChange={e => handleDraftChange('description', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border text-secondary hover:text-primary hover:border-primary"
              >
                Cancel
              </button>
              <button
                onClick={persistProduct}
                disabled={saving}
                className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-background hover:bg-accent disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? 'Saving...' : 'Save Changes'}
                {!saving && <Save className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Inventory List */}
        <div className="space-y-6">
          {/* Mobile: card list */}
          <div className="grid gap-4 md:hidden">
            {products.map(p => (
              <div key={p.id} className="border border-border bg-surface p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">{p.category}</p>
                    <p className="text-base font-semibold text-primary break-words">{p.name}</p>
                    <p className="text-xs text-secondary mt-1">{p.vehicleType || (p.make || '-') + (p.model ? ` · ${p.model}` : '')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono text-secondary uppercase tracking-widest">Price</p>
                    <p className="text-sm font-semibold text-primary">N$ {p.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-[11px] uppercase tracking-widest">
                    {p.shippingInfo?.includes('Stock') ? (
                      <span className="text-green-500">In Stock</span>
                    ) : p.shippingInfo ? (
                      <span className="text-accent">Import</span>
                    ) : (
                      <span className="text-secondary">Unspecified</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 text-[11px] uppercase tracking-widest border border-border text-secondary hover:text-primary hover:border-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="p-1.5 border border-red-500/40 text-red-500 hover:bg-red-500/10 rounded-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="border border-dashed border-border bg-surface/40 p-6 text-center text-secondary text-sm">
                No products in inventory yet. Use "New Product" to create the first entry.
              </div>
            )}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block border border-border bg-surface overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-background/80 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-secondary">Name</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-secondary">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-secondary">Price</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-secondary">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t border-border hover:bg-background/60">
                    <td className="px-4 py-3">
                      <div className="font-medium text-primary">{p.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-secondary">{p.category}</div>
                    </td>
                    <td className="px-4 py-3 text-secondary">
                      {p.vehicleType || (p.make || '-') + (p.model ? ` · ${p.model}` : '')}
                    </td>
                    <td className="px-4 py-3 text-primary font-semibold">
                      N$ {p.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[11px] uppercase tracking-widest">
                      {p.shippingInfo?.includes('Stock') ? (
                        <span className="text-green-500">In Stock</span>
                      ) : p.shippingInfo ? (
                        <span className="text-accent">Import</span>
                      ) : (
                        <span className="text-secondary">Unspecified</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1.5 border border-border text-secondary hover:text-primary hover:border-primary rounded-sm"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="p-1.5 border border-red-500/40 text-red-500 hover:bg-red-500/10 rounded-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-secondary text-sm">
                      No products in inventory yet. Use "New Product" to create the first entry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
