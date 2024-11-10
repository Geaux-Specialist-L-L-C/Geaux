import React, { useState } from 'react';
import type { AssessmentResponse, AssessmentResult } from '../../types/assessment';
import AssessmentResultView from './AssessmentResultView';
import { submitAssessment } from '../../services/api';
import LoadingOverlay from '../common/LoadingOverlay';
import { analyzeResponses } from '../../services/openai';

// Predefined questions for learning style assessment
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    text: "How do you prefer to learn new information?",
    options: [
      "By seeing visual diagrams and charts",
      "By listening to explanations",
      "By hands-on practice",
      "By reading and writing notes"
    ]
  },
  // Add more structured questions
];

export default function Assessment() {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<string[]>([
    "AI: Hello! Let's discover your learning style. I'll ask you a series of questions. Ready to begin?"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, `User: ${userMessage}`]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await analyzeResponses([
        { 
          questionId: currentQuestionIndex + 1, 
          answer: userMessage 
        }
      ]);

      const aiMessage = aiResponse.choices[0].message.content;
      setChatHistory(prev => [...prev, `AI: ${aiMessage}`]);
      
      setResponses(prev => [...prev, {
        questionId: currentQuestionIndex + 1,
        answer: userMessage
      }]);

      if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        // Ask next question
        setChatHistory(prev => [...prev, 
          `AI: ${ASSESSMENT_QUESTIONS[currentQuestionIndex + 1].text}`
        ]);
      } else {
        // Assessment complete
        handleSubmit();
      }

      setChatInput('');
    } catch (error) {
      console.error('Failed to analyze response:', error);
      setError('Failed to analyze your response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const assessmentResult = await submitAssessment(responses);
      setResult(assessmentResult);
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setResponses([]);
    setResult(null);
    setError(null);
    setChatInput('');
    setChatHistory([
      "AI: Let's try the assessment again. Ready to begin?"
    ]);
    setCurrentQuestionIndex(0);
  };

  if (isLoading) {
    return <LoadingOverlay message="Analyzing your responses..." />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={handleRetake}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return <AssessmentResultView result={result} onRetake={handleRetake} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Chat with the AI</h3>
          <div className="space-y-3">
            {chatHistory.map((message, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                {message}
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 p-4 border rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleChatSubmit}
            className="p-4 bg-indigo-600 text-white rounded-r-lg"
          >
            Send
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
}