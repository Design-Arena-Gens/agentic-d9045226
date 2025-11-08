'use client';

import { useState } from 'react';
import { ArrowLeftRight, Wallet, CreditCard, Bitcoin, TrendingUp, Shield, Clock, Globe, ChevronDown, Search, Copy, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [transferType, setTransferType] = useState<'fiat' | 'crypto'>('fiat');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [copied, setCopied] = useState(false);

  const fiatCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];
  const cryptoCurrencies = ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'XRP'];

  const exchangeRate = 0.92;
  const convertedAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(2) : '';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PayFlow
                </h1>
                <p className="text-xs text-slate-500">Secure Payment Services</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition">Dashboard</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition">Transactions</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition">Settings</a>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transfer Form - Main Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Transfer Type Toggle */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
                <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() => setTransferType('fiat')}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                      transferType === 'fiat'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Fiat Transfer</span>
                  </button>
                  <button
                    onClick={() => setTransferType('crypto')}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                      transferType === 'crypto'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Bitcoin className="w-5 h-5" />
                    <span>Crypto Transfer</span>
                  </button>
                </div>
              </div>

              {/* Transfer Form */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      You Send
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-4 pr-32 text-2xl font-semibold border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                      />
                      <div className="absolute right-2 top-2">
                        <select
                          value={fromCurrency}
                          onChange={(e) => setFromCurrency(e.target.value)}
                          className="px-4 py-2 pr-10 bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-700 cursor-pointer hover:bg-slate-200 transition appearance-none"
                        >
                          {(transferType === 'fiat' ? fiatCurrencies : cryptoCurrencies).map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Arrow */}
                  <div className="flex justify-center">
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110">
                      <ArrowLeftRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Recipient Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Recipient Gets
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={convertedAmount}
                        readOnly
                        placeholder="0.00"
                        className="w-full px-4 py-4 pr-32 text-2xl font-semibold border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-600"
                      />
                      <div className="absolute right-2 top-2">
                        <select
                          value={toCurrency}
                          onChange={(e) => setToCurrency(e.target.value)}
                          className="px-4 py-2 pr-10 bg-slate-100 border border-slate-200 rounded-lg font-semibold text-slate-700 cursor-pointer hover:bg-slate-200 transition"
                        >
                          {(transferType === 'fiat' ? fiatCurrencies : cryptoCurrencies).map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {amount && (
                      <p className="mt-2 text-sm text-slate-500">
                        Exchange rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
                      </p>
                    )}
                  </div>

                  {/* Recipient Information */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {transferType === 'fiat' ? 'Recipient Account / IBAN' : 'Wallet Address'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder={transferType === 'fiat' ? 'GB29NWBK60161331926819' : '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'}
                        className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition font-mono text-sm"
                      />
                      <button className="absolute right-3 top-3 text-slate-400 hover:text-blue-600 transition">
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Transfer Fee</span>
                      <span className="font-semibold text-slate-800">$2.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Processing Time</span>
                      <span className="font-semibold text-slate-800">~2-5 minutes</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Total Amount</span>
                      <span className="text-xl font-bold text-blue-600">
                        {amount ? `${fromCurrency} ${(parseFloat(amount) + 2.5).toFixed(2)}` : `${fromCurrency} 0.00`}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition hover:scale-[1.02] flex items-center justify-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>Complete Transfer</span>
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Market Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-600">BTC/USD</p>
                    <p className="font-bold text-slate-800">$45,234</p>
                  </div>
                  <span className="text-green-600 font-semibold text-sm">+2.4%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-600">ETH/USD</p>
                    <p className="font-bold text-slate-800">$2,890</p>
                  </div>
                  <span className="text-green-600 font-semibold text-sm">+1.8%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-600">EUR/USD</p>
                    <p className="font-bold text-slate-800">1.0892</p>
                  </div>
                  <span className="text-red-600 font-semibold text-sm">-0.3%</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Enterprise Security
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">256-bit SSL Encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Two-Factor Authentication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Cold Wallet Storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">PCI DSS Compliant</span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">24/7 Support</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our team is here to help with any questions about your transfers.
              </p>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Instant Transfers</h3>
            <p className="text-slate-600">
              Process transactions in minutes with our high-speed payment infrastructure
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Global Coverage</h3>
            <p className="text-slate-600">
              Send money to over 180 countries with competitive exchange rates
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Bank-Level Security</h3>
            <p className="text-slate-600">
              Advanced encryption and fraud protection for every transaction
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">PayFlow PSP</h4>
              <p className="text-slate-400 text-sm">
                Secure and reliable payment processing for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Fiat Transfers</a></li>
                <li><a href="#" className="hover:text-white transition">Crypto Transfers</a></li>
                <li><a href="#" className="hover:text-white transition">Business API</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 PayFlow PSP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
