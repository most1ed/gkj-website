import { faker } from '@faker-js/faker/locale/id_ID';
import { MockApiErrorType, createMockApiError, MockApiErrorLogger } from './errors';
import { simulateApiCall, retryApiCall } from './utils';

/**
 * Mock API Testing Utility
 * Provides tools for testing mock API behaviors and error scenarios
 */
export const MockApiTesting = {
  /**
   * Generate test scenarios for API calls
   * @returns Object with various test scenario generators
   */
  scenarios: {
    /**
     * Generate a successful API call scenario
     * @param dataGenerator Function to generate mock data
     * @returns Function that simulates a successful API call
     */
    successScenario: <T>(dataGenerator: () => T) => 
      async () => simulateApiCall(dataGenerator, { 
        delay: true, 
        errorProbability: 0 
      }),

    /**
     * Generate an error scenario with specific error type
     * @param errorType Type of error to simulate
     * @returns Function that always throws a specific error
     */
    errorScenario: (errorType: MockApiErrorType = MockApiErrorType.SERVER_ERROR) => 
      async () => {
        const error = createMockApiError(errorType);
        MockApiErrorLogger.log(error);
        throw error;
      },

    /**
     * Generate a flaky API scenario with intermittent errors
     * @param successRate Probability of successful calls (0-1)
     * @param dataGenerator Function to generate mock data
     * @returns Function that simulates a flaky API call
     */
    flakyScenario: <T>(
      successRate = 0.7, 
      dataGenerator: () => T
    ) => 
      async () => {
        if (Math.random() > successRate) {
          const error = MockApiErrorLogger.simulate(1, [
            MockApiErrorType.NETWORK_ERROR, 
            MockApiErrorType.SERVER_ERROR
          ]);
          if (error) throw error;
        }
        return simulateApiCall(dataGenerator);
      },

    /**
     * Generate a retry scenario to test resilience
     * @param dataGenerator Function to generate mock data
     * @returns Function that simulates an API call with retry logic
     */
    retryScenario: <T>(dataGenerator: () => T) => 
      async () => retryApiCall(
        async () => simulateApiCall(dataGenerator, { 
          delay: true, 
          errorProbability: 0.5 
        }),
        { 
          maxRetries: 3, 
          baseDelay: 500, 
          backoffFactor: 2 
        }
      )
  },

  /**
   * Create mock data generators for testing
   * @returns Object with various mock data generators
   */
  mockGenerators: {
    /**
     * Generate a simple user object for testing
     * @returns Mock user object
     */
    user: () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'user', 'guest'])
    }),

    /**
     * Generate a simple service object for testing
     * @returns Mock service object
     */
    service: () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      date: faker.date.future().toISOString(),
      description: faker.lorem.paragraph()
    }),

    /**
     * Generate a collection of mock objects
     * @param generator Generator function
     * @param count Number of objects to generate
     * @returns Array of mock objects
     */
    collection: <T>(generator: () => T, count = 5): T[] => 
      Array.from({ length: count }, generator)
  },

  /**
   * Utility for simulating various API response conditions
   * @returns Object with methods to simulate different API behaviors
   */
  responseSimulator: {
    /**
     * Simulate pagination
     * @param items Full list of items
     * @param page Current page number
     * @param pageSize Number of items per page
     * @returns Paginated result
     */
    paginate: <T>(items: T[], page = 1, pageSize = 10) => ({
      items: items.slice((page - 1) * pageSize, page * pageSize),
      total: items.length,
      page,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize)
    }),

    /**
     * Simulate filtering
     * @param items Full list of items
     * @param filterFn Filter function
     * @returns Filtered items
     */
    filter: <T>(items: T[], filterFn: (item: T) => boolean) => 
      items.filter(filterFn),

    /**
     * Simulate sorting
     * @param items List of items
     * @param sortFn Sort comparison function
     * @returns Sorted items
     */
    sort: <T>(items: T[], sortFn: (a: T, b: T) => number) => 
      [...items].sort(sortFn)
  }
};
