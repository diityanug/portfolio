import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RouteErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-3 bg-[#F9F8F4] px-6 text-center">
          <p className="font-karla text-sm text-[#1A2F24]/70">
            Failed to load this page.
          </p>
          <pre className="font-mono text-[11px] text-red-600 max-w-lg overflow-auto whitespace-pre-wrap">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default RouteErrorBoundary;