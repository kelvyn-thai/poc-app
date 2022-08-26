/* eslint-disable no-console */
import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "components/core/Button";

interface Props {
  children: ReactNode | React.ReactElement | any;
  handleError?: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    handleError: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    console.error("getDerivedStateFromError", error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children = null, handleError } = this.props;
    if (hasError) {
      return (
        <div>
          <h1>Sorry.. there was an error</h1>
          {typeof handleError === "function" && (
            <Button title="Accept!" onClick={handleError} />
          )}
        </div>
      );
    }
    return children;
  }
}
ErrorBoundary.defaultProps = {
  handleError: null,
};

export default ErrorBoundary;
