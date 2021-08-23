#!/bin/sh

LIGHT_PURPLE="\033[0;35m"
NC="\033[0m"

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Waiting for internet..."
sleep 60

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'Pulling repo...'
cd /home/pi/naughty-pi && git pull

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'Installing npm dependencies...'
npm i

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Shuffling playlist..."
shuf playlist.txt --output=playlist.txt

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Cleaning up docker..."
docker system prune -f

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Building docker..."
npm run docker:build

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Starting docker container..."
npm run docker:run

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Waiting for stream..."
sleep 60

echo "${LIGHT_PURPLE}$(date)${NC}"
echo "Starting server..."
npm start

echo "${LIGHT_PURPLE}$(date)${NC}"
echo 'Done!'

exit 0
