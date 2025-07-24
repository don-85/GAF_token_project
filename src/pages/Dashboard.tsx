import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user, connectWallet } = useAuth();
  const [showBalances, setShowBalances] = useState(true);
  const [walletConnecting, setWalletConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setWalletConnecting(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    connectWallet('0x1234...5678');
    setWalletConnecting(false);
  };

  const portfolioData = {
    totalValue: 12500.75,
    gafBalance: 12750,
    usdtBalance: 5420.30,
    bnbBalance: 2.85,
    changes: {
      gaf: 5.2,
      usdt: 0.1,
      bnb: -2.3
    }
  };

  const recentTransactions = [
    { id: '1', type: 'buy', asset: 'GAF', amount: 500, price: 0.98, date: '2024-01-15', status: 'completed' },
    { id: '2', type: 'sell', asset: 'USDT', amount: 1000, price: 1.00, date: '2024-01-14', status: 'completed' },
    { id: '3', type: 'swap', asset: 'BNB->GAF', amount: 0.5, price: 245.30, date: '2024-01-13', status: 'completed' },
    { id: '4', type: 'deposit', asset: 'UGX', amount: 50000, price: 0.027, date: '2024-01-12', status: 'pending' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}</h1>
            <p className="text-slate-600">Manage your gold-backed portfolio</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showBalances ? 'Hide' : 'Show'} Balances
            </button>
            
            {!user?.wallet ? (
              <button
                onClick={handleConnectWallet}
                disabled={walletConnecting}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Wallet className="h-4 w-4" />
                {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{user.wallet}</span>
                <Copy className="h-4 w-4 cursor-pointer hover:text-green-600" />
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Total Portfolio</p>
                  <p className="text-3xl font-bold">
                    {showBalances ? `$${portfolioData.totalValue.toLocaleString()}` : '****'}
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-amber-200" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600">GAF Balance</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {showBalances ? portfolioData.gafBalance.toLocaleString() : '****'}
                  </p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    +{portfolioData.changes.gaf}%
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600">USDT Balance</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {showBalances ? `$${portfolioData.usdtBalance.toLocaleString()}` : '****'}
                  </p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    +{portfolioData.changes.usdt}%
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600">BNB Balance</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {showBalances ? `${portfolioData.bnbBalance} BNB` : '****'}
                  </p>
                  <p className="text-sm text-red-600 flex items-center">
                    <ArrowDownLeft className="h-4 w-4" />
                    {portfolioData.changes.bnb}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Plus className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-800">Buy GAF</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <ArrowUpRight className="h-8 w-8 text-red-600 mb-2" />
                <span className="text-sm font-medium text-red-800">Sell GAF</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <ArrowDownLeft className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-800">Deposit</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-800">Swap</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
              <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-green-100' :
                      tx.type === 'sell' ? 'bg-red-100' :
                      tx.type === 'swap' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {tx.type === 'buy' ? <Plus className="h-5 w-5 text-green-600" /> :
                       tx.type === 'sell' ? <ArrowUpRight className="h-5 w-5 text-red-600" /> :
                       tx.type === 'swap' ? <TrendingUp className="h-5 w-5 text-blue-600" /> :
                       <ArrowDownLeft className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 capitalize">{tx.type} {tx.asset}</p>
                      <p className="text-sm text-slate-600">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">
                      {tx.amount.toLocaleString()} {tx.asset.split('->')[0]}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}