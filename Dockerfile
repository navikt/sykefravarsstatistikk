FROM cgr.dev/chainguard/node:18

COPY --chown=node:node build/ build/
COPY --chown=node:node server/ server/
COPY --chown=node:node server/node_modules server/node_modules

WORKDIR /app/server/build

ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT ["server.js"]