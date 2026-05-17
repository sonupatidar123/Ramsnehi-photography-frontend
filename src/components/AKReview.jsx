import React, { useState } from 'react';
import { Star, Copy, MapPin, Phone, Check } from 'lucide-react';
import API_BASE_URL from '../config';

const BRAND_NAME = "A. K. Consultancies & Constructions";
const PHONE_NUMBER = "+91 9827354719";
const SUGGESTED_REVIEWS = [
  "Had a great experience with A. K. Consultancies & Constructions in Indore. Their architectural design ideas are modern, practical, and perfectly suited to client requirements. Highly recommended for residential and commercial projects.",
  "One of the best architecture firms in Indore. The team provided excellent building planning and 3D visualization services for our dream home. Very professional approach and timely support.",
  "A. K. Consultancies & Constructions did an amazing job on our interior design project. The team understood our vision and transformed the space beautifully. Excellent work quality and creativity.",
  "Very satisfied with their turnkey project services. From planning to execution, everything was handled smoothly and professionally. Great construction consultants in Indore.",
  "We hired A. K. Consultancies & Constructions for residential design and interior work. Their attention to detail and innovative ideas made a huge difference. Truly reliable professionals.",
  "Highly professional architectural designer in Indore. Their 3D visualization helped us understand the complete project before construction started. Great experience overall.",
  "Excellent architecture and construction consultancy services. The team is knowledgeable, responsive, and committed to quality work. Strongly recommended for modern home designs.",
  "A. K. Consultancies & Constructions provided outstanding commercial design services for our office. The final result was modern, functional, and visually impressive.",
  "Very impressed with their building planning and execution process. The project was completed on time with great finishing and quality materials.",
  "One of the most trusted construction consultants in Indore. Their team guided us properly throughout the entire project and delivered exactly what they promised.",
  "Amazing experience working with A. K. Consultancies & Constructions. Their interior design concepts are stylish, elegant, and budget-friendly. Highly satisfied with the outcome.",
  "Professional and creative architecture firm in Indore. They offered smart space planning solutions and excellent customer support during the entire project.",
  "The team is highly experienced in residential and commercial design. Their innovative architectural concepts and practical execution make them stand out.",
  "Great service and professional behavior. The 3D design visualization was realistic and helped us finalize every detail before starting construction.",
  "We approached A. K. Consultancies & Constructions for a turnkey residential project, and the experience was fantastic. Quality construction and timely delivery impressed us a lot.",
  "Best architectural and interior design services in Indore. The team listens carefully to client needs and delivers customized solutions with perfection.",
  "Their commercial project planning and interior execution exceeded our expectations. Very professional company with skilled architects and designers.",
  "A. K. Consultancies & Constructions is the perfect choice for anyone looking for modern architecture, interior design, and construction consultancy services in Indore.",
  "The team delivered excellent residential design services with beautiful elevation concepts and smart interior planning. Highly recommend their work.",
  "Truly professional construction consultants and architectural designers. They maintain quality, transparency, and customer satisfaction throughout the entire project journey."
];

const AKReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [step, setStep] = useState('initial'); 
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [feedback, setFeedback] = useState({ name: '', text: '' });
  const [status, setStatus] = useState('idle');

  const GOOGLE_MAPS_LINK = "https://g.page/r/Ca3l0aWZ3iyhEBM/review";
  
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      setStep('google');
    } else {
      setStep('internal');
    }
  };


  const openGoogleReview = () => {
    window.open(GOOGLE_MAPS_LINK, '_blank');
    setSelectedReviewIndex(null);
    setCopiedIndex(null);
  };

  const handleCopyAndNext = async (review, index) => {
    if (copiedIndex === index) {
      // Second click: redirect to Google
      openGoogleReview();
    } else {
      // First click: copy to clipboard
      try {
        await navigator.clipboard.writeText(review);
        setCopiedIndex(index);
      } catch (err) {
        console.error('Copy failed:', err);
        alert('Failed to copy. Please try again.');
      }
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/feedbacks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedback.name,
          feedback_text: feedback.text,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans">
      {/* Header */}
      <header className="w-full py-6 px-4 text-center bg-white border-b shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-gray-900">{BRAND_NAME}</h1>
        <div className="flex flex-col items-center mt-2 text-gray-500 text-sm">
          <p className="flex items-center gap-1"><MapPin size={14} /> Mandsaur • Indore • Jaipur</p>
          <p className="flex items-center gap-1 mt-1"><Phone size={14} /> {PHONE_NUMBER}</p>
        </div>
      </header>

      <main className="max-w-2xl w-full px-4 py-10">
        <div className="text-center mb-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
            alt="Google" 
            className="h-8 mb-2 mx-auto"
          />
          <h2 className="text-xl font-medium text-gray-700">How was your experience?</h2>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRatingClick(star)}
              className="transform transition-all hover:scale-110 active:scale-95"
            >
              <Star
                size={44}
                fill={(hover || rating) >= star ? "#FBBC05" : "none"}
                color={(hover || rating) >= star ? "#FBBC05" : "#D1D5DB"}
              />
            </button>
          ))}
        </div>

        {/* Step: Internal Feedback (Negative reviews) */}
        {step === 'internal' && (
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-50 animate-in fade-in slide-in-from-bottom-4">
            {status === 'success' ? (
              <div className="text-center py-6">
                <p className="text-green-600 font-semibold mb-2">Thank you for your feedback!</p>
                <p className="text-sm text-gray-500">We appreciate your honesty and will work on improving our services.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <input 
                  type="text" 
                  required
                  placeholder="Name" 
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-gray-900" 
                />
                <textarea 
                  rows="4" 
                  required
                  placeholder="Your Feedback" 
                  value={feedback.text}
                  onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-gray-900"
                ></textarea>
                {status === 'error' && <p className="text-red-500 text-xs">Failed to submit feedback.</p>}
                <button type="submit" disabled={status === 'loading'} className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold disabled:opacity-70">
                  {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT FEEDBACK'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Step: Google Review List (Positive reviews) */}
        {step === 'google' && (
          <div className="space-y-4 animate-in fade-in zoom-in-95">
            <div className="text-center mb-6">
              <p className="text-green-600 font-semibold text-lg">Thank you for the {rating} stars!</p>
              <p className="text-gray-500 text-sm">Select a review to copy and post on Google.</p>
            </div>

            <div className="space-y-3">
              {SUGGESTED_REVIEWS.map((review, index) => (
                <div key={index}>
                  {/* Review Card */}
                  <button
                    onClick={() => setSelectedReviewIndex(selectedReviewIndex === index ? null : index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedReviewIndex === index
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="text-gray-700 text-sm italic leading-relaxed">"{review}"</p>
                  </button>

                  {/* Copy & Next Button - Show only when selected */}
                  {selectedReviewIndex === index && (
                    <div className="mt-4 animate-in slide-in-from-bottom-2">
                      <button
                        onClick={() => handleCopyAndNext(review, index)}
                        className={`w-full py-3 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-white ${
                          copiedIndex === index
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {copiedIndex === index ? (
                          <><Check size={18} /> Copied! Click Next →</>
                        ) : (
                          <><Copy size={18} /> Copy & Next</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-auto w-full py-8 text-center text-gray-400 text-xs">
        <p>© A. K. CONSULTANCIES & CONSTRUCTIONS developed by sonu patidar </p>
      </footer>
    </div>
  );
};

export default AKReview;