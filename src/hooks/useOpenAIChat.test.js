import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useOpenAIChat } from './useOpenAIChat';

jest.mock('axios');

describe('useOpenAIChat', () => {
  it('should generate response successfully', async () => {
    const mockReply = 'This is an AI response.';
    axios.post.mockResolvedValue({
      data: {
        choices: [
          { message: { content: mockReply } },
        ],
      },
    });

    const { result } = renderHook(() => useOpenAIChat());

    await act(async () => {
      const reply = await result.current.generateResponse('Write something...');
      expect(reply).toBe(mockReply);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toBe(mockReply);
    expect(result.current.error).toBe('');
  });

  it('should handle API error', async () => {
    axios.post.mockRejectedValue(new Error('API Failed'));

    const { result } = renderHook(() => useOpenAIChat());

    await act(async () => {
      const reply = await result.current.generateResponse('Error test');
      expect(reply).toBeUndefined();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('openaierror');
  });
});
