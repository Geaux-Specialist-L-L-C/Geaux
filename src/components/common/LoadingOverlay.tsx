// src/components/common/LoadingOverlay.tsx
import LoadingSpinner from './LoadingSpinner';

export default function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}