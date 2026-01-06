/**
 * VELOBAR - CONNECTION MONITORING
 * Monitors network connection to help identify timeout causes
 */

/* eslint-disable no-console -- connection monitor intentionally logs status changes and slow/failed checks for diagnostics */

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

class ConnectionMonitor {
  private isOnline: boolean = true;
  private slowConnectionThreshold: number = 2000; // 2 seconds
  private listeners: Array<(status: boolean) => void> = [];

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (typeof window !== 'undefined') {
      // Monitor online/offline status
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notifyListeners(true);
        if (import.meta.env.DEV) {
          console.log('Connection restored');
        }
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notifyListeners(false);
        if (import.meta.env.DEV) {
          console.warn('Connection lost');
        }
      });

      // Initial status check
      this.isOnline = navigator.onLine;

      // Periodic connection quality check - DISABLED to prevent favicon fetch warnings
      // this.startConnectionQualityCheck();
    }
  }

  private startConnectionQualityCheck() {
    setInterval(() => {
      this.checkConnectionQuality();
    }, 30000); // Check every 30 seconds
  }

  private async checkConnectionQuality() {
    if (!this.isOnline) return;

    try {
      const start = performance.now();

      // Try to fetch a small resource to test connection speed
      const response = await fetch('/favicon.ico', {
        cache: 'no-cache',
        mode: 'no-cors',
      });

      const duration = performance.now() - start;

      if (duration > this.slowConnectionThreshold) {
        console.warn(`Slow connection detected: ${duration}ms for favicon fetch`);
      }
    } catch (error) {
      console.warn('Connection quality check failed:', error);
      // Don't change online status here as this might be a CORS issue
    }
  }

  private notifyListeners(status: boolean) {
    this.listeners.forEach((listener) => {
      try {
        listener(status);
      } catch (error) {
        console.error('Error in connection status listener:', error);
      }
    });
  }

  public getStatus(): boolean {
    return this.isOnline;
  }

  public addListener(callback: (status: boolean) => void): () => void {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Test connection with a specific timeout
  public async testConnection(timeoutMs: number = 5000): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch('/', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const connectionMonitor = new ConnectionMonitor();

// React hook for connection monitoring
export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = React.useState(connectionMonitor.getStatus());

  React.useEffect(() => {
    const unsubscribe = connectionMonitor.addListener(setIsOnline);
    return unsubscribe;
  }, []);

  return {
    isOnline,
    testConnection: connectionMonitor.testConnection.bind(connectionMonitor),
  };
};

export default connectionMonitor;
