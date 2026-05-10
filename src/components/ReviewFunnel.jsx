import React, { useState } from 'react';
import { Star, Copy, MapPin, Phone, Check } from 'lucide-react';
import API_BASE_URL from '../config';

const BRAND_NAME = "Ramsnehi Photography";
const PHONE_NUMBER = "+91 96441 67702";
const SUGGESTED_REVIEWS = [
  "I had an amazing experience with Ramsnehi Photography Mandsaur. Their wedding photography was शानदार and every moment was captured beautifully. Highly recommended for wedding and pre-wedding shoots in Mandsaur.",
  "Best photography service in Mandsaur! Ramsnehi Photography team is very professional and creative. They covered our pre wedding shoot and results were mind blowing.",
"अगर आप best wedding photographer ढूंढ रहे हो तो Ramsnehi Photography perfect choice है। Indore और Ujjain में भी इनकी service top class है।",
"Ramsnehi Photography provided excellent birthday and party shoot services. Quality, editing and delivery time sab perfect tha.",
"Very professional team! They handled our event in Bhopal and captured every detail perfectly. Best photography service provider.",
"Highly satisfied with their cinematic video and drone shoot. Ramsnehi Photography is one of the best in Mandsaur and nearby areas like Neemuch and Ratlam.",
"Amazing work! Their wedding album design and photo editing is next level. Highly recommend for all photography services.",
"Ramsnehi Photography team is very friendly and skilled. They covered our engagement and pre wedding shoot in Indore beautifully.",
"Best photographer in Mandsaur! Affordable price and premium quality work. Must try for wedding, party and event shoots.",
"Excellent service across multiple locations like Dewas, Dhar and Pratapgarh. Ramsnehi Photography is truly reliable for all types of shoots."
];

const ReviewFunnel = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [step, setStep] = useState('initial'); 
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [feedback, setFeedback] = useState({ name: '', text: '' });
  const [status, setStatus] = useState('idle');

  const GOOGLE_MAPS_LINK = "https://g.page/r/Cf66kpohf7NNEBM/review";
  
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
        <p>© 2024 RAMSNEHI PHOTOGRAPHY BY RAHUL PATIDAR</p>
      </footer>
    </div>
  );
};

export default ReviewFunnel;