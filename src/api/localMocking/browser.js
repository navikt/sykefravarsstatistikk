import { setupWorker } from 'msw'
import { localMswHandlers } from './localMswHandlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...localMswHandlers)