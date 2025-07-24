import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'merchants' | 'transactions' | 'disputes'>('overview');

  const stats = {
    totalUsers: 12847,
    activeMerchants: 1247,
    totalVolume: 2400000,
    pendingDisputes: 23,
    kycPending: 156
  };

  const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', kyc: 'verified', joined: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', kyc: 'pending', joined: '2024-01-14' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', kyc: 'rejected', joined: '2024-01-13' },
  ];

  const merchants = [
    { id: '1', name: 'GoldTrader_UG', rating: 4.9, trades: 1247, volume: 125000, status: 'active' },
    { id: '2', name: 'SafeGold_KE', rating: 4.8, trades: 892, volume: 89000, status: 'active' },
    { id: '3', name: 'QuickSwap_TZ', rating: 4.7, trades: 634, volume: 67000, status: 'suspended' },
  ];

  const disputes = [
    { id: '1', orderId: 'ORD001', buyer: 'user123', seller: 'merchant456', amount: 500, status: 'open', created: '2024-01-15' },
    { id: '2', orderId: 'ORD002', buyer: 'user789', seller: 'merchant123', amount: 1000, status: 'investigating', created: '2024-01-14' },
  ];

  const TabButton = ({ id, label, isActive, onClick }: { id: string; label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600">Manage platform operations and monitoring</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-lg">
          <TabButton id="overview" label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <TabButton id="users" label="Users" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <TabButton id="merchants" label="Merchants" isActive={activeTab === 'merchants'} onClick={() => setActiveTab('merchants')} />
          <TabButton id="transactions" label="Transactions" isActive={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
          <TabButton id="disputes" label="Disputes" isActive={activeTab === 'disputes'} onClick={() => setActiveTab('disputes')} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600">Total Users</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600">Active Merchants</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.activeMerchants.toLocaleString()}</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600">Total Volume</p>
                      <p className="text-2xl font-bold text-slate-900">${stats.totalVolume.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600">Pending Disputes</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.pendingDisputes}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600">KYC Pending</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.kycPending}</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Users</h3>
                  <div className="space-y-3">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            user.kyc === 'verified' ? 'bg-green-100 text-green-800' :
                            user.kyc === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.kyc}
                          </span>
                          <p className="text-sm text-slate-600 mt-1">{user.joined}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Merchants</h3>
                  <div className="space-y-3">
                    {merchants.slice(0, 3).map((merchant) => (
                      <div key={merchant.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{merchant.name}</p>
                          <p className="text-sm text-slate-600">{merchant.trades} trades</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">${merchant.volume.toLocaleString()}</p>
                          <p className="text-sm text-slate-600">Rating: {merchant.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-900">User</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">KYC Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Joined</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{user.name}</td>
                        <td className="py-3 px-4 text-slate-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            user.kyc === 'verified' ? 'bg-green-100 text-green-800' :
                            user.kyc === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.kyc}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{user.joined}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-green-600 hover:text-green-700">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-700">
                              <XCircle className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Merchants Tab */}
        {activeTab === 'merchants' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Merchant Management</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Merchant</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Rating</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Trades</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Volume</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchants.map((merchant) => (
                      <tr key={merchant.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{merchant.name}</td>
                        <td className="py-3 px-4 text-slate-600">{merchant.rating}</td>
                        <td className="py-3 px-4 text-slate-600">{merchant.trades}</td>
                        <td className="py-3 px-4 text-slate-600">${merchant.volume.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {merchant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {merchant.status === 'active' ? (
                              <button className="p-1 text-red-600 hover:text-red-700">
                                <XCircle className="h-4 w-4" />
                              </button>
                            ) : (
                              <button className="p-1 text-green-600 hover:text-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Disputes Tab */}
        {activeTab === 'disputes' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Dispute Management</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{disputes.length} active disputes</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-slate-900">Order #{dispute.orderId}</span>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          dispute.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {dispute.status}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">{dispute.created}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Buyer</p>
                        <p className="font-medium text-slate-900">{dispute.buyer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Seller</p>
                        <p className="font-medium text-slate-900">{dispute.seller}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Amount</p>
                        <p className="font-medium text-slate-900">{dispute.amount} GAF</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors">
                        Resolve - Buyer
                      </button>
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors">
                        Resolve - Seller
                      </button>
                      <button className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
                        Need More Info
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}