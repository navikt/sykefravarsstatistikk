FROM navikt/node-express:12.2.0-alpine as builder
WORKDIR /usr/src/app

RUN yarn add express mustache-express jsdom request promise http-proxy-middleware@1.0.4 fs-extra prometheus-api-metrics prom-client axios

FROM navikt/node-express:12.2.0-alpine
WORKDIR /app
COPY build/ build/
COPY src/server/ src/server/
COPY start.sh start.sh

COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
