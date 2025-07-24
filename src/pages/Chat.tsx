import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Image, 
  Shield, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'merchant';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileName?: string;
}

export function Chat() {
  const { orderId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'merchant',
      content: 'Hello! I see you want to buy 1000 GAF tokens. Please confirm your payment method.',
      timestamp: '2024-01-15 10:30',
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      content: 'Hi! Yes, I want to proceed with M-PESA payment. What are the next steps?',
      timestamp: '2024-01-15 10:32',
      type: 'text'
    },
    {
      id: '3',
      sender: 'merchant',
      content: 'Great! Please send 980 USD to M-PESA number: +256700123456. After payment, upload the screenshot here.',
      timestamp: '2024-01-15 10:33',
      type: 'text'
    },
    {
      id: '4',
      sender: 'user',
      content: 'Payment sent! Here is the confirmation screenshot.',
      timestamp: '2024-01-15 10:45',
      type: 'image',
      fileName: 'payment_confirmation.jpg'
    },
    {
      id: '5',
      sender: 'merchant',
      content: 'Perfect! I can see the payment. Releasing the GAF tokens to your wallet now.',
      timestamp: '2024-01-15 10:47',
      type: 'text'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      content: message,
      timestamp: new Date().toLocaleString(),
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      content: `Uploaded file: ${file.name}`,
      timestamp: new Date().toLocaleString(),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileName: file.name
    };

    setMessages([...messages, newMessage]);
  };

  const orderInfo = {
    id: orderId || 'ORD001',
    merchant: 'GoldTrader_UG',
    amount: 1000,
    price: 0.98,
    total: 980,
    status: 'in_progress',
    timeLeft: '23:45:12'
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Order Chat</h1>
          <p className="text-slate-600">Secure communication for Order #{orderInfo.id}</p>
        </div>

        {/* Order Info */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Order ID</p>
                  <p className="font-semibold text-slate-900">#{orderInfo.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Merchant</p>
                  <p className="font-semibold text-slate-900">{orderInfo.merchant}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Amount</p>
                  <p className="font-semibold text-slate-900">{orderInfo.amount} GAF</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="font-semibold text-slate-900">${orderInfo.total}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-sm">{orderInfo.timeLeft}</span>
                </div>
                <span className="inline-flex px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{orderInfo.merchant}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-600">Escrow Protection</p>
                <div className="flex items-center gap-1 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {msg.type === 'image' && (
                    <div className="mb-2">
                      <div className="w-full h-32 bg-slate-200 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-xs mt-1 opacity-75">{msg.fileName}</p>
                    </div>
                  )}
                  
                  {msg.type === 'file' && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-black/10 rounded">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{msg.fileName}</span>
                    </div>
                  )}
                  
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-amber-100' : 'text-slate-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12"
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>Messages are encrypted and auto-expire after trade completion</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Actions */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                <CheckCircle2 className="h-5 w-5" />
                Mark as Paid
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                <Shield className="h-5 w-5" />
                Release Escrow
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                <Clock className="h-5 w-5" />
                Raise Dispute
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}