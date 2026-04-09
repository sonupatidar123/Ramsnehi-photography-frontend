import React, { useState } from 'react';
import { Mail, Phone, MapPin, Camera } from 'lucide-react';
import { SiInstagram as Instagram } from '@icons-pack/react-simple-icons';
import { API_BASE } from '../config';

// POST /api/inquiries/
// Fields: full_name, email, mobile_number, inquiry_type

const INITIAL_FORM = {
  full_name: '',
  email: '',
  mobile_number: '',
  inquiry_type: 'Wedding Photography',
};

const ContactPage = () => {
  const [form,     setForm]     = useState(INITIAL_FORM);
  const [status,   setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        const firstError = Object.values(data)?.[0]?.[0] ?? 'Something went wrong.';
        throw new Error(firstError);
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div id="contact" className="bg-white min-h-screen font-sans text-gray-900 scroll-mt-20">

      {/* Header */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
          Let's Capture Your Story
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Based in Mandsaur, available across Madhya Pradesh.
          Ready to turn your moments into timeless art.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-16">

        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 uppercase tracking-wider">
              Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-black p-3 rounded-full text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Call / WhatsApp
                  </p>
                  <p className="font-medium text-lg">+91 9644167702</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black p-3 rounded-full text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Email
                  </p>
                  <p className="font-medium text-lg">hello@ramsnehiphotography.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black p-3 rounded-full text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Studio Location
                  </p>
                  <p className="font-medium text-lg">Mandsaur, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-gray-400">
              Follow the Journey
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/ramsnehi_photography"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={28} />
              </a>
              <a
                href="#"
                className="hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <Camera size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-50">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif">Inquiry Sent!</h3>
              <p className="text-gray-500 max-w-xs">
                Thank you! I'll get back to you shortly via call or email.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-8 py-3 border border-gray-900 uppercase text-xs tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                  placeholder="+91 00000 00000"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">
                  Inquiry Type
                </label>
                <select
                  name="inquiry_type"
                  value={form.inquiry_type}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all appearance-none"
                >
                  <option>Wedding Photography</option>
                  <option>Pre-Wedding Shoot</option>
                  <option>Films &amp; Cinematography</option>
                  <option>Commercial/Event</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-black text-white py-5 rounded-xl font-bold hover:bg-zinc-800 transition-all duration-500 uppercase tracking-[0.3em] text-xs disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;