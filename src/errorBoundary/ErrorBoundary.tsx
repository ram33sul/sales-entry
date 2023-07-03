import { useEffect, useState, ReactNode, FC } from 'react';
import styles from './ErrorBounday.module.css';

type ErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleReload = () => {
    window.location.reload();
  }

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      setHasError(true);
      setError(error.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>Oops...Something went wrong. Try refreshing the page.</div>
        <div className={styles.error}>{error?.toString()}</div>
        <button className={styles["refresh-button"]} onClick={handleReload}>
            Refresh
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
