import React from 'react';

/**
 * OptimizedImage Component
 * Provides lazy loading and error handling for images
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Tailwind CSS classes
 * @param {string} fallbackSrc - Fallback image if main image fails
 * @param {object} ...props - Additional props to pass to img element
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  ...props
}) => {
  const handleError = (e) => {
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
    e.target.src = fallbackSrc;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
