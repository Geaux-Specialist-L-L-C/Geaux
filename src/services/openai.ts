// src/services/openai.ts
import { AssessmentResponse } from '../types/assessment';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const analyzeResponses = async (responses: AssessmentResponse[]): Promise<OpenAIResponse> => {
  const endpoint = `${import.meta.env.VITE_AZURE_ENDPOINT}/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview`;
  
  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: `You are an expert in learning styles analysis. Analyze the student's responses and provide:
      - Primary learning style (Visual, Auditory, Kinesthetic, or Reading/Writing)
      - Key strengths
      - Areas for improvement 
      - Specific recommendations for study techniques`
    },
    {
      role: 'user',
      content: JSON.stringify(responses)
    }
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': import.meta.env.VITE_AZURE_API_KEY
    },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    throw new Error('Failed to analyze responses');
  }

  return response.json();
};