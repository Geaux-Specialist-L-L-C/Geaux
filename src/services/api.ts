import type { AssessmentResponse, AssessmentResult } from '../types/assessment';
import { supabase } from '../lib/supabase';

export async function submitAssessment(responses: AssessmentResponse[]): Promise<AssessmentResult> {
  try {
    const endpoint = `${import.meta.env.VITE_AZURE_ENDPOINT}/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview`;
    
    // Format the responses for the AI model
    const prompt = {
      messages: [
        {
          role: "system",
          content: "You are an expert in learning styles analysis. Analyze the user's responses to determine their learning style, strengths, areas for improvement, and provide specific recommendations."
        },
        {
          role: "user",
          content: JSON.stringify(responses)
        }
      ]
    };

    const azureResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_AZURE_API_KEY,
      },
      body: JSON.stringify(prompt),
    });

    if (!azureResponse.ok) {
      throw new Error('Failed to analyze responses');
    }

    const aiResponse = await azureResponse.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    const result: AssessmentResult = {
      learningStyle: analysis.learningStyle,
      recommendations: analysis.recommendations,
      strengths: analysis.strengths,
      areas_for_improvement: analysis.areas_for_improvement
    };

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Store the assessment result in Supabase
      const { error } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          responses,
          learning_style: result.learningStyle,
          strengths: result.strengths,
          areas_for_improvement: result.areas_for_improvement,
          recommendations: result.recommendations,
        });

      if (error) {
        console.error('Error storing assessment:', error);
      }
    }

    return result;
  } catch (error) {
    console.error('Error in submitAssessment:', error);
    throw error;
  }
}

export async function getUserAssessments(userId: string) {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getLatestAssessment(userId: string) {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
}