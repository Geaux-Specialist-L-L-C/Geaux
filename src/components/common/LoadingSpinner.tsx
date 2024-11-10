// src/components/common/LoadingSpinner.tsx
export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex justify-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-indigo-600 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}