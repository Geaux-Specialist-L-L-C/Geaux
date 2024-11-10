import { AssessmentResponse, AssessmentResult, Assessment } from '../types/assessment';
import { supabase } from '../lib/supabase';
import { analyzeResponses } from './openai';

// src/services/api.ts
export async function submitAssessment(responses: AssessmentResponse[]): Promise<AssessmentResult> {
  try {
    const aiResponse = await analyzeResponses(responses);
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    const result: AssessmentResult = {
      learningStyle: analysis.learningStyle,
      strengths: analysis.strengths,
      areas_for_improvement: analysis.areas_for_improvement,
      recommendations: analysis.recommendations
    };

    // Save to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('assessments').insert({
        user_id: user.id,
        responses,
        ...result
      });
    }

    return result;
  } catch (error) {
    console.error('Error in submitAssessment:', error);
    throw error;
  }
}

export async function getUserAssessments(userId: string): Promise<Assessment[]> {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserAssessments:', error);
    throw error;
  }
}

export async function getLatestAssessment(userId: string): Promise<Assessment | null> {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in getLatestAssessment:', error);
    throw error;
  }
}