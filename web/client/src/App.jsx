import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Radio, Wifi, Activity } from 'lucide-react';
import AlertCard from './components/AlertCard';

const socket = io('http://localhost:3000');

function App() {
  const [alerts, setAlerts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    socket.on('alert', (newAlert) => {
      console.log('New alert received:', newAlert);
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('alert');
    };
  }, []);

  return (
    <div className="min-h-screen text-white max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 pb-6 border-b border-white/10 px-4 md:px-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
            <Radio className="w-12 h-12 text-blue-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NAADS RECEIVER
            </h1>
            <p className="text-sm text-slate-400 tracking-widest uppercase">National Alert Aggregation & Dissemination System</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="opacity-70">Monitoring</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
            <span className="opacity-70">{isConnected ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 opacity-30 px-4 md:px-8">
            <Radio className="w-24 h-24 mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold">Listening for alerts...</h2>
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-5xl mx-auto px-4 md:px-8">
            {alerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
