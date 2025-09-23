import { useState, useEffect } from 'react';
import { openaiApi } from '../services/openaiApi';
import { Sparkles, Loader2 } from 'lucide-react';

const SummaryBox = ({ reviews, movieTitle }) => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      generateSummary();
    }
  }, [reviews, movieTitle]);

  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      const aiSummary = await openaiApi.generateSummary(reviews, movieTitle);
      setSummary(aiSummary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Unable to generate AI summary at this time.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">AI-Generated Summary</h3>
      </div>
      
      {isGenerating ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating AI summary...</span>
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">
          {summary || 'Generating summary...'}
        </p>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default SummaryBox;
