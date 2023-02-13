import { setupServer } from 'msw/node';
import { commonTestHandlers } from './commonMswHandlers';

export const mswServer = setupServer(...commonTestHandlers);
