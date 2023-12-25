#!/bin/sh
#
killall node

killall caddy

git fetch

git pull

npm i

npm run build

nohup node -r dotenv/config build &

sudo -E caddy reverse-proxy --from aarongodpanel.com --to 85.215.44.149:3000
