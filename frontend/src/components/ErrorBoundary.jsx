import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Store error details for debugging
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    });

    // Log to external service (in production)
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo, errorId);
    }
  }

  logErrorToService = (error, errorInfo, errorId) => {
    // In a real application, you would send this to an error tracking service
    // like Sentry, LogRocket, or your own logging endpoint
    try {
      const errorData = {
        errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // Example: Send to logging endpoint
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // });
      
      console.log('Error logged to service:', errorData);
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Development mode - show detailed error info
      if (process.env.NODE_ENV === 'development') {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🐛</div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  Development Error
                </h1>
                <div className="text-left bg-gray-100 rounded-lg p-4 mb-6">
                  <h2 className="font-semibold text-lg mb-2">Error Details:</h2>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Error ID:</strong> {this.state.errorId}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Message:</strong> {this.state.error?.message}
                  </p>
                  <details className="text-sm">
                    <summary className="cursor-pointer font-semibold mb-2">
                      Stack Trace
                    </summary>
                    <pre className="whitespace-pre-wrap text-xs bg-gray-800 text-green-400 p-2 rounded overflow-auto max-h-40">
                      {this.state.error?.stack}
                    </pre>
                  </details>
                  <details className="text-sm">
                    <summary className="cursor-pointer font-semibold mb-2">
                      Component Stack
                    </summary>
                    <pre className="whitespace-pre-wrap text-xs bg-gray-800 text-green-400 p-2 rounded overflow-auto max-h-40">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={this.handleRetry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={this.handleReload}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Production mode - show user-friendly error
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but something unexpected happened. 
                Our team has been notified and is working to fix this issue.
              </p>
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reload Page
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Error ID: {this.state.errorId}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
