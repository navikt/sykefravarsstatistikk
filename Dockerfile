FROM navikt/node-express:16

WORKDIR /usr/src/app

COPY build/ build/

WORKDIR /usr/src/app/server
COPY server/ .

USER root
RUN yarn install --frozen-lockfile

USER apprunner

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
