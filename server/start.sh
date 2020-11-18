#!/usr/bin/env sh

if test -d /var/run/secrets/nais.io/vault;
then
    for FILE in /var/run/secrets/nais.io/vault/*.env
    do
        for line in $(cat $FILE); do
            echo "- exporting `echo $line | cut -d '=' -f 1`"
            export $line
        done
    done
fi

if [[ "$REACT_APP_MOCK" == "true" ]];
then
  echo "Vi er inne i labs-gcp, kjører mock server [NAIS_CLUSTER_NAME=$NAIS_CLUSTER_NAME]"
  exec node herokuServer.js
else
  echo "Vi er ikke i labs-gcp, kjører  server [NAIS_CLUSTER_NAME=$NAIS_CLUSTER_NAME]"
  exec node server.js
fi

