import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChevronLeft } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GallerySection from './components/Gallerysection';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ParallaxHeader from './components/ParallaxHeader';
import StudioStory from './components/Studiostory';
import SocialSidebar from './components/Socialsidebar';
import ContactPage from './components/Contactpage';
import AdminDashboard from './components/AdminDashboard';

// Pages
import CategoryPage from './pages/CategoryPage';

import './App.css';

// 1. Initialize Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1,
    },
  },
});

// Scroll to top functionality on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// HomePage Component structure
function HomePage() {
  return (
    <main>
      <Hero />
      <SocialSidebar />
      <StudioStory id="about" /> 

      <div id="pre-wedding">
        <ParallaxHeader
          title="Pre-Wedding"
          subTitle="The Beginning of Forever"
          bgImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
        />
        <GallerySection title="Latest Pre-Weddings" category="Pre-Wedding" />
      </div>

      <div id="wedding">
        <ParallaxHeader
          title="Wedding"
          subTitle="A Royal Celebration of Love"
          bgImage="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2000"
        />
        <GallerySection title="Wedding Stories" category="Wedding" lightBg={true} />
      </div>

      <div id="films">
        <ParallaxHeader
          title="Films"
          subTitle="Cinematic Visual Stories"
          bgImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000"
        />
        <VideoSection />
      </div>

      <section id="maternity">
        <ParallaxHeader
          title="Maternity & Kids"
          subTitle="Precious Little Moments"
          bgImage="https://images.unsplash.com/photo-1559599141-98bb67c45889?auto=format&fit=crop&q=80&w=2000"
        />
        <GallerySection
          title="Newborn · Toddler · Maternity"
          categories={['Newborn', 'Toddler', 'Maternity']}
        />
      </section>

      <div id="testimonials">
        <Testimonials />
      </div>

      <ContactPage />
    </main>
  );
}

// Main App Content Wrapper
function AppContent() {
  const location = useLocation();
  
  // Is logic se /ramsnehi_admin aur /ramsnehi_admin/ dono handle honge
  const isAdminPage = location.pathname.startsWith('/ramsnehi_admin');

  return (
    /* Dynamic background: Admin page par black, baaki jagah white */
    <div className={`font-sans min-h-screen selection:bg-gray-900 selection:text-white scroll-smooth ${isAdminPage ? 'bg-[#0a0a09] text-[#c8bfb4]' : 'bg-white text-gray-900'}`}>
      
      {/* Show Navbar only if NOT on Admin page */}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:categoryName" element={<CategoryPage />} />
        <Route path="/ramsnehi_admin" element={<AdminDashboard />} />
      </Routes>

      {/* Show Footer and Scroll Button only if NOT on Admin page */}
      {!isAdminPage && (
        <>
          <Footer />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-white shadow-xl w-12 h-12 rounded-full flex items-center justify-center z-40 group border border-gray-100"
          >
            <ChevronLeft className="rotate-90 text-gray-400 group-hover:text-gray-900" />
          </button>
        </>
      )}
    </div>
  );
}

// Final Export with Providers
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
      {/* Devtools: Only visible during local development in Vite */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}