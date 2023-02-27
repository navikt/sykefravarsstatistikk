import { setupWorker } from 'msw'
import { defaultMswHandlers } from './defaultMswHandlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...defaultMswHandlers)