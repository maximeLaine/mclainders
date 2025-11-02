import { memo } from 'react';

/**
 * ErrorMessage Component
 * Reusable error message display with accessibility features
 */
const ErrorMessage = ({ error, title = 'Une erreur est survenue' }) => {
  const errorMessage = error?.message || error || 'Une erreur inattendue s\'est produite.';

  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-start">
          <svg
            className="h-6 w-6 text-red-600 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">{title}</h3>
            <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.displayName = 'ErrorMessage';

export default memo(ErrorMessage);