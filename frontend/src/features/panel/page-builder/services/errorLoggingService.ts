interface ErrorLog {
  error: Error;
  context?: string;
  severity?: 'low' | 'medium' | 'high';
  additionalInfo?: Record<string, any>;
}

export const logErrorToService = (errorLog: ErrorLog) => {
  console.group(`Error Logging: ${errorLog.context || 'Unknown Context'}`);
  console.error('Error:', errorLog.error.message);
  console.log('Severity:', errorLog.severity || 'medium');
  
  if (errorLog.additionalInfo) {
    console.log('Additional Info:', errorLog.additionalInfo);
  }
  
  console.groupEnd();

  // In a real-world scenario, you might want to send this to a backend error tracking service
  // For now, we'll just log to console
};
