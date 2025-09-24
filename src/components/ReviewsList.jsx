import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { ThumbsUp, ThumbsDown, Calendar, User, Star, ChevronDown, ChevronUp } from 'lucide-react';

const ReviewsList = ({ movieId, tmdbReviews }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('recent'); // 'recent' or 'mostVoted'
  const [votedReviews, setVotedReviews] = useState(new Set());
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserReviews = () => {
      const q = query(
        collection(db, 'reviews'),
        where('movieId', '==', movieId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reviewsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserReviews(reviewsData);
        setLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribe = loadUserReviews();
    return () => unsubscribe();
  }, [movieId]);

  const handleVote = async (reviewId, voteType) => {
    if (!currentUser) {
      alert('Please login to vote on reviews');
      return;
    }

    if (votedReviews.has(reviewId)) {
      alert('You have already voted on this review');
      return;
    }

    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        [voteType === 'upvote' ? 'upvotes' : 'downvotes']: increment(1)
      });
      
      setVotedReviews(prev => new Set([...prev, reviewId]));
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again.');
    }
  };

  const getAllReviews = () => {
    const allReviews = [];
    
    // Add TMDB reviews
    if (tmdbReviews && tmdbReviews.length > 0) {

      
    
      tmdbReviews.forEach((review, index) => {
        allReviews.push({
          id: `tmdb-${index}`,
          content: review.content || review.author_details?.content || 'No content available',
          author: review.author || review.author_details?.username || 'TMDB User',
          source: 'TMDB',
          createdAt: review.created_at ? new Date(review.created_at) : new Date(),
          upvotes: 0,
          downvotes: 0,
          isTmdb: true
        });
      });
    }
    
    // Add user reviews
    userReviews.forEach(review => {
      allReviews.push({
        ...review,
        source: 'User',
        isTmdb: false
      });
    });
    
    return allReviews;
  };

  const sortReviews = (reviews) => {
    switch (filter) {
      case 'recent':
        return reviews.sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : a.createdAt?.getTime() || 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : b.createdAt?.getTime() || 0;
          return bTime - aTime; // Most recent first
        });
      case 'mostVoted':
        return reviews.sort((a, b) => {
          const aScore = (a.upvotes || 0) - (a.downvotes || 0);
          const bScore = (b.upvotes || 0) - (b.downvotes || 0);
          return bScore - aScore; // Highest score first
        });
      default:
        return reviews;
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const d = date.toDate ? date.toDate() : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVoteScore = (review) => {
    const upvotes = review.upvotes || 0;
    const downvotes = review.downvotes || 0;
    return upvotes - downvotes;
  };

  const toggleExpanded = (reviewId) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const shouldTruncate = (content) => {
    return content.length > 300;
  };

  const getTruncatedContent = (content, isExpanded) => {
    if (!shouldTruncate(content) || isExpanded) {
      return content;
    }
    return content.substring(0, 300) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const allReviews = getAllReviews();
  const sortedReviews = sortReviews([...allReviews]);

  if (allReviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No reviews available for this movie yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setFilter('recent')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            filter === 'recent'
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Most Recent
        </button>
        <button
          onClick={() => setFilter('mostVoted')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            filter === 'mostVoted'
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
          }`}
        >
          <ThumbsUp className="w-4 h-4 inline mr-2" />
          Most Voted
        </button>
      </div>

      {/* Reviews Count */}
      <div className="text-sm text-gray-300 mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
        Showing <span className="font-semibold text-white">{sortedReviews.length}</span> review{sortedReviews.length !== 1 ? 's' : ''}
        {tmdbReviews && tmdbReviews.length > 0 && (
          <span className="text-gray-400"> ({tmdbReviews.length} professional, {userReviews.length} user)</span>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className={`p-6 rounded-xl border backdrop-blur-sm ${
              review.isTmdb 
                ? 'bg-blue-500/10 border-blue-400/30' 
                : 'bg-white/10 border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  review.isTmdb ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/20 border border-white/30'
                }`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.isTmdb 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                        : 'bg-white/20 text-gray-300 border border-white/30'
                    }`}>
                      {review.source}
                    </span>
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              {/* Vote Score */}
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${
                  getVoteScore(review) > 0 ? 'text-green-600' : 
                  getVoteScore(review) < 0 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {getVoteScore(review) > 0 ? '+' : ''}{getVoteScore(review)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {getTruncatedContent(review.content, expandedReviews.has(review.id))}
              </p>
              {shouldTruncate(review.content) && (
                <button
                  onClick={() => toggleExpanded(review.id)}
                  className="mt-2 text-orange-400 hover:text-orange-300 font-medium text-sm flex items-center space-x-1 transition-colors"
                >
                  {expandedReviews.has(review.id) ? (
                    <>
                      <span>Read Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Voting Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleVote(review.id, 'upvote')}
                disabled={!currentUser || votedReviews.has(review.id) || review.isTmdb}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  !currentUser || votedReviews.has(review.id) || review.isTmdb
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.upvotes || 0}</span>
              </button>
              
              <button
                onClick={() => handleVote(review.id, 'downvote')}
                disabled={!currentUser || votedReviews.has(review.id) || review.isTmdb}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  !currentUser || votedReviews.has(review.id) || review.isTmdb
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{review.downvotes || 0}</span>
              </button>

              {!currentUser && (
                <span className="text-xs text-gray-400">Login to vote</span>
              )}
              
              {review.isTmdb && (
                <span className="text-xs text-gray-400">Professional reviews cannot be voted</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
