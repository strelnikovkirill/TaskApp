#!/bin/bash

CLIENT_DIR=$(realpath client)
SERVER_DIR=$(realpath server)

# Check docker daemon is running
docker ps && sleep 3

# Run database
docker-compose run -d db

# Check node_modules are installed
if [[ ! -e "$CLIENT_DIR/node_modules" ]]; then
    cd "$CLIENT_DIR" && npm i
fi

if [[ ! -e "$SERVER_DIR/node_modules" ]]; then
    cd "$SERVER_DIR" && npm i
fi

# Run server and client

cd "$SERVER_DIR" && npm start &
cd "$CLIENT_DIR" && npm start &
