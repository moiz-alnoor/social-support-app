import { useState } from "react";
import axios from "axios";
import { OPENAI_API_URL, OPENAI_MODEL, ROLE } from "../config/openaiConfig";
import { getOpenAIHeaders } from "../config/openaiConfig";

export const useOpenAIChat = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateResponse = async (userPrompt) => {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        OPENAI_API_URL,
        {
          model: OPENAI_MODEL,
          messages: [
            {
              role: ROLE,
              content: userPrompt,
            },
          ],
        },
        {
          headers: getOpenAIHeaders(OPENAI_API_KEY),
        }
      );
      const reply = res.data.choices[0].message.content;
      setResponse(reply);
      return reply;
    } catch (err) {
      setError("openaierror");
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, response, loading, error };
};
