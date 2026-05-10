import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users, Image as ImageIcon, Film, Plus, Trash2,
  LogOut, Loader2, X, UploadCloud, AlertTriangle, Book, MessageSquare,
  Menu, ChevronRight
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import API_BASE_URL from '../config';

const BASE_URL = `${API_BASE_URL}/api`;

const GOLD   = '#c9a96e';
const GOLD2  = 'rgba(201,169,110,0.12)';
const BORDER = 'rgba(255,255,255,0.06)';
const CARD_BG = '#111110';
const PAGE_BG = '#0a0a09';

const endpointMap = {
  Inquiries: 'inquiries',
  Gallery:   'gallery',
  Films:     'films',
  Blogs:     'blogs',
  Feedbacks: 'feedbacks',
};

const sansFont  = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const serifFont = { fontFamily: "'DM Serif Display', Georgia, serif" };

const saveTokens  = (access, refresh) => {
  localStorage.setItem('adminToken', access);
  if (refresh) localStorage.setItem('adminRefreshToken', refresh);
};
const clearTokens = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRefreshToken');
};

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
const DeleteConfirmModal = ({ target, onConfirm, onCancel, isDeleting }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && !isDeleting) onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel, isDeleting]);

  const nounMap = {
    Gallery:   'photo',
    Films:     'film',
    Inquiries: 'inquiry',
    Feedback:  'feedback entry',
    Blogs:     'blog post',
  };
  const noun = nounMap[target.tab] ?? 'entry';

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => !isDeleting && onCancel()}
      />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 340 }}
        className="relative w-full sm:max-w-[390px] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#131312', border: '1px solid rgba(255,255,255,0.09)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle for mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/10" />
        </div>

        {/* Red accent */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 55%, transparent 100%)' }} />

        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-5">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, type: 'spring', damping: 18, stiffness: 320 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{ background: 'rgba(239,68,68,0.35)' }} />
              <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <Trash2 size={22} className="text-red-400" />
              </div>
            </motion.div>
          </div>

          <h3 className="text-center mb-2" style={{ ...serifFont, color: '#f0e6d6', fontSize: 20 }}>
            Delete this {noun}?
          </h3>
          <p className="text-center text-sm leading-relaxed" style={{ color: '#6a5f55' }}>
            This is a <span style={{ color: '#c8bfb4', fontWeight: 500 }}>permanent</span> action.
          </p>

          {target.label && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-4 mx-auto max-w-xs px-4 py-2 rounded-xl text-center text-xs truncate"
              style={{ color: GOLD, background: GOLD2, border: `1px solid ${GOLD}20` }}
            >
              {target.label}
            </motion.div>
          )}

          <div className="my-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

          <div className="flex gap-3">
            <button
              onClick={onCancel} disabled={isDeleting}
              className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#7a6f65' }}
              onMouseEnter={(e) => { if (!isDeleting) { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#c8bfb4'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#7a6f65'; }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm} disabled={isDeleting}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)', color: '#fff', boxShadow: '0 4px 22px rgba(239,68,68,0.30)' }}
            >
              {isDeleting ? <><Loader2 size={15} className="animate-spin" /> Deleting…</> : <><Trash2 size={15} /> Yes, Delete</>}
            </button>
          </div>

          <p className="text-center text-[10px] mt-4 flex items-center justify-center gap-1.5" style={{ color: '#3d3530' }}>
            <AlertTriangle size={10} /> All associated data will be permanently removed
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Bottom Nav for Mobile ────────────────────────────────────────────────────
const MobileBottomNav = ({ tabs, activeTab, onSelect }) => (
  <nav
    className="fixed bottom-0 left-0 right-0 z-[90] flex lg:hidden"
    style={{ background: '#0e0e0d', borderTop: `1px solid ${BORDER}`, paddingBottom: 'env(safe-area-inset-bottom)' }}
  >
    {tabs.map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        onClick={() => onSelect(id)}
        className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
        style={{ color: activeTab === id ? GOLD : '#4a4240' }}
      >
        <Icon size={18} />
        <span style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: activeTab === id ? 600 : 400 }}>
          {label}
        </span>
      </button>
    ))}
  </nav>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const queryClient = useQueryClient();

  const [token,        setToken]        = useState(() => localStorage.getItem('adminToken'));
  const [isValidating, setIsValidating] = useState(true);
  const [activeTab,    setActiveTab]    = useState('Inquiries');
  const [isSidebarOpen,setIsSidebarOpen]= useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isSaving,     setIsSaving]     = useState(false);
  const [formData,     setFormData]     = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting,   setIsDeleting]   = useState(false);

  const handleLogout = useCallback(() => {
    clearTokens();
    setToken(null);
    queryClient.clear();
  }, [queryClient]);

  const tryRefreshToken = useCallback(async () => {
    const refresh = localStorage.getItem('adminRefreshToken');
    if (!refresh) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      if (res.ok) {
        const data = await res.json();
        saveTokens(data.access, data.refresh ?? refresh);
        return data.access;
      }
      return null;
    } catch { return null; }
  }, []);

  useEffect(() => {
    const validate = async () => {
      const saved = localStorage.getItem('adminToken');
      if (!saved) { setIsValidating(false); return; }
      try {
        const res = await fetch(`${BASE_URL}/inquiries/`, { headers: { Authorization: `Bearer ${saved}` } });
        if (res.status === 401) {
          const newToken = await tryRefreshToken();
          if (newToken) setToken(newToken);
          else handleLogout();
        }
      } catch { /* network error */ }
      finally { setIsValidating(false); }
    };
    validate();
  }, [handleLogout, tryRefreshToken]);

  const authFetch = useCallback(async (url, options = {}) => {
    let currentToken = localStorage.getItem('adminToken');
    let res = await fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${currentToken}` },
    });
    if (res.status === 401) {
      const newToken = await tryRefreshToken();
      if (newToken) {
        setToken(newToken);
        res = await fetch(url, { ...options, headers: { ...options.headers, Authorization: `Bearer ${newToken}` } });
      } else {
        handleLogout();
        throw new Error('Session expired. Please log in again.');
      }
    }
    return res;
  }, [tryRefreshToken, handleLogout]);

  const { data: records = [], isLoading, isFetching } = useQuery({
    queryKey: [activeTab],
    queryFn: async () => {
      const res = await authFetch(`${BASE_URL}/${endpointMap[activeTab]}/`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Fetch failed');
      const result = await res.json();
      return Array.isArray(result) ? result : result.results ?? [];
    },
    enabled: !!token && !isValidating,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await authFetch(`${BASE_URL}/${endpointMap[activeTab]}/${id}/`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Delete failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      setDeleteTarget(null);
      setIsDeleting(false);
    },
    onError: () => { setIsDeleting(false); setDeleteTarget(null); },
  });

  const requestDelete = useCallback((id, label) => {
    setDeleteTarget({ id, label, tab: activeTab });
  }, [activeTab]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    deleteMutation.mutate(deleteTarget.id);
  }, [deleteTarget, deleteMutation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const fd = new FormData();
    try {
      if (formData.title) fd.append('title', formData.title);
      if (formData.image_file) {
        const compressed = await imageCompression(formData.image_file, {
          maxSizeMB: 0.6, maxWidthOrHeight: 1600, useWebWorker: true,
        });
        fd.append('image', compressed, 'upload.jpg');
      }
      if (activeTab === 'Blogs' && formData.excerpt) fd.append('excerpt', formData.excerpt);
      if (activeTab === 'Films' && formData.video_id) {
        fd.append('video_id', formData.video_id);
        fd.append('type', 'Cinematic Film');
      }
      if (activeTab === 'Gallery' && formData.category) fd.append('category', formData.category);

      const res = await authFetch(`${BASE_URL}/${endpointMap[activeTab]}/`, { method: 'POST', body: fd });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({});
        queryClient.invalidateQueries({ queryKey: [activeTab] });
      } else {
        const err = await res.json();
        alert(`Error: ${JSON.stringify(err)}`);
      }
    } catch (error) {
      alert('Network error or image compression failed.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isValidating) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a09]">
        <Loader2 className="animate-spin" size={28} style={{ color: GOLD }} />
        <p className="text-[#5a5048] text-[10px] uppercase tracking-widest mt-4">Verifying Session...</p>
      </div>
    );
  }

  if (!token) {
    return <AdminLogin setToken={(access, refresh) => { saveTokens(access, refresh); setToken(access); }} />;
  }

  const tabs = [
    { id: 'Inquiries', icon: Users,         label: 'Inquiries' },
    { id: 'Gallery',   icon: ImageIcon,     label: 'Gallery'   },
    { id: 'Films',     icon: Film,          label: 'Films'     },
    { id: 'Blogs',     icon: Book,          label: 'Blogs'     },
    { id: 'Feedbacks', icon: MessageSquare, label: 'Feedback'  },
  ];

  return (
    <div style={{ ...sansFont, background: PAGE_BG }} className="flex h-screen text-[#c8bfb4] overflow-hidden">

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            target={deleteTarget}
            onConfirm={confirmDelete}
            onCancel={() => !isDeleting && setDeleteTarget(null)}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{ width: 260, background: '#0e0e0d', borderRight: `1px solid ${BORDER}` }}
      >
        <div className="px-8 pt-10 pb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: GOLD2, border: `1px solid ${GOLD}33` }}>
              <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />
            </div>
            <span style={{ ...serifFont, color: '#f0e6d6', fontSize: 18, letterSpacing: '0.05em' }}>Studio</span>
          </div>
          <p style={{ fontSize: 10, color: '#504840', letterSpacing: '0.2em' }} className="uppercase mt-1 ml-9">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={{
                background: activeTab === id ? GOLD2 : 'transparent',
                border: `1px solid ${activeTab === id ? GOLD + '40' : 'transparent'}`,
              }}
            >
              <Icon size={15} style={{ color: activeTab === id ? GOLD : '#5a5048' }} />
              <span style={{ fontSize: 13, color: activeTab === id ? '#f0e6d6' : '#6a5f55' }}>{label}</span>
              {activeTab === id && <ChevronRight size={12} style={{ color: GOLD, marginLeft: 'auto' }} />}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile Slide-in Drawer ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[110] flex flex-col lg:hidden"
              style={{ width: 280, background: '#0e0e0d', borderRight: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between px-6 pt-8 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: GOLD2, border: `1px solid ${GOLD}33` }}>
                    <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />
                  </div>
                  <span style={{ ...serifFont, color: '#f0e6d6', fontSize: 18 }}>Studio</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-white/30 hover:text-white/70 transition-colors p-1">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {tabs.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all"
                    style={{
                      background: activeTab === id ? GOLD2 : 'transparent',
                      border: `1px solid ${activeTab === id ? GOLD + '40' : 'transparent'}`,
                    }}
                  >
                    <Icon size={16} style={{ color: activeTab === id ? GOLD : '#5a5048' }} />
                    <span style={{ fontSize: 14, color: activeTab === id ? '#f0e6d6' : '#6a5f55' }}>{label}</span>
                  </button>
                ))}
              </nav>

              <div className="px-4 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex-shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}`, background: '#0c0c0b' }}
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Hamburger — visible on mobile only */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsSidebarOpen(o => !o)}
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-white/40" />
              <span className="w-5 h-px bg-white/40" />
              <span className="w-4 h-px bg-white/40" />
            </button>
            <div className="min-w-0">
              <h2 className="truncate" style={{ ...serifFont, fontSize: 20, color: '#f0e6d6', lineHeight: 1.2 }}>{activeTab}</h2>
              {isFetching && <span className="text-[10px] text-[#c9a96e] animate-pulse">Updating…</span>}
            </div>
          </div>

          {activeTab !== 'Inquiries' && activeTab !== 'Feedbacks' && (
            <button
              onClick={() => { setFormData({}); setIsModalOpen(true); }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#c9a96e] text-black font-semibold hover:bg-[#d4b986] transition-colors text-xs sm:text-sm flex-shrink-0 ml-3"
            >
              <Plus size={13} />
              <span className="hidden sm:inline">Add {activeTab.slice(0, -1)}</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </header>

        {/* Content area — extra bottom padding on mobile for the bottom nav */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 pb-24 lg:pb-10">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <Loader2 className="animate-spin" size={28} style={{ color: GOLD }} />
              <p className="uppercase tracking-widest text-[10px] mt-4">Loading Data...</p>
            </div>
          ) : records.length === 0 ? (
            <EmptyState tab={activeTab} onAdd={() => setIsModalOpen(true)} />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {activeTab === 'Inquiries' && <InquiryTable  data={records} onDelete={requestDelete} />}
              {activeTab === 'Feedbacks' && <FeedbackTable data={records} onDelete={requestDelete} />}
              {activeTab === 'Gallery'   && <GalleryGrid   data={records} onDelete={requestDelete} />}
              {activeTab === 'Films'     && <FilmsGrid     data={records} onDelete={requestDelete} />}
              {activeTab === 'Blogs'     && <BlogsGrid     data={records} onDelete={requestDelete} />}
            </motion.div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav tabs={tabs} activeTab={activeTab} onSelect={setActiveTab} />

      {/* ── Add Entry Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full sm:max-w-[460px] rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
            >
              {/* Drag handle */}
              <div className="flex justify-center mb-4 sm:hidden">
                <div className="w-10 h-1 rounded-full bg-white/10" />
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 style={{ ...serifFont, fontSize: 20, color: '#f0e6d6' }}>New {activeTab.slice(0, -1)}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Title">
                  <StyledInput
                    required placeholder="Enter here..."
                    onChange={(val) => setFormData(p => ({ ...p, title: val }))}
                  />
                </FormField>

                {activeTab === 'Gallery' && (
                  <FormField label="Category">
                    <select
                      required defaultValue=""
                      className="w-full rounded-xl px-4 py-3 bg-[#0d0d0c] border border-white/10 text-[#e8ddd0] outline-none text-base"
                      onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                    >
                      <option value="" disabled>Select category</option>
                      {['Wedding', 'Pre-Wedding', 'Maternity', 'Newborn', 'Toddler'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </FormField>
                )}

                {activeTab === 'Films' && (
                  <FormField label="YouTube Video ID">
                    <StyledInput
                      required placeholder="e.g. dQw4w9WgXcQ"
                      onChange={(val) => setFormData(p => ({ ...p, video_id: val, type: 'Cinematic Film' }))}
                    />
                  </FormField>
                )}

                {activeTab === 'Blogs' && (
                  <FormField label="Excerpt">
                    <textarea
                      required
                      className="w-full rounded-xl px-4 py-3 bg-[#0d0d0c] border border-white/10 text-[#e8ddd0] h-24 resize-none outline-none focus:border-[#c9a96e40] transition-colors text-base"
                      onChange={(e) => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                    />
                  </FormField>
                )}

                {(activeTab === 'Gallery' || activeTab === 'Blogs') && (
                  <FormField label="Upload Image">
                    <label className="block border-2 border-dashed border-white/10 p-6 text-center rounded-xl cursor-pointer hover:border-[#c9a96e40] transition-colors active:scale-[0.98]">
                      <input type="file" accept="image/*" required className="hidden"
                        onChange={(e) => setFormData(p => ({ ...p, image_file: e.target.files[0] }))} />
                      <UploadCloud className="mx-auto mb-2 text-white/20" size={24} />
                      <p className="text-xs text-white/40">
                        {formData.image_file ? formData.image_file.name : 'Tap to select image'}
                      </p>
                    </label>
                  </FormField>
                )}

                <button
                  type="submit" disabled={isSaving}
                  className="w-full py-4 rounded-xl bg-[#c9a96e] text-black font-bold flex items-center justify-center gap-2 hover:bg-[#d4b986] transition-colors disabled:opacity-60 text-sm"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Publish Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const FormField = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-widest text-[#6a5f55] font-bold">{label}</label>
    {children}
  </div>
);

const StyledInput = ({ onChange, ...props }) => (
  <input
    {...props}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-xl px-4 py-3 bg-[#0d0d0c] border border-white/10 text-[#e8ddd0] outline-none focus:border-[#c9a96e40] transition-colors text-base"
  />
);

const GalleryGrid = ({ data, onDelete }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
    {data.map((img) => (
      <div key={img.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#111110] border border-white/5">
        <img src={img.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={img.title} />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 sm:p-4 transition-opacity">
          <span className="text-[9px] sm:text-[10px] text-[#c9a96e] uppercase tracking-widest">{img.category}</span>
          <p className="text-white font-medium text-xs sm:text-sm truncate">{img.title}</p>
          <button
            onClick={() => onDelete(img.id, img.title)}
            className="mt-2 text-red-400 text-xs flex items-center gap-1 hover:text-red-300 transition-colors"
          >
            <Trash2 size={11} /> Delete
          </button>
        </div>
        {/* Always-visible delete on touch devices */}
        <button
          onClick={() => onDelete(img.id, img.title)}
          className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-red-400 sm:hidden"
          aria-label="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    ))}
  </div>
);

const FilmsGrid = ({ data, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {data.map((film) => (
      <div key={film.id} className="group">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/5">
          <img
            src={`https://img.youtube.com/vi/${film.video_id}/maxresdefault.jpg`}
            className="w-full h-full object-cover opacity-60" alt={film.title}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#c9a96e20] flex items-center justify-center border border-[#c9a96e40]">
              <Film className="text-[#c9a96e]" size={20} />
            </div>
          </div>
          <button
            onClick={() => onDelete(film.id, film.title)}
            className="absolute top-3 right-3 p-2 bg-black/60 rounded-lg text-red-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-3">
          <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-base sm:text-lg text-white/90 truncate">
            {film.title}
          </h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">{film.type}</p>
        </div>
      </div>
    ))}
  </div>
);

// Scrollable table wrapper for mobile
const ScrollTable = ({ children }) => (
  <div className="rounded-xl border border-white/5 overflow-hidden">
    <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
      {children}
    </div>
  </div>
);

const FeedbackTable = ({ data, onDelete }) => (
  <ScrollTable>
    <table className="w-full text-left min-w-[540px]">
      <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-[#5a5048]">
        <tr>
          <th className="p-3 sm:p-4">Name</th>
          <th className="p-3 sm:p-4">Feedback</th>
          <th className="p-3 sm:p-4 hidden sm:table-cell">Date</th>
          <th className="p-3 sm:p-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((item) => (
          <tr key={item.id} className="text-sm hover:bg-white/[0.02] transition-colors group">
            <td className="p-3 sm:p-4 text-[#f0e6d6] font-medium whitespace-nowrap text-xs sm:text-sm">{item.name}</td>
            <td className="p-3 sm:p-4 text-[#8a7f75] text-xs max-w-[160px] sm:max-w-xs line-clamp-2">{item.feedback_text}</td>
            <td className="p-3 sm:p-4 text-xs text-[#5a5048] whitespace-nowrap hidden sm:table-cell">
              {new Date(item.submitted_at).toLocaleDateString()}
            </td>
            <td className="p-3 sm:p-4 text-right">
              <button
                onClick={() => onDelete(item.id, item.name)}
                className="p-1.5 sm:p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={14} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </ScrollTable>
);

const InquiryTable = ({ data, onDelete }) => (
  <ScrollTable>
    <table className="w-full text-left min-w-[540px]">
      <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-[#5a5048]">
        <tr>
          <th className="p-3 sm:p-4">Client</th>
          <th className="p-3 sm:p-4">Contact</th>
          <th className="p-3 sm:p-4 hidden md:table-cell">Type</th>
          <th className="p-3 sm:p-4 hidden sm:table-cell">Date</th>
          <th className="p-3 sm:p-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((item) => (
          <tr key={item.id} className="text-sm hover:bg-white/[0.02] transition-colors group">
            <td className="p-3 sm:p-4 text-[#f0e6d6] font-medium text-xs sm:text-sm whitespace-nowrap">{item.full_name}</td>
            <td className="p-3 sm:p-4">
              <div className="flex flex-col text-xs text-[#8a7f75]">
                <span className="truncate max-w-[120px] sm:max-w-none">{item.email}</span>
                <span>{item.mobile_number}</span>
              </div>
            </td>
            <td className="p-3 sm:p-4 hidden md:table-cell">
              <span className="px-2 sm:px-3 py-1 bg-[#c9a96e10] text-[#c9a96e] border border-[#c9a96e20] rounded-full text-[10px] whitespace-nowrap">
                {item.inquiry_type}
              </span>
            </td>
            <td className="p-3 sm:p-4 text-xs text-[#5a5048] hidden sm:table-cell whitespace-nowrap">
              {new Date(item.submitted_at).toLocaleDateString()}
            </td>
            <td className="p-3 sm:p-4 text-right">
              <button
                onClick={() => onDelete(item.id, item.full_name)}
                className="p-1.5 sm:p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={14} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </ScrollTable>
);

const EmptyState = ({ tab, onAdd }) => (
  <div className="py-16 sm:py-20 text-center flex flex-col items-center">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
      <Plus className="text-white/20" size={22} />
    </div>
    <p className="text-[#5a5048] italic mb-4 text-sm">No records found in {tab}.</p>
    {tab !== 'Inquiries' && tab !== 'Feedbacks' && (
      <button onClick={onAdd} className="text-[#c9a96e] text-xs uppercase tracking-widest font-bold hover:underline">
        + Add your first entry
      </button>
    )}
  </div>
);

const BlogsGrid = ({ data, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {data.map((blog) => (
      <div key={blog.id} className="group relative bg-[#111110] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
        <div className="aspect-video w-full relative overflow-hidden">
          <img
            src={blog.image}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            alt={blog.title}
          />
          <button
            onClick={() => onDelete(blog.id, blog.title)}
            className="absolute top-3 right-3 p-2 bg-red-500/20 hover:bg-red-500 text-white rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-lg sm:text-xl text-[#f0e6d6] mb-2 leading-snug">
            {blog.title}
          </h3>
          <p className="text-xs text-[#6a5f55] line-clamp-2 leading-relaxed">{blog.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-[10px] text-[#3d3530] uppercase tracking-widest font-bold">
            <span>{new Date(blog.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="text-[#c9a96e]">Live</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AdminDashboard;