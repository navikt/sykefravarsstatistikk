import '@testing-library/jest-dom/extend-expect';
import { mswTestServer } from './mswTestServer';

beforeAll(() => mswTestServer.listen());
afterEach(() => mswTestServer.resetHandlers());
afterAll(() => mswTestServer.close());
