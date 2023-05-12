import * as Prometheus from 'prom-client';
import { Express } from "express";
import { BASE_PATH } from "./common";

export const setupMetricsEndpoint = async (app: Express) => {
    app.get(`${BASE_PATH}/metrics`, async (req, res) => {
        res.set('Content-Type', Prometheus.register.contentType);
        res.send(Prometheus.register.metrics());
    });
}
export const log_events_counter = new Prometheus.Counter({
    name: 'logback_events_total',
    help: 'Antall log events fordelt på level',
    labelNames: ['level'],
});
