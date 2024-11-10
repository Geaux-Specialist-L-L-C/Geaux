// src/components/dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssessments, getLatestAssessment } from '../../services/api';
import { Brain, BookOpen, Target } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import type { Assessment } from '../../types/assessment';
import { calculateScore } from '../../types/assessment';

export default function Dashboard() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (session?.user?.id) {
        try {
          const [assessmentHistory, latest] = await Promise.all([
            getUserAssessments(session.user.id),
            getLatestAssessment(session.user.id)
          ]);

          const processAssessment = (assessment: Assessment): Assessment => ({
            ...assessment,
            score: assessment.score ?? calculateScore(assessment.responses)
          });

          setAssessments(assessmentHistory.map(processAssessment));
          setLatestAssessment(latest ? processAssessment(latest) : null);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDashboardData();
  }, [session]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {/* Welcome Section */}
              <div className="bg-white shadow rounded-lg mb-8 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Welcome{session?.user?.email ? `, ${session.user.email}` : ''}!
                </h2>
                <p className="text-gray-600">Your learning journey starts here!</p>
              </div>

              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <>
                  {/* Latest Assessment Results */}
                  {latestAssessment && (
                    <div className="bg-white shadow rounded-lg mb-8">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Latest Assessment Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-center space-x-4">
                            <Brain className="h-8 w-8 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Learning Style</p>
                              <p className="font-medium">{latestAssessment.learning_style}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Target className="h-8 w-8 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Score</p>
                              <p className="font-medium">{latestAssessment.score}%</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <BookOpen className="h-8 w-8 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">
                                {new Date(latestAssessment.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Assessment History */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-4">Assessment History</h3>
                      {assessments.length > 0 ? (
                        <div className="flow-root">
                          <ul className="-my-5 divide-y divide-gray-200">
                            {assessments.map((assessment) => (
                              <li key={assessment.id} className="py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {assessment.learning_style}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(assessment.created_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                      {assessment.score}%
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500">No assessments taken yet</p>
                          <button
                            onClick={() => navigate('/assessment')}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Take Assessment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}