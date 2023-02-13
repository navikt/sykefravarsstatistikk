import { setupWorker } from 'msw'
import { defaultHandlers } from './defaultHandlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...defaultHandlers)