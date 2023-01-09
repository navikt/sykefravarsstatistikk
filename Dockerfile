FROM navikt/node-express:16

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY server/ ./server
COPY build/ ./build

## Give apprunner rights to application's build & run folders
USER root
RUN chown -R apprunner /usr/src/app/build
RUN chown -R apprunner /usr/src/app/server
USER apprunner

WORKDIR /usr/src/app/server
RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
