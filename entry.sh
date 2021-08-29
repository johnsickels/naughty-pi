#!/bin/bash

echo Live-stream secret: "$STREAM_KEY"


# v1
# raspivid -o - -t 0 -w 1920 -h 1080 -fps 40 -b 8000000 -g 40 | ffmpeg -re -f concat -i playlist.txt -f h264 -i pipe:0 -c:v copy -c:a aac -ab 128k -g 40 -strict experimental -f flv -r 30 rtmp://a.rtmp.youtube.com/live2/$STREAM_KEY

# 720p60s
# raspivid -o - -t 0 -w 1280 -h 720 -fps 60 -b 6500000 -g 120 | ffmpeg -re -f concat -i playlist.txt -f h264 -i pipe:0 -c:v copy -c:a aac -ab 128k -g 120 -strict experimental -f flv -r 60 rtmp://a.rtmp.youtube.com/live2/$STREAM_KEY

# 1080p30s
# raspivid -o - -t 0 -w 1920 -h 1080 -fps 30 -b 6500000 -g 60 | ffmpeg -re -f concat -i playlist.txt -f h264 -i pipe:0 -c:v copy -c:a aac -ab 128k -g 60 -strict experimental -f flv -r 30 rtmp://a.rtmp.youtube.com/live2/$STREAM_KEY

# adam
raspivid -o - -t 0 -w 1920 -h 1080 -fps 30 -b 4500000 -g 60 | ffmpeg -re -f concat -i playlist.txt -f h264 -i pipe:0 -c:v copy -c:a aac -ab 128k -g 60 -strict experimental -f flv -r 30