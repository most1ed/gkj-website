import { servicesMock } from './services';
import { homeMock } from './home';
import * as mockUtils from './utils';
import * as mockErrors from './errors';
import { MockApiTesting } from './testing';

export const mockApi = {
  services: servicesMock,
  home: homeMock,
  utils: mockUtils,
  errors: mockErrors,
  testing: MockApiTesting
};
