import React, { useState } from 'react';
import { Coins, Shield, TrendingUp, Users, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
      {/* Header */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">GOLD AFRICA</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Trade Gold-Backed Tokens
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Secure P2P trading platform for GAF tokens with fiat integration across Africa
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Shield className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Secure Escrow</h3>
                <p className="text-slate-300 text-sm">Smart contract protection</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Live Prices</h3>
                <p className="text-slate-300 text-sm">Real-time gold rates</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="user@example.com or admin@gaf.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-sm text-slate-400">
              <p>Demo accounts: user@example.com or admin@gaf.com</p>
              <p>Use any password to access the platform</p>
            </div>
          </div>
        </div>

        {/* Right Side - Statistics */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="max-w-md space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Platform Statistics</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300">Total Volume</p>
                    <p className="text-2xl font-bold text-amber-400">$2.4M</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-amber-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300">Active Merchants</p>
                    <p className="text-2xl font-bold text-green-400">1,247</p>
                  </div>
                  <Users className="h-12 w-12 text-green-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300">GAF Price</p>
                    <p className="text-2xl font-bold text-white">$0.98</p>
                    <p className="text-sm text-green-400">+2.5%</p>
                  </div>
                  <Coins className="h-12 w-12 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}