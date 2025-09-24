const GOOGLE_AI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const GOOGLE_AI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Debug: Log Google AI API key status
console.log('🤖 Google AI API Key:', GOOGLE_AI_API_KEY ? '✅ Set' : '❌ Missing');
if (GOOGLE_AI_API_KEY) {
  console.log('🤖 Google AI API Key (first 10 chars):', GOOGLE_AI_API_KEY.substring(0, 10) + '...');
}

export const googleAiApi = {
  // Generate AI summary from all reviews using Google AI (Gemini)
  generateComprehensiveSummary: async (tmdbReviews, userReviews, movieTitle) => {
    // Check if we have a valid API key
    if (!GOOGLE_AI_API_KEY || GOOGLE_AI_API_KEY === 'your_google_ai_api_key_here') {
      return 'Google AI API key not configured. Please add your API key to the .env file.';
    }

    // Check if we have reviews to summarize
    if ((!tmdbReviews || tmdbReviews.length === 0) && (!userReviews || userReviews.length === 0)) {
      return 'No reviews available to summarize.';
    }

    try {
      // Prepare TMDB reviews
      const tmdbReviewsText = tmdbReviews && tmdbReviews.length > 0 
        ? `\n\nTMDB Reviews:\n${tmdbReviews.map(review => `- ${review.content || review.author_details?.content || 'No content available'}`).join('\n')}`
        : '';

      // Prepare user reviews
      const userReviewsText = userReviews && userReviews.length > 0
        ? `\n\nUser Reviews:\n${userReviews.map(review => `- ${review.content}`).join('\n')}`
        : '';

      const allReviewsText = `Movie: ${movieTitle}${tmdbReviewsText}${userReviewsText}`;

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Try different model names in order of preference
      const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
      let lastError = null;

      for (const model of models) {
        try {
          console.log(`🔄 Trying Google AI model: ${model}`);
          const response = await fetch(`${GOOGLE_AI_BASE_URL}/models/${model}:generateContent?key=${GOOGLE_AI_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Please provide a comprehensive single sentence summary of all reviews for the movie "${movieTitle}". Include insights about overall sentiment, common themes, key strengths and weaknesses, and comparison between professional and user opinions.\n\nHere are all the reviews:\n${allReviewsText}`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300
              }
            }),
            signal: controller.signal
          });

          if (response.ok) {
            clearTimeout(timeoutId);
            const data = await response.json();
            const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate summary at this time.';
            console.log(`✅ Google AI model ${model} succeeded`);
            return result;
          } else if (response.status === 404) {
            console.log(`❌ Google AI model ${model} not found, trying next...`);
            lastError = new Error(`Model ${model} not found`);
            continue;
          } else {
            throw new Error(`Google AI API error: ${response.status}`);
          }
        } catch (error) {
          console.log(`❌ Google AI model ${model} failed:`, error.message);
          lastError = error;
          continue;
        }
      }

      // If all models failed, throw the last error
      throw lastError || new Error('All Google AI models failed');

    } catch (error) {
      console.error('Error generating Google AI summary:', error);
      
      if (error.name === 'AbortError') {
        return 'Summary generation timed out. Please try again later.';
      } else if (error.message.includes('401')) {
        return 'Google AI API key is invalid. Please check your configuration.';
      } else if (error.message.includes('429')) {
        return 'Google AI API rate limit exceeded. Please try again later.';
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        return 'Google AI API model not found. Please check the model name.';
      } else {
        return 'Unable to generate summary at this time. Please check your internet connection and try again.';
      }
    }
  }
};