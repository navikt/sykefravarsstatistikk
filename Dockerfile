FROM navikt/node-express:12.2.0-alpine
WORKDIR /app

COPY build/ build/
COPY src/server/ src/server/

EXPOSE 3000
ENTRYPOINT ["node", "src/server/server.js"]