
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Auto sign in or show success message usually happens here
        alert('Check your email for the confirmation link!');
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface border border-border overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border bg-background">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-sm"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Auto Nations ID</h2>
              </div>
              <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 bg-background">
              <div className="flex gap-8 mb-8">
                <button
                  onClick={() => setMode('signin')}
                  className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${mode === 'signin' ? 'text-primary border-b-2 border-accent' : 'text-secondary hover:text-primary'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${mode === 'signup' ? 'text-primary border-b-2 border-accent' : 'text-secondary hover:text-primary'}`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface border border-border py-3 pl-10 pr-4 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface border border-border py-3 pl-10 pr-4 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-background py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : (mode === 'signin' ? 'Access Account' : 'Initialize Account')}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
