import { memo } from 'react';

/**
 * LoadingSpinner Component
 * Reusable loading spinner with accessible status announcement
 */
const LoadingSpinner = ({ message = 'Chargement...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-4 border-b-4'
  };

  return (
    <div className="flex justify-center items-center py-20" role="status" aria-live="polite">
      <div className={`animate-spin rounded-full border-orange-500 ${sizeClasses[size]}`}>
        <span className="sr-only">{message}</span>
      </div>
      {message && <p className="ml-3 text-lg text-gray-600">{message}</p>}
    </div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default memo(LoadingSpinner);