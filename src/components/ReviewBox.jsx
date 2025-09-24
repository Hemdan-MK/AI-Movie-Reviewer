import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Send, Loader2, AlertCircle } from 'lucide-react';

const ReviewBox = ({ movieId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);
  const [checkingReview, setCheckingReview] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkExistingReview = async () => {
      if (!currentUser) {
        setCheckingReview(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'reviews'),
          where('userId', '==', currentUser.uid),
          where('movieId', '==', movieId)
        );
        const querySnapshot = await getDocs(q);
        setHasExistingReview(!querySnapshot.empty);
      } catch (error) {
        console.error('Error checking existing review:', error);
      } finally {
        setCheckingReview(false);
      }
    };

    checkExistingReview();
  }, [currentUser, movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !currentUser || hasExistingReview) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName,
        movieId: movieId,
        content: reviewText.trim(),
        createdAt: serverTimestamp(),
        upvotes: 0,
        downvotes: 0
      });
      
      setReviewText('');
      setHasExistingReview(true);
      onReviewAdded && onReviewAdded();
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-gray-600">Please log in to write a review.</p>
      </div>
    );
  }

  if (checkingReview) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600 mr-2" />
          <span className="text-gray-600">Checking for existing review...</span>
        </div>
      </div>
    );
  }

  if (hasExistingReview) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <p className="text-blue-800 font-medium">You have already reviewed this movie.</p>
        </div>
        <p className="text-blue-600 text-sm mt-1">Each user can only write one review per movie.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Share your thoughts about this movie..."
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        rows="4"
        required
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={isSubmitting || !reviewText.trim()}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
        </button>
      </div>
    </form>
  );
};

export default ReviewBox;
