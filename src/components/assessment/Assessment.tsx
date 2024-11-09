import React, { useState } from 'react';
import type { Question, AssessmentResponse, AssessmentResult } from '../../types/assessment';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import AssessmentResult from './AssessmentResult';
import { submitAssessment } from '../../services/api';

const questions: Question[] = [
  {
    id: 1,
    text: "When learning something new, I prefer to:",
    options: [
      "Read detailed written instructions",
      "Watch a demonstration video",
      "Try it hands-on immediately",
      "Discuss it with others"
    ]
  },
  {
    id: 2,
    text: "I remember information best when:",
    options: [
      "I see it written down",
      "I hear it explained",
      "I can physically interact with it",
      "I can discuss it with others"
    ]
  },
  {
    id: 3,
    text: "When solving problems, I tend to:",
    options: [
      "Make lists and follow systematic steps",
      "Visualize possible solutions",
      "Use trial and error",
      "Talk through different approaches"
    ]
  }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentResponse[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer
    };
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      try {
        setIsLoading(true);
        const result = await submitAssessment(answers);
        setResult(result);
      } catch (error) {
        // Handle error appropriately
        console.error('Failed to submit assessment:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return <AssessmentResult result={result} onRetake={handleRetake} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProgressBar
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
      />
      <QuestionCard
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        selectedAnswer={answers[currentQuestion]?.answer || ''}
        isFirst={currentQuestion === 0}
        isLast={currentQuestion === questions.length - 1}
      />
    </div>
  );
}