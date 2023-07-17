FROM ghcr.io/navikt/node-express:16

WORKDIR /var

COPY build/ build/
COPY server/ server/
COPY server/node_modules server/node_modules

WORKDIR /var/server/build

ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]