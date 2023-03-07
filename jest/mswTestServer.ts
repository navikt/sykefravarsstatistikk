import { setupServer } from 'msw/node';
import { commonTestHandlers } from './commonMswTestHandlers';

export const mswTestServer = setupServer(...commonTestHandlers);
