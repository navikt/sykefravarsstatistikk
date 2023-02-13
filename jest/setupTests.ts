import '@testing-library/jest-dom/extend-expect';
import { mswServer } from './mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
