export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface AssessmentResponse {
  questionId: number;
  answer: string;
}

export interface AssessmentResult {
  learningStyle: string;
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
}

export interface Assessment extends AssessmentResult {
  id: string;
  created_at: string;
  user_id: string;
  learning_style: string;
  responses: AssessmentResponse[];
  score: number;
}

// Add utility function for score calculation
export const calculateScore = (responses: AssessmentResponse[]): number => {
  // Implement actual scoring logic based on responses
  const totalQuestions = responses.length;
  const correctAnswers = responses.filter(r => r.answer).length;
  return Math.round((correctAnswers / totalQuestions) * 100);
};