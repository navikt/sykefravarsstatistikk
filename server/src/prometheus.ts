import * as Prometheus from 'prom-client';

export const log_events_counter = new Prometheus.Counter({
    name: 'logback_events_total',
    help: 'Antall log events fordelt på level',
    labelNames: ['level'],
});
