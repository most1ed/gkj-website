import { servicesMock } from './services';
import { homeMock } from './home';
import * as mockUtils from './utils';
import * as mockErrors from './errors';
import { MockApiTesting } from './testing';
import { setupWorker } from 'msw/browser';
import { homeHandlers } from './home';
import { servicesHandlers } from './services';
import { settingsHandlers } from './settings';
import { widgetMock } from './widget';
import { mockJemaatService, jemaatHandlers } from './jemaat';
import { 
  mockOfferingService, 
  offeringsHandlers, 
  offeringTypes, 
  offeringCategories 
} from './offerings';
import { mockIbadahService, ibadahHandlers } from './ibadah';

export const mockApi = {
  services: servicesMock,
  home: homeMock,
  utils: mockUtils,
  errors: mockErrors,
  testing: MockApiTesting,
  widget: widgetMock,
  jemaat: mockJemaatService,
  offerings: mockOfferingService,
  ibadah: mockIbadahService
};

export const worker = setupWorker(
  ...homeHandlers,
  ...servicesHandlers,
  ...settingsHandlers,
  ...offeringsHandlers,
  ...jemaatHandlers,
  ...ibadahHandlers
);

export { 
  widgetMock, 
  mockOfferingService,
  mockJemaatService,
  mockIbadahService,
  offeringTypes,
  offeringCategories
};

export * from './testing';
