#!/bin/sh
#
killall node

git fetch

git pull

npm i

npm run build

nohup node -r dotenv/config build &
