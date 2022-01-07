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


if [ "$NAIS_CLUSTER_NAME" == "dev-sbs" ] || [ "$NAIS_CLUSTER_NAME" == "prod-sbs" ]
then
  exec node serverSbs.js
else
  exec node server.js
fi

