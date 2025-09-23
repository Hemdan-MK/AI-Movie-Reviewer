const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

export const openaiApi = {
  // Generate AI summary from reviews
  generateSummary: async (reviews, movieTitle) => {
    try {
      const prompt = `Please provide a concise 3-5 sentence summary of user reviews for the movie "${movieTitle}". Focus on the overall sentiment, common themes, and key points mentioned by reviewers. Here are the reviews:\n\n${reviews.map(review => `- ${review.content}`).join('\n')}`;

      const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that summarizes movie reviews in a concise and engaging way.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating AI summary:', error);
      return 'Unable to generate summary at this time.';
    }
  }
};
