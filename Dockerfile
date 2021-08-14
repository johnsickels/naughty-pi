FROM alexellis2/streaming:07-05-2018
COPY entry.sh entry.sh
COPY lofi.m4a lofi.m4a
COPY nyan.m4a nyan.m4a
COPY playlist.txt playlist.txt
RUN chmod +x entry.sh
ENTRYPOINT ["./entry.sh"]
