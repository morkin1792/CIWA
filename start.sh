#!/usr/bin/env bash
local="$(cd "$(dirname "$0")";pwd)"

if [ ! -d "$local"/node_modules ]; then
    cd "$local"; npm install
fi
pid=$(ss -lpnt | grep :3030 | awk '{ if (match($0,/pid=([0-9]+)/,m)) print m[1]}')
if [ ! -z $pid ]; then
    echo 'restarting...'
    kill $pid
fi
npm start &
docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    -e NEO4J_ACCEPT_LICENSE_AGREEMENT=yes -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_AUTH=neo4j/neo4j1 -e NEO4J_apoc_import_file_use__neo4j__config=true  \
    neo4j:enterprise
