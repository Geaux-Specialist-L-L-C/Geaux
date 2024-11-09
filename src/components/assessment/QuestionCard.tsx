import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { Question } from '../../types/assessment';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  selectedAnswer: string;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  selectedAnswer,
  isFirst,
  isLast,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedAnswer === option
                ? 'bg-indigo-100 border-2 border-indigo-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center px-4 py-2 rounded-md ${
            isFirst
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`flex items-center px-4 py-2 rounded-md ${
            !selectedAnswer
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isLast ? 'Submit' : 'Next'}
          {!isLast && <ChevronRight className="w-5 h-5 ml-1" />}
        </button>
      </div>
    </div>
  );
}