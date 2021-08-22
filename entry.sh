#!/bin/bash

echo Live-stream secret: "$STREAM_KEY"

raspivid -o - -t 0 -w 1920 -h 1080 -fps 40 -b 8000000 -g 40 | ffmpeg -re -f concat -i playlist.txt -f h264 -i pipe:0 -c:v copy -c:a aac -ab 128k -g 40 -strict experimental -f flv -r 30 rtmp://a.rtmp.youtube.com/live2/$STREAM_KEY
