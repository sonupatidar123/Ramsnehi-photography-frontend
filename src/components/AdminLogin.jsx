import React, { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';

const AdminLogin = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save both access and refresh tokens
        localStorage.setItem('adminToken', data.access);
        localStorage.setItem('adminRefreshToken', data.refresh);
        setToken(data.access, data.refresh);
      } else {
        setError('Unauthorized Access: Invalid Credentials');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a09] flex items-center justify-center z-[10002] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c9a96e1a] border border-[#c9a96e33] mb-4">
            <ShieldCheck className="text-[#c9a96e]" size={32} />
          </div>
          <h2 className="text-[#f0e6d6] text-2xl font-serif tracking-widest uppercase">
            Ramsnehi Studio
          </h2>
          <p className="text-[#6a5f55] text-[10px] uppercase tracking-[0.3em] mt-2">
            Private Access Only
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-[#5a5048] uppercase font-bold ml-1">
              Username
            </label>
            <input
              required
              type="text"
              value={username}
              className="w-full bg-[#111110] border border-white/5 p-4 rounded-xl text-[#e8ddd0] outline-none focus:border-[#c9a96e40] transition-all"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#5a5048] uppercase font-bold ml-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              className="w-full bg-[#111110] border border-white/5 p-4 rounded-xl text-[#e8ddd0] outline-none focus:border-[#c9a96e40] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#c9a96e] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4b986] transition-colors mt-6 uppercase text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify Identity'}
          </button>
        </form>

        <p className="text-center text-[#3a342f] text-[10px] mt-8 uppercase tracking-widest">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;