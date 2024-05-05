#!/bin/bash

# server with https and ignore changes at all
./node_modules/live-server/live-server.js --https=./node_modules/live-server-https --ignore=. --port=1312 --no-browser
