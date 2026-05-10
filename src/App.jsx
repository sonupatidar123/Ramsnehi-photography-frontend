import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// =============== LAYOUT COMPONENTS (Always loaded) ===============
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/Socialsidebar';

// =============== HOME PAGE COMPONENTS (Loaded immediately for above-the-fold) ===============
import Hero from './components/Hero';
import GallerySection from './components/Gallerysection';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';
import ParallaxHeader from './components/ParallaxHeader';
import StudioStory from './components/Studiostory';
import ContactPage from './components/Contactpage';

// =============== LAZY LOADED COMPONENTS (Only when needed) ===============
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const DailyJournal = lazy(() => import('./components/DailyJournal'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ReviewFunnel = lazy(() => import('./components/ReviewFunnel'));

// Loading component
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner'));

// Lightweight fallback for suspense boundaries
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin w-12 h-12 border-2 border-red-500 border-t-white rounded-full" />
  </div>
);

const AdminLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0a0a09]">
    <div className="animate-spin w-12 h-12 border-2 border-red-500 border-t-[#c8bfb4] rounded-full" />
  </div>
);

import './App.css';

// =============== STATIC IMAGES ===============
import wedding1 from './assets/gallery/wedding-1.jpg';
import wedding2 from './assets/gallery/wedding-2.jpg';
import wedding3 from './assets/gallery/wedding-3.jpg';
import wedding4 from './assets/gallery/wedding-4.jpg';

import prewedding1 from './assets/gallery/prewedding-1.jpg';
import prewedding2 from './assets/gallery/prewedding-2.jpg';
import prewedding3 from './assets/gallery/prewedding-3.jpg';
import prewedding4 from './assets/gallery/prewedding-4.jpg';

import Maternity1 from './assets/gallery/maternity-1.jpg';
import Maternity2 from './assets/gallery/maternity-2.jpg';
import Maternity3 from './assets/gallery/maternity-3.jpg';
import Maternity4 from './assets/gallery/maternity-4.jpg';

// Static Items Arrays
const preWeddingItems = [
  {
    id: 'static-prewedding-1',
    title: 'With you everything feels right✨',
    category: 'Pre-Wedding',
    image: prewedding1
  },
  {
    id: 'static-prewedding-2',
    title: 'A Royal Celebration of Love',
    category: 'Pre-Wedding',
    image: prewedding2
  },
  {
    id: 'static-prewedding-3',
    title: 'Pre-Wedding Story',
    category: 'Pre-Wedding',
    image: prewedding3
  },
  {
    id: 'static-prewedding-4',
    title: 'Pre-Wedding Moments',
    category: 'Pre-Wedding',
    image: prewedding4
  }
];

const weddingItems = [
  {
    id: 'static-wedding-1',
    title: 'A garland of love , a promise for life',
    category: 'Wedding',
    image: wedding1
  },
  {
    id: 'static-wedding-2',
    title: 'A garland of love , a promise for life ❤️',
    category: 'Wedding',
    image: wedding2
  },
  {
    id: 'static-wedding-3',
    title: 'Wedding Moments',
    category: 'Wedding',
    image: wedding3
  },
  {
    id: 'static-wedding-4',
    title: 'Wedding Celebration',
    category: 'Wedding',
    image: wedding4
  }
];

const maternityItems = [
  {
    id: 'static-maternity-1',
    title: 'Cute little girl😊',
    category: 'Maternity & Kids',
    image: Maternity1
  },
  {
    id: 'static-maternity-2',
    title: 'Precious Moments',
    category: 'Maternity & Kids',
    image: Maternity2
  },
  {
    id: 'static-maternity-3',
    title: 'Baby Moments',
    category: 'Maternity & Kids',
    image: Maternity3
  },
  {
    id: 'static-maternity-4',
    title: 'Family Moments',
    category: 'Maternity & Kids',
    image: Maternity4
  }
];

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Scroll to Top
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}


// Home Page
function HomePage() {
  return (
    <main>
      <Hero />
      <SocialSidebar />
      <StudioStory />

      <div id="pre-wedding">
        <ParallaxHeader
          title="Pre-Wedding"
          subTitle="The Beginning of Forever"
          bgImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
        />
        <GallerySection title="Latest Pre-Weddings" category="Pre-Wedding" staticItems={preWeddingItems} />
      </div>

      <div id="wedding">
        <ParallaxHeader
          title="Wedding"
          subTitle="A Royal Celebration of Love"
          bgImage="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2000"
        />
        <GallerySection title="Wedding Stories" category="Wedding" staticItems={weddingItems} lightBg />
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
          categories={['Newborn', 'Toddler', 'Maternity', 'Maternity & Kids']}
          staticItems={maternityItems}
        />
      </section>

      <div id="testimonials">
        <Testimonials />
      </div>

      <ContactPage />
    </main>
  );
}

// App Content Wrapper
function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/ramsnehi_admin');
  const isReviewPage = location.pathname.startsWith('/review');
  const hideNavAndFooter = isAdminPage || isReviewPage;

  return (
    <div className={`font-sans min-h-screen scroll-smooth ${isAdminPage ? 'bg-[#0a0a09] text-[#c8bfb4]' : 'bg-white text-gray-900'}`}>

      {!hideNavAndFooter && <Navbar />}
     

      {/* Page Transitions with Lazy Loading */}
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            
            {/* Lazy loaded routes */}
            <Route 
              path="/portfolio/:categoryName" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <CategoryPage />
                </Suspense>
              } 
            />
            <Route 
              path="/gallery" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <DailyJournal />
                </Suspense>
              } 
            />
            <Route 
              path="/ramsnehi_admin" 
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminDashboard />
                </Suspense>
              } 
            />
            <Route 
              path="/review" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <ReviewFunnel />
                </Suspense>
              } 
            />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!hideNavAndFooter && (
        <>
          <Footer />

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-white shadow-xl w-12 h-12 rounded-full flex items-center justify-center z-40 border border-gray-100 hover:bg-black hover:text-white transition"
          >
            <ChevronLeft className="rotate-90" />
          </button>
        </>
      )}
    </div>
  );
}

// Main App
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}