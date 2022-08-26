#!/bin/bash
APPNAME=poc-app
cd /home/envuser/$APPNAME

npx pm2 start server.js --name='poc-app'

while true; do
    sleep 2
    tail -n 50 ~/.pm2/logs/poc-app-error.log
done
