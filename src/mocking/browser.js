import { setupWorker } from 'msw'
import { commonHandlers } from './commonHandlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...commonHandlers)