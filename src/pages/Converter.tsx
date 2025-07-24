import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Calculator, TrendingUp } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';

export function Converter() {
  const [fromCurrency, setFromCurrency] = useState('GAF');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromAmount, setFromAmount] = useState('1000');
  const [toAmount, setToAmount] = useState('980');

  const currencies = [
    { code: 'GAF', name: 'Gold Africa Token', rate: 0.98 },
    { code: 'USD', name: 'US Dollar', rate: 1.00 },
    { code: 'UGX', name: 'Uganda Shilling', rate: 0.00027 },
    { code: 'KES', name: 'Kenyan Shilling', rate: 0.0067 },
    { code: 'USDT', name: 'Tether', rate: 1.00 },
    { code: 'BNB', name: 'Binance Coin', rate: 245.30 },
    { code: 'GOLD', name: 'Gold (grams)', rate: 65.25 }
  ];

  const goldPrice = 65.25; // USD per gram
  const gafToGoldRate = 0.98; // GAF is 2% discount to gold

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
      const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
      const converted = (parseFloat(fromAmount) * fromRate / toRate).toFixed(2);
      setToAmount(converted);
    }
  }, [fromAmount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const goldConversions = [
    { amount: '1 GAF', equals: '1.02 grams gold', discount: '2% discount applied' },
    { amount: '100 GAF', equals: '102 grams gold', discount: '2% discount applied' },
    { amount: '1000 GAF', equals: '1.02 kg gold', discount: '2% discount applied' },
  ];

  const calculators = [
    {
      title: 'Escrow Fee Calculator',
      description: 'Calculate fees for P2P trading',
      fields: [
        { label: 'Trade Amount (GAF)', value: '1000' },
        { label: 'Fee Rate (%)', value: '0.5' }
      ],
      result: 'Escrow Fee: 5 GAF'
    },
    {
      title: 'Gold Reserve Calculator',
      description: 'Calculate gold backing ratio',
      fields: [
        { label: 'GAF Supply', value: '1,000,000' },
        { label: 'Gold Reserves (grams)', value: '1,020,000' }
      ],
      result: 'Backing Ratio: 102%'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Converter & Calculators</h1>
          <p className="text-slate-600">Convert between GAF, gold, fiat and crypto currencies</p>
        </div>

        {/* Main Converter */}
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Currency Converter</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
              {/* From Currency */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
                  <select 
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-full px-3 py-3 text-lg border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={swapCurrencies}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <ArrowUpDown className="h-6 w-6 text-slate-600" />
                </button>
              </div>

              {/* To Currency */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
                  <select 
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Result</label>
                  <div className="w-full px-3 py-3 text-lg bg-slate-50 border border-slate-300 rounded-lg">
                    {toAmount}
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-800">
                  1 {fromCurrency} = {(currencies.find(c => c.code === fromCurrency)?.rate || 1) / (currencies.find(c => c.code === toCurrency)?.rate || 1)} {toCurrency}
                </span>
                <span className="text-sm text-amber-600">Live rates</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Gold Conversion Reference */}
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">GAF to Gold Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goldConversions.map((conversion, index) => (
                <div key={index} className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-900">{conversion.amount}</p>
                    <p className="text-amber-600 font-medium">=</p>
                    <p className="text-lg font-semibold text-amber-700">{conversion.equals}</p>
                    <p className="text-xs text-amber-600 mt-2">{conversion.discount}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">Current Gold Price:</span>
                <span className="font-medium text-slate-900">${goldPrice}/gram</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">GAF Price (2% discount):</span>
                <span className="font-medium text-green-600">${(goldPrice * gafToGoldRate).toFixed(2)}/gram equivalent</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Calculators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {calculators.map((calc, index) => (
            <Card key={index}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-6 w-6 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{calc.title}</h3>
                    <p className="text-sm text-slate-600">{calc.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {calc.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">{calc.result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Live Rates */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-slate-900">Live Exchange Rates</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currencies.map((currency) => (
                <div key={currency.code} className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{currency.code}</p>
                      <p className="text-sm text-slate-600">{currency.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        ${currency.rate.toFixed(currency.rate < 1 ? 6 : 2)}
                      </p>
                      <p className="text-xs text-green-600">+0.5%</p>
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