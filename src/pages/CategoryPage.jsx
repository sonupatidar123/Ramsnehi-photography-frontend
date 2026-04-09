import React from 'react';
import { useParams, Link } from 'react-router-dom';
import GallerySection from '../components/Gallerysection';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams();
  
  // Format the ID back to a readable title (e.g., pre-wedding -> Pre-Wedding)
  const displayTitle = categoryName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
      
      {/* We pass a special prop 'fullPage={true}' so the button disappears */}
      <GallerySection 
        title={`${displayTitle} Gallery`} 
        category={displayTitle} 
        fullPage={true} 
      />
    </div>
  );
};

export default CategoryPage;