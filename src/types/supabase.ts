export interface Database {
  public: {
    Tables: {
      assessments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          responses: {
            questionId: number;
            answer: string;
          }[];
          learning_style: string;
          strengths: string[];
          areas_for_improvement: string[];
          recommendations: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          responses: {
            questionId: number;
            answer: string;
          }[];
          learning_style: string;
          strengths: string[];
          areas_for_improvement: string[];
          recommendations: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          responses?: {
            questionId: number;
            answer: string;
          }[];
          learning_style?: string;
          strengths?: string[];
          areas_for_improvement?: string[];
          recommendations?: string[];
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string | null;
        };
      };
    };
  };
}