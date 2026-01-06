import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex flex-col items-center justify-center p-32 text-center'>
          <div className='bg-navy border-accent-primary/30 max-w-lg rounded-xl border p-24'>
            <h2 className='text-accent-primary mb-16 text-2xl font-semibold'>
              Etwas ist schiefgelaufen
            </h2>
            <p className='mb-16 text-white/90'>
              Wir haben ein Problem festgestellt. Bitte laden Sie die Seite neu oder kontaktieren
              Sie uns, wenn das Problem weiterhin besteht.
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className='bg-accent-primary text-navy-dark hover:bg-accent-primary-hover rounded-md px-4 py-2 font-semibold transition-colors duration-300'
            >
              Seite neu laden
            </button>

            {import.meta.env.DEV && this.state.error && (
              <div className='mt-24 rounded-md bg-red-900/40 p-16 text-left'>
                <p className='overflow-x-auto font-mono text-sm whitespace-pre-wrap text-red-200'>
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
