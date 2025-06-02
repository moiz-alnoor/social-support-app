/**
 * OpenAI API configuration constants and helpers.
 * 
 * OPENAI_API_URL: Endpoint for chat completions.
 * OPENAI_MODEL: Model used for completions.
 * ROLE: Default role for chat messages.
 * getOpenAIHeaders: Returns headers for OpenAI API requests.
 */

export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
export const OPENAI_MODEL = "gpt-3.5-turbo";
export const ROLE = "user";

/**
 * Returns headers for OpenAI API requests.
 * @param {string} key - OpenAI API key
 * @returns {Object} Headers object
 */
export const getOpenAIHeaders = (key) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${key}`,
});
