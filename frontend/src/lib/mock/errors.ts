// Advanced Error Handling for Mock API

export enum MockApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface MockApiError extends Error {
  type: MockApiErrorType;
  statusCode: number;
  details?: Record<string, any>;
}

/**
 * Create a standardized mock API error
 * @param type Error type from MockApiErrorType
 * @param message Custom error message
 * @param details Additional error details
 * @returns MockApiError
 */
export function createMockApiError(
  type: MockApiErrorType, 
  message?: string, 
  details?: Record<string, any>
): MockApiError {
  const errorMap: Record<MockApiErrorType, { message: string; statusCode: number }> = {
    [MockApiErrorType.NETWORK_ERROR]: { 
      message: 'Network connection failed', 
      statusCode: 0 
    },
    [MockApiErrorType.UNAUTHORIZED]: { 
      message: 'Unauthorized access', 
      statusCode: 401 
    },
    [MockApiErrorType.VALIDATION_ERROR]: { 
      message: 'Invalid data provided', 
      statusCode: 400 
    },
    [MockApiErrorType.NOT_FOUND]: { 
      message: 'Requested resource not found', 
      statusCode: 404 
    },
    [MockApiErrorType.SERVER_ERROR]: { 
      message: 'Internal server error', 
      statusCode: 500 
    }
  };

  const defaultError = errorMap[type];
  const error = new Error(message || defaultError.message) as MockApiError;
  
  error.name = 'MockApiError';
  error.type = type;
  error.statusCode = defaultError.statusCode;
  error.details = details;

  return error;
}

/**
 * Error logging utility for mock API
 */
export const MockApiErrorLogger = {
  log: (error: MockApiError) => {
    console.error(`[Mock API Error] ${error.type}:`, {
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Create a mock error with a specific probability
   * @param probability Chance of throwing an error (0-1)
   * @param errorTypes Possible error types to generate
   * @returns MockApiError or null
   */
  simulate: (
    probability = 0.1, 
    errorTypes = Object.values(MockApiErrorType)
  ): MockApiError | null => {
    if (Math.random() < probability) {
      const randomErrorType = errorTypes[
        Math.floor(Math.random() * errorTypes.length)
      ];
      
      const error = createMockApiError(
        randomErrorType, 
        `Simulated ${randomErrorType} error`
      );
      
      MockApiErrorLogger.log(error);
      return error;
    }
    return null;
  }
};
