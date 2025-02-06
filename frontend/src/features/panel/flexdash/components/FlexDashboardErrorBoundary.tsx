import React, { ErrorInfo } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class FlexDashboardErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('FlexDashboard Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackRender ? (
        this.props.fallbackRender(this.state.error!)
      ) : (
        <DefaultFlexDashboardErrorView 
          error={this.state.error} 
          errorInfo={this.state.errorInfo} 
        />
      );
    }

    return this.props.children;
  }
}

const DefaultFlexDashboardErrorView: React.FC<{ 
  error?: Error, 
  errorInfo?: ErrorInfo 
}> = ({ error, errorInfo }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/panel/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-destructive">
            <AlertTriangle className="w-8 h-8" />
            Dashboard Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Something went wrong with your dashboard configuration.
          </p>
          
          {error && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <strong>Error:</strong> {error.message}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reload Dashboard
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={handleGoHome}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Return Home
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && errorInfo && (
            <details className="text-xs text-left mt-4 max-h-40 overflow-auto">
              <summary>Error Details</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
