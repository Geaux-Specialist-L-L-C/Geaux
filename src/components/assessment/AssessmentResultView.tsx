// src/components/assessment/AssessmentResultView.tsx
import React from 'react';
import { Brain, Target, Sparkles } from 'lucide-react';
import type { AssessmentResult } from '../../types/assessment';

interface ResultProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export default function AssessmentResultView({ result, onRetake }: ResultProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Learning Style Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold">Learning Style</h3>
            </div>
            <p className="text-gray-700">{result.learningStyle}</p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold">Key Strengths</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              {result.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold">Areas to Improve</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              {result.areas_for_improvement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-2">{index + 1}.</span>
                <p className="text-gray-700">{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRetake}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
}