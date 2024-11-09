import React from 'react';
import { Brain, Target, Sparkles } from 'lucide-react';
import type { AssessmentResult } from '../../types/assessment';

interface ResultProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export default function AssessmentResult({ result, onRetake }: ResultProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Style Analysis</h2>
        <p className="text-xl text-indigo-600 font-semibold">{result.learningStyle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-xl font-semibold">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-xl font-semibold">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {result.areas_for_improvement.map((area, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                {area}
              </li>
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
              {recommendation}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onRetake}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
}