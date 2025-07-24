import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Shield, 
  Clock,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

export function P2PTrading() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [orderModal, setOrderModal] = useState(false);
  const [createAdModal, setCreateAdModal] = useState(false);

  const mockAds = [
    {
      id: '1',
      merchant: 'GoldTrader_UG',
      rating: 4.9,
      trades: 1247,
      price: 0.98,
      margin: '+2.0%',
      min: 100,
      max: 5000,
      payment: ['M-PESA', 'Bank Transfer'],
      online: true,
      verified: true
    },
    {
      id: '2',
      merchant: 'SafeGold_KE',
      rating: 4.8,
      trades: 892,
      price: 0.985,
      margin: '+2.5%',
      min: 50,
      max: 2000,
      payment: ['MTN MoMo', 'Airtel Money'],
      online: true,
      verified: true
    },
    {
      id: '3',
      merchant: 'QuickSwap_TZ',
      rating: 4.7,
      trades: 634,
      price: 0.99,
      margin: '+3.0%',
      min: 200,
      max: 10000,
      payment: ['Visa/MasterCard', 'Bank Transfer'],
      online: false,
      verified: true
    }
  ];

  const handleCreateOrder = (ad: any) => {
    setSelectedAd(ad);
    setOrderModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">P2P Trading</h1>
            <p className="text-slate-600">Trade GAF tokens with verified merchants</p>
          </div>
          
          <button
            onClick={() => setCreateAdModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Ad
          </button>
        </div>

        {/* Trading Tabs */}
        <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'buy'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy GAF
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'sell'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sell GAF
          </button>
        </div>

        {/* Filters */}
        <Card>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>UGX</option>
                  <option>KES</option>
                  <option>USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>All Methods</option>
                  <option>M-PESA</option>
                  <option>MTN MoMo</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors">
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Ads List */}
        <div className="space-y-4">
          {mockAds.map((ad) => (
            <Card key={ad.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Merchant Info */}
                  <div className="flex items-center gap-4 lg:min-w-0 lg:flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {ad.merchant.charAt(0)}
                        </span>
                      </div>
                      {ad.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{ad.merchant}</h3>
                        {ad.verified && (
                          <Shield className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{ad.rating}</span>
                        </div>
                        <span>{ad.trades} trades</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{ad.online ? 'Online' : 'Last seen 2h ago'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trading Info */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-1">
                    <div>
                      <p className="text-sm text-slate-600">Price</p>
                      <p className="font-semibold text-slate-900">${ad.price}</p>
                      <p className="text-xs text-green-600">{ad.margin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Limit</p>
                      <p className="font-semibold text-slate-900">
                        ${ad.min} - ${ad.max}
                      </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <p className="text-sm text-slate-600">Payment</p>
                      <div className="flex flex-wrap gap-1">
                        {ad.payment.map((method) => (
                          <span
                            key={method}
                            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:min-w-fit">
                    <button
                      onClick={() => handleCreateOrder(ad)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === 'buy'
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {activeTab === 'buy' ? 'Buy' : 'Sell'}
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <MessageCircle className="h-5 w-5 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Modal */}
        <Modal isOpen={orderModal} onClose={() => setOrderModal(false)}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {activeTab === 'buy' ? 'Buy' : 'Sell'} GAF Order
            </h3>
            
            {selectedAd && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Merchant:</span>
                    <span className="font-medium">{selectedAd.merchant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Price:</span>
                    <span className="font-medium">${selectedAd.price}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Amount (GAF)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    {selectedAd.payment.map((method: string) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setOrderModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                    Create Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* Create Ad Modal */}
        <Modal isOpen={createAdModal} onClose={() => setCreateAdModal(false)}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Create Trading Ad</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Buy GAF</option>
                    <option>Sell GAF</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>UGX</option>
                    <option>KES</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Min Amount</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max Amount</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price Margin (%)</label>
                <input
                  type="number"
                  placeholder="2.0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Methods</label>
                <div className="grid grid-cols-2 gap-2">
                  {['M-PESA', 'MTN MoMo', 'Airtel Money', 'Bank Transfer', 'Visa/MasterCard'].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCreateAdModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                  Create Ad
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}