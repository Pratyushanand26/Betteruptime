import React, { useState, useEffect } from 'react';
import { Plus, Zap, Wifi, WifiOff, AlertTriangle, X, Globe, Clock, TrendingUp, Eye, Settings } from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'warning';
  responseTime: number;
  lastChecked: string;
  uptime: number;
  region: string;
}

const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'Portfolio',
    url: 'myportfolio.com',
    status: 'up',
    responseTime: 245,
    lastChecked: '2m ago',
    uptime: 99.9,
    region: 'US-East'
  },
  {
    id: '2',
    name: 'E-commerce',
    url: 'mystore.com',
    status: 'up',
    responseTime: 182,
    lastChecked: '1m ago',
    uptime: 98.7,
    region: 'EU-West'
  },
  {
    id: '3',
    name: 'Blog Platform',
    url: 'myblog.com',
    status: 'warning',
    responseTime: 1250,
    lastChecked: '3m ago',
    uptime: 95.2,
    region: 'Asia-Pacific'
  },
  {
    id: '4',
    name: 'API Gateway',
    url: 'api.service.com',
    status: 'down',
    responseTime: 0,
    lastChecked: '5m ago',
    uptime: 87.3,
    region: 'US-West'
  },
  {
    id: '5',
    name: 'CDN Endpoint',
    url: 'cdn.assets.com',
    status: 'up',
    responseTime: 89,
    lastChecked: '30s ago',
    uptime: 99.8,
    region: 'Global'
  },
  {
    id: '6',
    name: 'Analytics',
    url: 'analytics.app.com',
    status: 'up',
    responseTime: 334,
    lastChecked: '4m ago',
    uptime: 96.1,
    region: 'US-Central'
  }
];

function App() {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: Website['status']) => {
    switch (status) {
      case 'up': return <Wifi className="h-5 w-5" />;
      case 'down': return <WifiOff className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Website['status']) => {
    switch (status) {
      case 'up': return 'from-emerald-500 to-green-600';
      case 'down': return 'from-red-500 to-rose-600';
      case 'warning': return 'from-amber-500 to-orange-600';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time === 0) return 'text-red-400';
    if (time < 200) return 'text-emerald-400';
    if (time < 500) return 'text-yellow-400';
    if (time < 1000) return 'text-orange-400';
    return 'text-red-400';
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWebsite.name && newWebsite.url) {
      const website: Website = {
        id: Date.now().toString(),
        name: newWebsite.name,
        url: newWebsite.url.replace(/^https?:\/\//, ''),
        status: 'up',
        responseTime: Math.floor(Math.random() * 500) + 100,
        lastChecked: 'Just now',
        uptime: 100,
        region: 'US-East'
      };
      setWebsites([...websites, website]);
      setNewWebsite({ name: '', url: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites(websites.filter(site => site.id !== id));
    setSelectedWebsite(null);
  };

  const upCount = websites.filter(w => w.status === 'up').length;
  const downCount = websites.filter(w => w.status === 'down').length;
  const warningCount = websites.filter(w => w.status === 'warning').length;
  const avgResponseTime = Math.round(websites.reduce((acc, w) => acc + w.responseTime, 0) / websites.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-xl">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Pulse Monitor
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {currentTime.toLocaleTimeString()} • {websites.length} endpoints tracked
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Endpoint</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">{upCount}</span>
                </div>
                <p className="text-gray-300 font-medium">Online</p>
                <p className="text-gray-500 text-sm">Healthy endpoints</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <WifiOff className="h-6 w-6 text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-red-400">{downCount}</span>
                </div>
                <p className="text-gray-300 font-medium">Offline</p>
                <p className="text-gray-500 text-sm">Need attention</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-amber-400" />
                  </div>
                  <span className="text-2xl font-bold text-amber-400">{warningCount}</span>
                </div>
                <p className="text-gray-300 font-medium">Warning</p>
                <p className="text-gray-500 text-sm">Slow response</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Clock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="text-2xl font-bold text-cyan-400">{avgResponseTime}ms</span>
                </div>
                <p className="text-gray-300 font-medium">Avg Response</p>
                <p className="text-gray-500 text-sm">Global average</p>
              </div>
            </div>
          </div>

          {/* Innovative Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {websites.map((website, index) => (
              <div
                key={website.id}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Status Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor(website.status)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`relative p-2 rounded-full bg-gradient-to-r ${getStatusColor(website.status)}`}>
                    <div className="text-white">
                      {getStatusIcon(website.status)}
                    </div>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getStatusColor(website.status)} animate-ping opacity-20`}></div>
                  </div>
                </div>

                <div className="relative">
                  {/* Website Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {website.name}
                    </h3>
                    <p className="text-gray-400 text-sm flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {website.url}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Response Time</span>
                      <span className={`font-mono font-bold ${getResponseTimeColor(website.responseTime)}`}>
                        {website.responseTime > 0 ? `${website.responseTime}ms` : 'Timeout'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Uptime</span>
                      <span className="text-emerald-400 font-bold">{website.uptime}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Region</span>
                      <span className="text-cyan-400 text-sm font-medium">{website.region}</span>
                    </div>
                  </div>

                  {/* Uptime Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getStatusColor(website.status)} transition-all duration-1000`}
                        style={{ width: `${website.uptime}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {website.lastChecked}
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => setSelectedWebsite(website)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 text-gray-300" />
                      </button>
                      <button 
                        onClick={() => handleDeleteWebsite(website.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Website Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Add New Endpoint</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddWebsite} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newWebsite.name}
                    onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="My API Service"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                    Endpoint URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={newWebsite.url}
                    onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://api.example.com"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 transform hover:scale-105"
                >
                  Add Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Website Detail Modal */}
      {selectedWebsite && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{selectedWebsite.name}</h3>
              <button
                onClick={() => setSelectedWebsite(null)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-300">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getStatusColor(selectedWebsite.status)}`}>
                      {getStatusIcon(selectedWebsite.status)}
                    </div>
                    <span className="text-white font-medium capitalize">{selectedWebsite.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-gray-400 text-sm">Response Time</p>
                    <p className={`text-lg font-bold ${getResponseTimeColor(selectedWebsite.responseTime)}`}>
                      {selectedWebsite.responseTime > 0 ? `${selectedWebsite.responseTime}ms` : 'Timeout'}
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-gray-400 text-sm">Uptime</p>
                    <p className="text-lg font-bold text-emerald-400">{selectedWebsite.uptime}%</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">URL</p>
                  <p className="text-white font-mono text-sm break-all">{selectedWebsite.url}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">Region</p>
                  <p className="text-cyan-400 font-medium">{selectedWebsite.region}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;