#!/bin/sh

echo "Waiting for GitHub server ..."
sleep 60

echo 'pulling repo'
cd /home/pi/naughty-pi && git pull

echo 'installing npm dependencies'
npm i

echo 'done'

exit 0
