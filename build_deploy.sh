#!/bin/sh
#
killall node

killall caddy

git fetch

git pull

npm i

npm run build

nohup node -r dotenv/config build &

nohup sqlite_web --host 85.215.44.149 ./db/aaron.db &

nohup caddy run & 
