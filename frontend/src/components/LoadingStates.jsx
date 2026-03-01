import React from 'react';

// Loading spinner component
export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'green', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    green: 'border-green-600',
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    red: 'border-red-600'
  };

  return (
    <div 
      className={`
        animate-spin rounded-full border-2 border-t-transparent
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        ${className}
      `}
    />
  );
};

// Skeleton loader component
export const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  lines = 1 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`
            ${width} ${height} 
            bg-gray-200 rounded 
            animate-pulse
          `}
        />
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="space-y-4">
        <SkeletonLoader width="w-3/4" height="h-6" />
        <SkeletonLoader width="w-full" height="h-4" lines={2} />
        <div className="flex gap-2">
          <SkeletonLoader width="w-20" height="h-8" />
          <SkeletonLoader width="w-20" height="h-8" />
        </div>
      </div>
    </div>
  );
};

// Table skeleton loader
export const TableSkeleton = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-3">
                  <SkeletonLoader width="w-24" height="h-4" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <SkeletonLoader width="w-full" height="h-4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Form skeleton loader
export const FormSkeleton = ({ fields = 4, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <SkeletonLoader width="w-24" height="h-4" />
          <SkeletonLoader width="w-full" height="h-10" />
        </div>
      ))}
      <div className="flex gap-4">
        <SkeletonLoader width="w-24" height="h-10" />
        <SkeletonLoader width="w-24" height="h-10" />
      </div>
    </div>
  );
};

// Page loading component
export const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" color="green" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

// Component loading wrapper
export const ComponentLoading = ({ 
  isLoading, 
  children, 
  fallback = <LoadingSpinner />,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        {fallback}
      </div>
    );
  }

  return children;
};

// Progress bar component
export const ProgressBar = ({ 
  progress = 0, 
  color = 'green', 
  height = 'h-2',
  showLabel = false,
  className = ''
}) => {
  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    red: 'bg-red-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div
          className={`${colorClasses[color]} ${height} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

// Staggered loading animation
export const StaggeredLoading = ({ 
  items = [], 
  renderItem, 
  className = '' 
}) => {
  const [visibleItems, setVisibleItems] = React.useState(0);

  React.useEffect(() => {
    if (visibleItems < items.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visibleItems, items.length]);

  return (
    <div className={className}>
      {items.slice(0, visibleItems).map((item, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: '300ms'
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

// Loading overlay
export const LoadingOverlay = ({ 
  isLoading, 
  message = 'Loading...',
  children,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <LoadingSpinner size="lg" color="green" className="mx-auto mb-2" />
            <p className="text-gray-600 text-sm">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom hook for loading states
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [error, setError] = React.useState(null);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const setErrorState = React.useCallback((error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const reset = React.useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    reset
  };
};

// Async operation wrapper
export const useAsyncOperation = (asyncFunction, dependencies = []) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const execute = React.useCallback(async (...args) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  return {
    data,
    isLoading,
    error,
    execute
  };
};

export default {
  LoadingSpinner,
  SkeletonLoader,
  CardSkeleton,
  TableSkeleton,
  FormSkeleton,
  PageLoading,
  ComponentLoading,
  ProgressBar,
  StaggeredLoading,
  LoadingOverlay,
  useLoadingState,
  useAsyncOperation
};
