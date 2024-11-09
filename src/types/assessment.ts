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
  recommendations: string[];
  strengths: string[];
  areas_for_improvement: string[];
}