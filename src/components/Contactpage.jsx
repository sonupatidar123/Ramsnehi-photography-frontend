import React, { useState } from 'react';
import { Mail, Phone, MapPin} from 'lucide-react';
import { SiInstagram as Instagram } from '@icons-pack/react-simple-icons';
import { API_BASE } from '../config';

const INITIAL_FORM = {
  full_name: '',
  email: '',
  mobile_number: '',
  inquiry_type: 'Wedding Photography',
  custom_inquiry: ''
};

const ContactPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const finalData = {
      ...form,
      inquiry_type:
        form.inquiry_type === 'Other'
          ? form.custom_inquiry
          : form.inquiry_type,
    };

    try {
      const res = await fetch(`${API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        const data = await res.json();
        const firstError =
          Object.values(data)?.[0]?.[0] ?? 'Something went wrong.';
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
    <div id="contact" className="bg-white min-h-screen text-gray-900">

      {/* Header */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-4">
          Let's Capture Your Story
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Based in Mandsaur, available across Madhya Pradesh.
          Ready to turn your moments into timeless art.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-16">

        {/* Contact Info */}
        <div className="space-y-8">

          <h2 className="text-2xl font-semibold uppercase tracking-wider">
            Contact Details
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-full text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Call / WhatsApp</p>
                <p className="font-medium text-lg">+91 9644167702</p>
              </div>
            </div>

            

            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-full text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Location</p>
                <p className="font-medium text-lg">
                  Mandsaur, Madhya Pradesh
                </p>
              </div>
            </div>

          </div>

          {/* Social */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
              Follow Us
            </p>
            <div className="flex gap-6">
              <a
                href="https://instagram.com/ramsnehi_photography_mandsaur"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-500 transition"
              >
                <Instagram size={28} />
              </a>
              
            </div>
          </div>

        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border">

          {status === 'success' ? (
            <div className="text-center py-10 space-y-4">
              <h3 className="text-2xl font-serif">Inquiry Sent!</h3>
              <p className="text-gray-500">
                We'll contact you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2 border hover:bg-black hover:text-white"
              >
                Send Again
              </button>
            </div>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full p-4 bg-gray-50 rounded-xl"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full p-4 bg-gray-50 rounded-xl"
              />

              <input
                type="tel"
                name="mobile_number"
                value={form.mobile_number}
                onChange={handleChange}
                required
                placeholder="Mobile Number"
                className="w-full p-4 bg-gray-50 rounded-xl"
              />

              <select
                name="inquiry_type"
                value={form.inquiry_type}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 rounded-xl"
              >
                <option>Wedding Photography</option>
                <option>Pre-Wedding Shoot</option>
                <option>Films & Cinematography</option>
                <option>Commercial/Event</option>
                <option>Other</option>
              </select>

              {/* Custom Input */}
              {form.inquiry_type === 'Other' && (
                <textarea
                  name="custom_inquiry"
                  value={form.custom_inquiry}
                  onChange={handleChange}
                  required
                  placeholder="Describe your requirement..."
                  className="w-full p-4 bg-gray-50 rounded-xl"
                />
              )}

              {status === 'error' && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-black text-white py-4 rounded-xl uppercase tracking-wider"
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;