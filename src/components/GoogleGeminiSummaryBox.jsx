import { useState, useEffect, useRef } from 'react';
import { googleAiApi } from '../services/googleAiApi';
import { Globe, Loader2 } from 'lucide-react';

const GoogleGeminiSummaryBox = ({ tmdbReviews, userReviews, movieTitle }) => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only generate summary if we have reviews (no login required)
    if ((tmdbReviews && tmdbReviews.length > 0) || (userReviews && userReviews.length > 0)) {
      // Debounce the API call to prevent too many requests
      timeoutRef.current = setTimeout(() => {
        generateSummary();
      }, 2000); // Wait 2 seconds after the last change
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tmdbReviews, userReviews, movieTitle]);

  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      const aiSummary = await googleAiApi.generateComprehensiveSummary(tmdbReviews, userReviews, movieTitle);
      setSummary(aiSummary);
    } catch (error) {
      console.error('Error generating Google Gemini summary:', error);
      setSummary('Unable to generate AI summary at this time.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Don't show summary if no reviews
  if ((!tmdbReviews || tmdbReviews.length === 0) && (!userReviews || userReviews.length === 0)) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-semibold text-gray-800">AI Movie Summary</h3>
        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
          Google AI
        </span>
      </div>
      
      {isGenerating ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating AI summary...</span>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {summary || 'Generating AI summary...'}
          </p>
          
          <div className="text-sm text-gray-500 space-y-1">
            {tmdbReviews && tmdbReviews.length > 0 && (
              <div>📰 {tmdbReviews.length} professional review{tmdbReviews.length !== 1 ? 's' : ''}</div>
            )}
            {userReviews && userReviews.length > 0 && (
              <div>👥 {userReviews.length} user review{userReviews.length !== 1 ? 's' : ''}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleGeminiSummaryBox;
