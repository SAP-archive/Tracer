#!/bin/bash
mainFileName=$(ls -d /usr/share/nginx/html/main*.js)
tmpFile='tmp.txt'
echo "empty" > ${tmpFile}
echo "main js file: $mainFileName"

echo "tracer TRACER_ENV_ "
env | grep "TRACER_ENV_.*"
echo "String replace placeholders to env to tempFile"
envsubst "$(printf '${%s}' ${!TRACER_ENV_*})"< ${mainFileName} > ${tmpFile}
echo "mv ${tmpFile} ${mainFileName}"
mv ${tmpFile} ${mainFileName}
exec "$@"

# This file has to be in a unix format !!!!