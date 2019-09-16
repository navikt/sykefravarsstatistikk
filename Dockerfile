FROM navikt/node-express:12.2.0-alpine
WORKDIR /app

COPY build/ build/
COPY src/server/ src/server/
COPY start.sh start.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]