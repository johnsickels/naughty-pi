#!/bin/sh

LIGHT_PURPLE="\033[0;35m"
NC="\033[0m"

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Waiting for GitHub server ..."
sleep 60

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'pulling repo'
cd /home/pi/naughty-pi && git pull

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'installing npm dependencies'
npm i

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'done'

exit 0
