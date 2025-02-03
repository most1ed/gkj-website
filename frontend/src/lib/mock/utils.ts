// Utility functions for mock API simulation

import { MockApiErrorType, createMockApiError, MockApiErrorLogger } from './errors';

/**
 * Simulates network delay
 * @param ms Delay in milliseconds (default: 500ms)
 * @returns Promise that resolves after specified delay
 */
export const simulateDelay = (ms = 500): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random delay between min and max
 * @param min Minimum delay in milliseconds
 * @param max Maximum delay in milliseconds
 * @returns Promise that resolves after random delay
 */
export const simulateRandomDelay = (
  min = 300, 
  max = 1500
): Promise<void> => 
  simulateDelay(Math.random() * (max - min) + min);

/**
 * Simulates an API error with configurable probability
 * @param errorProbability Chance of throwing an error (0-1)
 * @param errorMessages Array of possible error messages
 * @throws Error with random message
 */
export const simulateApiError = (
  errorProbability = 0.1, 
  errorMessages = [
    'Network error',
    'Server unavailable', 
    'Unauthorized access',
    'Rate limit exceeded'
  ]
): void => {
  if (Math.random() < errorProbability) {
    const randomMessage = errorMessages[
      Math.floor(Math.random() * errorMessages.length)
    ];
    throw new Error(randomMessage);
  }
};

/**
 * Wraps a mock data generator with delay and potential error simulation
 * @param generator Function to generate mock data
 * @param config Configuration for delay and error simulation
 * @returns Function that generates mock data with simulated API behavior
 */
export function createMockApiSimulation<T>(
  generator: () => T, 
  config = { 
    delay: true, 
    errorProbability: 0.05 
  }
): () => Promise<T> {
  return async () => {
    if (config.delay) {
      await simulateRandomDelay();
    }

    simulateApiError(config.errorProbability);
    return generator();
  };
}

/**
 * Simulates an API call with configurable error and delay behavior
 * @param generator Function to generate mock data
 * @param config Configuration for API simulation
 * @returns Promise with mock data or error
 */
export async function simulateApiCall<T>(
  generator: () => T, 
  config = { 
    delay: true, 
    errorProbability: 0.05,
    errorTypes: [
      MockApiErrorType.NETWORK_ERROR, 
      MockApiErrorType.SERVER_ERROR
    ]
  }
): Promise<T> {
  // Simulate network delay
  if (config.delay) {
    await simulateRandomDelay();
  }

  // Simulate potential API error
  const simulatedError = MockApiErrorLogger.simulate(
    config.errorProbability, 
    config.errorTypes
  );

  if (simulatedError) {
    throw simulatedError;
  }

  // Generate and return mock data
  return generator();
}

/**
 * Retry mechanism for API calls
 * @param apiCall Function to retry
 * @param config Retry configuration
 * @returns Promise with mock data
 */
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  config = {
    maxRetries: 3,
    baseDelay: 1000,
    backoffFactor: 2
  }
): Promise<T> {
  let retries = 0;

  while (retries < config.maxRetries) {
    try {
      return await apiCall();
    } catch (error) {
      retries++;

      if (retries >= config.maxRetries) {
        throw createMockApiError(
          MockApiErrorType.SERVER_ERROR, 
          `Failed after ${retries} retries`
        );
      }

      // Exponential backoff
      const delay = config.baseDelay * Math.pow(config.backoffFactor, retries);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw createMockApiError(
    MockApiErrorType.SERVER_ERROR, 
    'Unexpected retry mechanism failure'
  );
}
