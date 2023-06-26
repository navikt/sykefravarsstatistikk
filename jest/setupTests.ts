import '@testing-library/jest-dom/extend-expect';
import { mswTestServer } from './mswTestServer';
import 'core-js/es/array/to-reversed';

import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

beforeAll(() => mswTestServer.listen());
afterEach(() => mswTestServer.resetHandlers());
afterAll(() => mswTestServer.close());
