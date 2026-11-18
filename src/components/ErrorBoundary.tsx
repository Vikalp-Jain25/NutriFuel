import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected application error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NutriFuel ErrorBoundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let readableMessage = this.state.errorMessage;
      try {
        const parsed = JSON.parse(this.state.errorMessage);
        if (parsed && parsed.error) {
          readableMessage = `Database permission or validation error (${parsed.operationType} on ${parsed.path || 'record'}): ${parsed.error}`;
        }
      } catch {
        // Keep raw message if not JSON
      }

      return (
        <div className="min-h-screen bg-[#FAFBF9] flex items-center justify-center px-6 py-16">
          <div className="max-w-lg w-full bg-white border border-[#E2E8E0] rounded-xl p-8">
            <p className="text-xs font-mono text-[#15803D] mb-2">Application Recovery</p>
            <h2 className="text-2xl font-semibold text-[#111814] mb-3">
              Something interrupted your session
            </h2>
            <p className="text-sm text-[#4B584E] leading-relaxed mb-6">
              {readableMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, errorMessage: '' });
                window.location.reload();
              }}
              className="px-5 py-2.5 text-sm font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors whitespace-nowrap"
            >
              Reload NutriFuel
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
