import { setupServer } from 'msw/node';
import { commonHandlers } from './commonMswHandlers';

export const mswServer = setupServer(...commonHandlers);
